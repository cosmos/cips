---
cip: <to be assigned>
title: Off-chain Messages Signing
author: @JulianToledano
status: Draft
type: Standards Track
created: 2023-10-10
---

## Simple Summary

This is a convention for signing arbitrary messages. We propose this specification as a method for signing and
validating off-chain arbitrary messages.

## Abstract

This CIP addresses the need for arbitrary message signing. These messages can be used for application sign-in by
providing proof of wallet ownership, but their use is not limited to this case. They can also be utilized for signing
files, text, and more.

There is no requirement for these messages to be posted to the network. That's why a set of off-chain messages is
defined with specific characteristics that prevent them from being processed as on-chain transactions.

This CIP defines two different messages. The first one allows users to sign any arbitrary data, including files, text,
objects, and more. The second one provides a way for application sign-in by defining a standard human-readable message
format that is parameterized by scope, session details, and security mechanisms.

## Motivation

Having the ability to sign messages off-chain has proven to be a fundamental aspect of nearly any blockchain.
The notion of signing messages off-chain has many added benefits, such as saving on computational costs and reducing
transaction throughput and overhead. Within the context of the Cosmos ecosystem, some of the major applications of signing such
data include, but are not limited to, providing a cryptographically secure and verifiable means of proving validator
identity and possibly associating it with some other framework or organization. Additionally, having the ability to
sign Cosmos messages with a Ledger or similar HSM device.

## Documentation

This CIP introduces the concept of off-chain messages. Off-chain messages are messages that are not and cannot be
submitted to the network.

It opens the door to sign-in in dApps and webs and signing of files, text and objects.

Command-line applications will allow users to sign and verify files with commands like:

 + `simd keys sign [file] --from [key_name] > signed_file.json`
 + `simd keys verify [file]`


Websites and applications will be able to prove account ownership with a human-readable message instead of a random challenge.
An example format might look like this:

```
Prove account ownership to
https://myApp.com

  "appDomain": "myApp",
  "uri": "https://myApp.com/",
  "signerAddress": "cosmos1hftz5ugqmpg9243xeegsqqav62f8hnywsjr4xr",
  "nonce": "14368412",
  "issued-at": "2023-10-10T10:10:10Z"
```

This approach is an improvement over the current state, as it allows for the signing of arbitrary data like files and
offers a more user-friendly sign-in process, replacing non-human-readable random challenges.

## Specification

Off-chain signed messages should resemble Cosmos SDK messages but **must not** constitute a valid on-chain transaction.
`chain-id`, `account_number`, and `sequence` must all be assigned invalid values.

An off-chain transaction follows these rules:

 + the memo must be empty
 + nonce, sequence number must be equal to 0
 + chain-id must be equal to “”
 + fee gas must be equal to 0
 + fee amount must be an empty array

Verification of an off-chain transaction follows the same rules as an on-chain one, except for the specification
differences highlighted above.

As messages in cosmos are defined as proto definitions, different messages can be defined for different off-chain
use cases, such as Sign-In, proof of wallet ownership or the ability to sign arbitrary data.

All off-chain messages will be of the type `offchain/messageKind`.

### MsgSignArbitraryData

The first message added to the `offchain` package is `MsgSignArbitraryData`.

`MsgSignArbitraryData` enables developers to sign arbitrary bytes that are valid only in an off-chain context. Here,
`AppDomain` represents the application requesting off-chain message signing, while `signerAddress` is the account address of
the  signer. `Data` consists of arbitrary bytes that can represent various forms of data, including text, files, or
objects.  The decision on how to deserialize, serialize, and interpret `Data` is left to the application developers,
depending on their specific use case.

Application developers have the discretion to determine how `Data` should be handled. This includes defining the
serialization and deserialization processes and specifying the object that Data represents within their context.

Proto definition:

```protobuf
// MsgSignArbitraryData defines an arbitrary, general-purpose, off-chain message
message MsgSignArbitraryData {
  option (cosmos.msg.v1.signer) = "signerAddress";
  // AppDomain is the application requesting off-chain message signing
  string appDomain = 1;
  // Signer is the sdk.AccAddress of the message signer
  string signerAddress = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // Data represents the raw bytes of the content that is signed (text, json, etc)
  bytes data = 3 [(gogoproto.jsontag) = "data"];
}
```

Signed MsgSignArbitraryData json example:

```json
{
  "type": "cosmos-sdk/StdTx",
  "value": {
    "msg": [
      {
        "type": "offchain/MsgSignArbitraryData",
        "value": {
          "appDomain": "simd",
          "signerAddress": "cosmos1hftz5ugqmpg9243xeegsqqav62f8hnywsjr4xr",
          "data": "cmFuZG9t"
        }
      }
    ],
    "fee": {
      "amount": [],
      "gas": "0"
    },
    "signatures": [
      {
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "AqnDSiRoFmTPfq97xxEb2VkQ/Hm28cPsqsZm9jEVsYK9"
        },
        "signature": "8y8i34qJakkjse9pOD2De+dnlc4KvFgh0wQpes4eydN66D9kv7cmCEouRrkka9tlW9cAkIL52ErB+6ye7X5aEg=="
      }
    ],
    "memo": ""
  }
}
```

