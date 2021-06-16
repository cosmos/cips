---
cip: <to be assigned>
title: Cosmos HD key derivation
author: Simon Warta (@webmaster128)
discussions-to: <URL>
status: Draft
type: <Standards Track, Meta, or Informational>
category (only required for Standards Track): <Core, Networking, Interface, or ERC>
created: 2021-06-16
---

Cosmos blockchains support hierarchical deterministic key generation (HD keys) for
deriving multiple cryptographic keypairs from a single secret value. This allows the user
to use different keypairs for different accounts on one blockchain and create accounts on
multiple blockchains without having to manage multiple secrets.

The technology to do that is specified in [BIP32], [BIP39], [BIP43] and [BIP44]. Those
specs originate from the Bitcoin community but are also used in many other blockchain
ecosystems. BIP32 specifies HD derivation for the elliptic curve secp256k1 only but
alternative approaches have been developed outside of the Bitcoin ecosystem to generalize
the same idea to other signing algorithms<sup>1</sup>.

**Table of contents**

<!--ts-->

- [Cosmos HD key derivation](#cosmos-hd-key-derivation)
  - [BIP44](#bip44)
  - [The Cosmos Hub path](#the-cosmos-hub-path)
    - [Reuse of the Cosmos Hub path in Cosmos](#reuse-of-the-cosmos-hub-path-in-cosmos)
  - [The Cosmos Ledger app](#the-cosmos-ledger-app)
  - [Goals](#goals)
  - [The Cosmos purpose](#the-cosmos-purpose)
  - [The chain index](#the-chain-index)
  - [Chain specific path structure](#chain-specific-path-structure)
    - [Cosmos simple HD path](#cosmos-simple-hd-path)
  - [Implementation](#implementation)
    - [Implementation in the Ledger app](#implementation-in-the-ledger-app)
    - [Implementation in CosmJS](#implementation-in-cosmjs)
  - [Migration](#migration)
    - [Special case: Cosmos Hub](#special-case-cosmos-hub)
    - [Special case: Custom SLIP44 coin type](#special-case-custom-slip44-coin-type)
  - [Relationship to interchain accounts](#relationship-to-interchain-accounts)
  - [Other signing algorithms](#other-signing-algorithms)
  - [Test vectors](#test-vectors)
    - [Simple HD path](#simple-hd-path)
    - [Generic Cosmos path](#generic-cosmos-path)
  - [Notes](#notes)

<!--te-->

## BIP44

An "HD path" is an instruction as to how to derive a keypair from a root secret. BIP44
specifies a schema for such paths as follows:

```
m / 44' / coin_type' / account' / change / address_index
```

where `m` is a constant symbol at the beginning of the path, `/` is the separator of path
components, `44` is the the `purpose` value from BIP43, `'` denotes hardened derivation
and the remaining four symbols are variable names for integers. A BIP44 path always has
those five components where the first three are always hardened and the last two are
always unhardened.

A `coin_type` registry is maintained in [SLIP44] and the pattern for some example
blockchains looks like this.

```
Bitcoin:    m / 44' /   0' /       account' / change / address_index
Litecoin:   m / 44' /   2' /       account' / change / address_index
Ethereum:   m / 44' /  60' /             0' /      0 / address_index
Cosmos Hub: m / 44' / 118' /             0' /      0 / address_index
EOS:        m / 44' / 194' / address_index' /      0 / 0
Monero:     m / 44' / 128' / address_index'
Stellar:    m / 44' / 148' / address_index'
```

As you can see for the blockchains that use an account based model instead of UTXOs, only
one path component is variable (`address_index`) and the differentiation between account
and address does not help for those cases. For some chains the unused components are
filled with zeros. Others follow Stellar's model by simplifying the path to 3
components<sup>2</sup>, which results in paths that do not comply with BIP44 anymore. This
shows how BIP44 is used for historical reasons but is not a great fit for account based
blockchains. This concern is expressed in [EIP600] as follows: _Because Ethereum is based
on account balances rather than UTXO, the hierarchy defined by BIP44 is poorly suited._

## The Cosmos Hub path

The Cosmos Hub HD path is `m / 44' / 118' / 0' / 0 / address_index` where `44` is the
BIP44 `purpose`, `118` is the coin type [for ATOM][slip44] and
[the last component](https://github.com/cosmos/cosmos-sdk/issues/4278#issuecomment-561238038)
is used for multiple accounts of the same user. This path has been [used in the Cosmos
fundraiser][fundraiser path] with `address_index = 0`.

Throughout Cosmos's history the difference between the Cosmos ecosystem and the Cosmos Hub
fails to be cleanly differentiated in many places. The fundraiser code uses the term
"Cosmos addresses" when talking about addresses on the Cosmos Hub, the
["Cosmos" Ledger App is marketed as the ATOM app](https://support.ledger.com/hc/en-us/articles/360013713840-Cosmos-ATOM-)
and a large number of other references in the ecosystem use "cosmos" when referring to the
Cosmos Hub<sup>3</sup>. The latest revision of
[the Cosmos website](https://cosmos.network) manages to communicate a strict
differentiation between the two. It is unclear if this overall lack of precision is
sloppiness or intentional but in the context of HD paths it leads to a privacy issue.

### Reuse of the Cosmos Hub path in Cosmos

A good number of blockchains were created that reuse the Cosmos Hub path. A quick search
in the [Keplr configuration] reveals that at least Kava, Secret Network, Akash, SifChain,
CertiK, IRISnet, Regen, Sentinel, Cyber and Straightedge used or actively use the ATOM
coin type 118. Using the same derivation path means that users that use one secret
recovery phrase to interact with multiple networks will be signing with the same keypair.
Their public identity is the same public key. This is then obfuscated because
[bech32][bip173] addresses with different prefixes are used. Those addresses look
different at first glance, but contain the same data.

```js
import { pubkeyToAddress } from "@cosmjs/amino";

const pubkey = {
  type: "tendermint/PubKeySecp256k1",
  value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
};

const addressChainA = pubkeyToAddress(pubkey, "achain");
const addressChainB = pubkeyToAddress(pubkey, "bitwhatever");
console.log(addressChainA); // achain1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmjufvfw
console.log(addressChainB); // bitwhatever1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmtwnu3c
```

An untrained eye will not easily see that both addresses share a common middle part
`pkptre7fdkl6gfrzlesjjvhxhlc3r4gm`, which is the bech32 data that is surrounded by the
prefix and a checksum. We can use any bech32 decoder to see both addresses contain the
same data.

```js
import { toHex, Bech32 } from "@cosmjs/encoding";

const dataA = Bech32.decode(
  "achain1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmjufvfw"
).data;
const dataB = Bech32.decode(
  "bitwhatever1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmtwnu3c"
).data;

console.log(toHex(dataA)); // 0d82b1e7c96dbfa42462fe612932e6bff111d51b
console.log(toHex(dataB)); // 0d82b1e7c96dbfa42462fe612932e6bff111d51b
```

This knowledge can now be used to create equality sets containing addresses on different
chains that belong to the same user. This is a problem if the user is not aware that such
a linking is possible and behaves as if the identities were independent.

Reusing the Cosmos Hub path also has advantages. It allows chains to use existing client
key management tooling made for the Cosmos Hub. This includes the CLI application coming
with the Cosmos SDK, client libraries such as CosmJS or the Cosmos Ledger app.

## The Cosmos Ledger app

This Cosmos app for the [Ledger hardware wallet][ledger] is in a bit of an identity
crisis. One the one hand it is marketed as the app for the ATOM token. On the other hand
it is called "Cosmos", not "Cosmos Hub". The app requires the use of an HD path starting
with `m / 44' / 118'`, i.e. the ATOM coin type.

A few Cosmos projects decided to create their own Ledger apps, such as
[Binance][ledgerapp-binance], [Terra][ledgerapp-terra] or [Starname][ledgerapp-starname].
This allows them to fully customize the app but comes with significant maintenance cost.

A goal expressed by various Cosmos community members is to be able to use one Ledger app
for all Cosmos blockchains. The Cosmos SDK team [is][sdk6078] [working][sdk6513]
[hard][sdk9320] to make transaction signing for arbitrary message types sufficiently
self-describing to allow this to happen. This is in line with the vision to spawn
[a million blockchains](https://www.youtube.com/watch?v=DWVPTYOrUUo) in the Cosmos
ecosystem, which requires blockchain projects to be able to focus on their chain specific
product instead of having to reinvent basic infrastructure components.

While the Ledger app is a prominent and important example, most of the above holds for any
key management and signing solution for Cosmos.

## Goals

So far we have reviewed the status quo, describing various shortcomings that we have today
due to historical reasons. A modern HD path schema for Cosmos' multi-chain world should:

1. Ensure users do not accidentally use the same public key on multiple blockchains.
2. Avoid unnecessary path components originating from irrelevant requirements relating to
   the Bitcoin blockchain.
3. Allow the use of a single Ledger app for many blockchains without having to update the
   app for new chains.

The rest of this document will describe a solution that achieves those goals.

## The Cosmos purpose

As described above, using the 5 component path of BIP44 is not suitable. Luckily we can
choose a new path format and remain fully BIP32 and BIP43 compliant. BIP43 defines a HD
path as `m / purpose' / *` with an integer purpose. The asterisk denotes an arbitrary sub
path.

A few different `purpose` values are used in the wild and as yet there is no registry
listing them. The ones found at the time of writing are:

| BIP43 `purpose` | Use case                | Reference                                                                                          |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| 0               | BIP32 default account   | _Note that `m/0'/*` is already taken by BIP32 (default account), which preceded this BIP._ [BIP43] |
| 13              | SLIP13                  | [SLIP13]                                                                                           |
| 43              | Potentially reserved    | https://github.com/bitcoin/bips/pull/523, [EIP600]                                                 |
| 44              | BIP44                   | [BIP44]                                                                                            |
| 45              | BIP45                   | [BIP45]                                                                                            |
| 48              | Graphene-based networks | [SLIP48]                                                                                           |
| 49              | BIP49                   | [BIP49]                                                                                            |
| 80              | BIP80                   | [BIP80]                                                                                            |
| 84              | BIP84                   | [BIP84]                                                                                            |
| 1852            | HD Sequential wallets   | [Cardano: About Address Derivation][cardano-derivation]                                            |
| 10001–19999     | Potentially reserved    | https://github.com/bitcoin/bips/pull/523                                                           |
| 4673607         | Ledger GPG/SSH          | [openpgp-card-app-deterministic-key-derivation]                                                    |

Looking at those numbers we see a lot of direct mappings between the document names
`BIP-XXXX` or `SLIP-XXXX` and the purpose `XXXX`. In order to avoid unnecessary conflicts
we stay away from the four digit purposes as well as the range reserved for SLIPs and look
for a number greater than or equal to 20000. In particular, every value `int(ASCII(s))`
with a 3 or 4 character string `s` would work. So let's just use
`int(ASCII("sky")) = 7564153` as the entry point to the cosmos.

## The chain index

Cosmos paths then have the form `m / 7564153' / *` and we want to ensure that different
chains don't step on each others' toes. So the second path component becomes a chain
index: `m / 7564153' / chain_index' / *`.

This chain index is very similar to the `coin_type` from BIP44/SLIP44 but uses a different
name to make clear that there can be any number of coins in a given chain. Other than the
chain vs. coin confusion, the registry in SLIP44 works pretty well to coordinate the
assignment of indices across the blockchain ecosystem. The same is envisioned for Cosmos
as well. The 2^31 possible values allow registering approximately 2 billion chains.

Chain index 0 is reserved for testing purposes and chain index 1 is reserved for the
Cosmos Hub because Cosmos Hub investors are paying the bill for this work. All other
indices should be coordinated in a dedicated place.

## Chain specific path structure

The Cosmos purpose and the chain index together serve as a namespace. Once a chain has
registered its chain index, the whole subtree `*` in `m / 7564153' / chain_index' / *` can
be chosen freely. This allows very advanced path setups like the ones described in e.g.
[EIP1581] and [EIP1775]. However, to keep simple things simple, we propose the following
simple HD path format.

### Cosmos simple HD path

In account based blockchains the most widely used path format can be reduced to
`(chain, a)` where `chain` identifies the blockchain and `a` is a 0-based account index.
Above we saw different implementations of that like `m/44'/118'/0'/0/a` or
`m/44'/148'/a'`. If you have something as simple as that, wallets can easily perform
account discovery, similar to what is described in BIP44. We construct a simple HD path
compliant with the Cosmos purpose and chain index as the following 4 component path:

```
m / 7564153' / chain_index' / 1' / a
```

where `a` is a 0-based account index. We use 4 components instead of 3 to allow chains to
use the simple HD path format as well as other formats in parallel. `1'` was picked
arbitrarily. The 4th component is non-hardened to allow public derivation as described in
BIP32.

## Implementation

It is important to ensure the derivation can be implemented in both hardware and software
wallets. We explore two example implementations to verify the feasibility.

### Implementation in the Ledger app

Currently the Cosmos Ledger app
[sets the path](https://github.com/cosmos/ledger-cosmos/blob/6c194daa28936e273f9548eabca9e72ba04bb632/app/Makefile#L33)
`44'/118'` when
[loading the app onto the device](https://github.com/cosmos/ledger-cosmos/blob/6c194daa28936e273f9548eabca9e72ba04bb632/app/Makefile#L168-L169).
This path serves as a prefix such that applications connecting to the Ledger app can only
use paths under that prefix. The other path components are then
[set by the application](https://github.com/Zondax/ledger-cosmos-js/blob/1b245bbced1bd92b9d5ce5898073439d4f1ab73b/tests/basic.ispec.js#L48-L50).
Currently the following restrictions
[are implemented](https://github.com/cosmos/ledger-cosmos/blob/6c194daa28936e273f9548eabca9e72ba04bb632/app/src/common/app_main.c#L99-L114):

1. Exactly 5 path components
2. Component 0 is `44'`
3. Component 1 is `118'`
4. Component 3 is `0'`
5. Component 2/3/4 are small values (`x'` or `x` with `x <= 100`)

An update to the Ledger app would be required to loosen those restrictions in case the
Cosmos purpose `7564153` is used instead of `44`. In particular the app should not
auto-harden any component and should support paths of variable length.

### Implementation in CosmJS

CosmJS implements BIP32 via the more general SLIP10 specification, which uses the same
path format. An implementation of the above is demonstrated in [this work][cosmjs834].

## Migration

The overarching goal for migrations is to avoid the use of the Cosmos Hub path for chains
other than the Cosmos Hub. This means that the Cosmos Hub does not need to migrate to the
new Cosmos purpose as long as there is no good reason to do so. We'll cover this as a
special case below. Chains that decide to register their own SLIP44 coin type and do not
want to reuse Cosmos client tooling (in particular the Cosmos Ledger app) are also
discussed separately.

Which derivation path is used cannot easily be detected by the chain or remote clients.
Only clients that do the derivation know the path. So most of the following migration work
has to happen in the client or requires a coordination effort between different clients.
The following rough guide is supposed to provide an overview, but might not fully apply to
every ecosystem:

1. Get community support for adopting the Cosmos purpose described above.
2. Register a chain index.
3. Get clarity over whether the simple HD path is what you want to use. The answer is
   probably yes.
4. If your client used the Cosmos Hub path before preserve support for it (for active
   accounts as well as restoring secret recovery phrases). New accounts should be created
   with the new schema. Do account discovery using both path patterns. Show notification
   to the user encouraging a change.
5. If you develop a new client support the new schema only. Consider an import feature
   that supports legacy paths for users migrating from other clients. Consider account
   discovery using both path patterns.

### Special case: Cosmos Hub

The BIP-44 compliant path `m/44'/118'/x'/0/y` belongs to coin type 118 (ATOM) and the
Cosmos Hub can use this path as long as it wants to. The only slight drawback is the 5
component structure originating from Bitcoin, but no real world problem with that is known
to the author.

If the Hub wants to use the flexibility of arbitrary subtrees in the future, the Cosmos
path `m/7564153'/1'/*` is reserved.

### Special case: Custom SLIP44 coin type

Some Cosmos chains decided to register their own coin type in SLIP44<sup>4</sup> and do
not wish to use the Cosmos Ledger app. In this case there is no direct need to migrate to
the Cosmos purpose. However, if generic Cosmos client tooling should be used in the future
a migration is worth considering.

## Relationship to interchain accounts

[Interchain accounts](https://medium.com/chainapsis/why-interchain-accounts-change-everything-for-cosmos-interoperability-59c19032bf11)
as specified in [ICS27] serve as a remote control on chain B from chain A. On the target
chain (chain B), a native blockchain account is created but without a keypair. Instead
Inter-blockchain communication (IBC) is used to initiate actions. On the host chain (chain
A) a regular account is created with a keypair. The advantage is that users of interchain
accounts do not need to derive key material for many target chains. Instead only one
keypair is required. In such a setup the user should be fully aware that all actions on
all chains can easily be connected to one identity, making privacy less of a concern than
described above.

However, interchain accounts are an optional high level convenience feature that does not
aim to replace native accounts controlled with private keys.

## Other signing algorithms

Supporting HD derivation for algorithms other than BIP32 (secp256k1 only) is out of scope
for this document. However, here are some starting points for future work:

- SLIP10 is a generalization of BIP32 for other elliptic curve signing algorithms,
  particularly Ed25519. It does not support non-hardened derivations and is not commonly
  used in Cosmos. The Cosmos purpose and the chain index could be used with SLIP10
  directly. The Cosmos simple HD path however cannot be used without modification because
  it requires non-hardened derivation.
- [Cardano documents][cardano-derivation] two different derivation algorithms: "ed25519@V1
  (buggy)" and "ed25519@V2" which seem to use the same path component format as BIP32. The
  author does not know whether or to what degree this could be used in Cosmos.
- Parity uses an
  [HD Key Derivation](https://substrate.dev/docs/en/knowledgebase/integrate/subkey#hd-key-derivation)
  scheme with `/` and `//` as separators and string path components that works for
  sr25519.
- Cosmos SDK 0.43 introduces support for secp256r1. This is [motivated by][sdk7718] the
  support of secure enclaves of mobile devices. At the point of writing a clearly
  specified derivation algorithm could not be found by the author.

## Test vectors

The following test vectors have been [generated using CosmJS][cosmjs834] and were verified
using a [Python implementation](./tests):

### Simple HD path

Simple HD path for account 0, 1, 75_000_000 on the testing chain:

```
m/7564153'/0'/1'/0: 80736b79,80000000,80000001,00000000
m/7564153'/0'/1'/1: 80736b79,80000000,80000001,00000001
m/7564153'/0'/1'/75000000: 80736b79,80000000,80000001,047868c0
```

Simple HD path for account 0 on the chains 0, 1, 42, 42_000_000:

```
m/7564153'/0'/1'/0: 80736b79,80000000,80000001,00000000
m/7564153'/1'/1'/0: 80736b79,80000001,80000001,00000000
m/7564153'/42'/1'/0: 80736b79,8000002a,80000001,00000000
m/7564153'/42000000'/1'/0: 80736b79,8280de80,80000001,00000000
```

### Generic Cosmos path

Cosmos path with all unhardened sub-trees of length 0, 1, 3 on the testing chain:

```
m/7564153'/0': 80736b79,80000000
m/7564153'/0'/7: 80736b79,80000000,00000007
m/7564153'/0'/7/7/7: 80736b79,80000000,00000007,00000007,00000007
```

Cosmos path with all hardened sub-trees of length 0, 1, 3 on the testing chain:

```
m/7564153'/0': 80736b79,80000000
m/7564153'/0'/7': 80736b79,80000000,80000007
m/7564153'/0'/7'/7'/7': 80736b79,80000000,80000007,80000007,80000007
```

Cosmos path with hardened/unhardened sub-tree on the testing chain:

```
m/7564153'/0'/2'/3/4': 80736b79,80000000,80000002,00000003,80000004
```

## Notes

<sup>1</sup> e.g. [SLIP10],
[Cardano's Ed25519 derivation](https://docs.cardano.org/projects/cardano-wallet/en/latest/About-Address-Derivation.html)
or
[Parity's sr25519 derivation](https://github.com/paritytech/parity-signer/blob/c6b30f5648f8a1abc6481695d747a9ed15c151d5/docs/tutorials/Hierarchical-Deterministic-Key-Derivation.md)

<sup>2</sup> _If it is account-based we follow Stellar's SEP-0005 - paths have only three
parts 44'/c'/a'. Unfortunately, a lot of exceptions occur due to compatibility reasons._
[Trezor BIP-44 derivation paths](https://github.com/trezor/trezor-firmware/blob/4e005de0/docs/misc/coins-bip44-paths.md)

<sup>3</sup> Cosmos Hub specific resources: [Mintscan](https://www.mintscan.io/cosmos),
[Big Dipper](https://cosmos.bigdipper.live/), [RPC domain](https://rpc.cosmos.network/),
[Keplr config](https://github.com/chainapsis/keplr-extension/blob/v0.8.8/packages/extension/src/config.ts#L62-L67)

<sup>4</sup> E.g. Starname (IOV) 234, Terra (LUNA) 330, Secret Network (SCRT) 529, Binance
(BNB) 714, Persistence (XPRT) 750.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

<!-- End of document. Links below are not rendered. -->

[bip32]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0032.mediawiki
[bip39]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0039.mediawiki
[bip43]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0043.mediawiki
[bip44]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0044.mediawiki
[bip45]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0045.mediawiki
[bip49]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0049.mediawiki
[bip80]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0080.mediawiki
[bip84]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0084.mediawiki
[bip173]: https://github.com/bitcoin/bips/blob/6a5c99fcc9/bip-0173.mediawiki
[eip600]: https://eips.ethereum.org/EIPS/eip-600
[eip1581]: https://eips.ethereum.org/EIPS/eip-1581
[eip1775]: https://eips.ethereum.org/EIPS/eip-1775
[slip10]: https://github.com/satoshilabs/slips/blob/ef6d7700cc/slip-0010.md
[slip13]: https://github.com/satoshilabs/slips/blob/ef6d7700cc/slip-0013.md
[slip44]: https://github.com/satoshilabs/slips/blob/ef6d7700cc/slip-0044.md
[slip48]: https://github.com/satoshilabs/slips/blob/ef6d7700cc/slip-0048.md
[fundraiser path]: https://github.com/cosmos/fundraiser-cli/blob/2.11.3/golang/main.go#L90
[openpgp-card-app-deterministic-key-derivation]: https://github.com/LedgerHQ/openpgp-card-app/blob/64662c181f4c906288564cbfadc2db53df4534b0/doc/developper/gpgcard3.0-addon.rst#deterministic-key-derivation
[cardano-derivation]: https://docs.cardano.org/projects/cardano-wallet/en/latest/About-Address-Derivation.html
[keplr configuration]: https://github.com/chainapsis/keplr-extension/blob/v0.8.8/packages/extension/src/config.ts
[ledger]: https://www.ledger.com/
[ledgerapp-binance]: https://support.ledger.com/hc/en-us/articles/360021894733-Binance-Chain-BNB-
[ledgerapp-terra]: https://support.ledger.com/hc/en-us/articles/360017698979-Terra-LUNA-
[ledgerapp-starname]: https://support.ledger.com/hc/en-us/articles/360016254900-Starname-IOV-
[sdk6078]: https://github.com/cosmos/cosmos-sdk/issues/6078
[sdk6513]: https://github.com/cosmos/cosmos-sdk/issues/6513
[sdk7718]: https://github.com/cosmos/cosmos-sdk/issues/7718
[sdk9320]: https://github.com/cosmos/cosmos-sdk/issues/9320
[cosmjs834]: https://github.com/cosmos/cosmjs/pull/834
[ics27]: https://github.com/cosmos/ibc/tree/2a81e3f890/spec/app/ics-027-interchain-accounts