### MsgSignIn

The second message added to the `offchain` package is `MsgSignIn`.

`MsgSignIn` enables the proof of wallet ownership for applications sign-in. In this context, `AppDomain` is the
application requesting off-chain message signing. `URI` refers to the resource that is the subject of the signing.
`signerAddress` is the account address of the signer. `Nonce` is a random string typically chosen by the relying on party and
used to prevent replay attacks. `Issued-at` the time when the message was generated.

Proto definition:

```protobuf
// MsgSignArbitraryData defines an arbitrary, general-purpose, off-chain message
message MsgSignIn {
  option (cosmos.msg.v1.signer) = "signerAddress";
  // AppDomain is the application requesting off-chain message signing
  string appDomain = 1;
  // Uri is the resource that is the subject of the signing
  string uri = 2;
  // Signer is the sdk.AccAddress of the message signer
  string signerAddress = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // Nonce is a random string
  string nonce = 4;
  // Issued-at is the time when the message was generated
  google.protobuf.Timestamp issued-at = 5;
}
```

Signed MsgSignIn json example:

```json
{
  "type": "cosmos-sdk/StdTx",
  "value": {
    "msg": [
      {
        "type": "offchain/MsgSignIn",
        "value": {
          "appDomain": "exampleSwap",
          "uri": "https://exampleSwap.com/login",
          "signerAddress": "cosmos1hftz5ugqmpg9243xeegsqqav62f8hnywsjr4xr",
          "nonce": "14368412",
          "issued-at": "2023-10-10T16:25:24Z"
        }
      }
    ],
    "fee": {
      "amount": [],
      "gas": "0"
    },
    "signatures": [
      {
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "AqnDSiRoFmTPfq97xxEb2VkQ/Hm28cPsqsZm9jEVsYK9"
        },
        "signature": "8y8i34qJakkjse9pOD2De+dnlc4KvFgh0wQpes4eydN66D9kv7cmCEouRrkka9tlW9cAkIL52ErB+6ye7X5aEg=="
      }
    ],
    "memo": ""
  }
}
```

## Drawbacks

This CIP requires a fixed relationship between an account address and a public key. That means it won't work if [ADR-034](https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-rc.1/docs/architecture/adr-034-account-rekeying.md) 
is implemented.

Doesn't work with multisig accounts.

## Rationale

By creating different messages for different use cases, this design fulfills the current demands of the community for
[arbitrary data signing](https://github.com/cosmos/cosmos-sdk/issues/4581) and [human-readable sign-in message](https://github.com/cosmos/cosmos-sdk/pull/7896#issuecomment-1125254734).

Implementing this design aligns with the long-standing requests from the community. Several zones have implemented their
own arbitrary messages based on ADR-036:

 + [Sommelier](https://github.com/cosmos/cosmos-sdk/pull/7727#issuecomment-821201911)
 + [Aleph.im](https://github.com/cosmos/cosmos-sdk/pull/7727#issuecomment-821776061)
 + [Secret](https://github.com/scrtlabs/cosmos-sdk/compare/v0.9.1-scrt...v0.9.2-scrt)

Even some work have been done on [cosmjs](https://github.com/cosmos/cosmjs/pull/847).

There are zones and applications that prove account ownership by signing a random challenge with ADR-036 specification.

## Prior Art

Other blockchains such as Ethereum with [eip-4361](https://eips.ethereum.org/EIPS/eip-4361) or Solana with its
[Off-chain message signing](https://docs.solana.com/proposals/off-chain-message-signing) offer standard methods for
application sign-in.

There was a prior attempt to implement this in the sdk with [ADR-036](https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-rc.1/docs/architecture/adr-036-arbitrary-signature.md).
However, a consensus was not achieved on ADR-036, as the community demanded a way for sign-in method that ADR-036
did not provide. This is the main reason for defining two different messages in this CIP. One for arbitrary data and
the other for sing-in.


## Unresolved Questions

 + Is defining different messages per use case the best approach, or could a protobuf with a `oneof` be sufficient? 
 + Should `Data` in `MsgSignArbitraryData` have a max length?

## Backwards Compatibility

Backwards compatibility is guaranteed as this CIP introduces new messages but does not modify any prior work.

## Security Considerations

It is important to notice that the `Data` field in `MsgSignArbitraryData` consists of bytes, which means it could be
non-human-readable.

There are no more security considerations as the messages will not be on-chain.

## Future Possibilities

This opens the possibility to create new off-chain messages for future use cases.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
