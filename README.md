# Cosmos Improvement Proposals (CIPs)

<div align="center">
  <a href="https://github.com/cosmos/cosmos-sdk/blob/main/LICENSE">
    <img alt="License: Apache-2.0" src="https://img.shields.io/github/license/cosmos/cosmos-sdk.svg" />
  </a>
  <a href="https://discord.gg/AzefAFd">
    <img alt="Discord" src="https://img.shields.io/discord/669268347736686612.svg" />
  </a>
</div>

Cosmos Improvement Proposals (CIPs) describe standards for the Cosmos platform, including core protocol specifications, client APIs, and module and IBC standards.

**Before you initiate a pull request**, please read the [CIP-1](https://cips.cosmos.network/CIPS/cip-1) process document. Ideas should be thoroughly discussed prior to opening a pull request,
such as on the [Cosmos forums](https://forum.cosmos.network) , or in a [GitHub issue in this repository](https://github.com/cosmos/cips/issues). CIPs should begin by copying the
[cip-template](./cip-template.md).

<!-- 
TODO
This repository tracks the ongoing status of CIPs. It contains:

- [Draft](https://cips.cosmos.network/all#draft) proposals which intend to complete the CIP review process.
- [Last Call](https://cips.cosmos.network/all#last-call) for proposals that may become final (see also [RSS feed](https://cips.cosmos.network/last-call.xml)).
- [Accepted](https://cips.cosmos.network/all#accepted) proposals which are awaiting implementation or deployment by Cosmos client developers.
- [Final](https://cips.cosmos.network/all#final) and [Active](https://cips.cosmos.network/all#active) proposals that are recorded.
- The [CIP process](./CIPS/cip-1.md#cip-workflow) that governs the CIP repository. -->

Achieving "Final" status in this repository only represents that a proposal has been reviewed for technical accuracy. It does not imply approval for the proposal to be accepted by Cosmos.
For that, turn to [Cosmos Governance](https://github.com/cosmos/governance). It is solely the responsibility of the reader to decide whether a proposal will be useful to them.

Browse all current and draft CIPs on [the official CIP site](https://cips.cosmos.network/).

(TODO: setup this bot): Once your first PR is merged, we have a bot that helps out by automatically merging PRs to draft CIPs. For this to work, it has to be able to tell that you own the draft being edited. Make sure that the 'author' line of your CIP contains either your GitHub username or your email address inside <triangular brackets>. If you use your email address, that address must be the one publicly shown on [your GitHub profile](https://github.com/settings/profile).

## Project Goal

The Cosmos Improvement Proposals repository exists as a place to share concrete proposals with potential users of the proposal and the Cosmos community at large.

## Preferred Citation Format

The canonical URL for a CIP that has achieved draft status at any point is at <https://cips.cosmos.network/>. For example, the canonical URL for CIP-1 is <https://cips.cosmos.network/CIPS/cip-1>.

Please consider anything which is not published on <https://cips.cosmos.network/> as a working paper.

And please consider anything published at <https://cips.cosmos.network/> with a status of "draft" as an incomplete draft.

## Validation

TODO: create cip_validator ?

CIPs must pass some validation tests.  The CIP repository ensures this by running tests using [html-proofer](https://rubygems.org/gems/html-proofer) and [cip_validator](https://rubygems.org/gems/cip_validator).

It is possible to run the CIP validator locally:

```sh
gem install cip_validator
cip_validator <INPUT_FILES>
```

## Automerger

The CIP repository contains an "auto merge" feature to ease the workload for CIP editors.  If a change is made via a PR to a draft CIP, then the authors of the CIP can GitHub approve the change to have it auto-merged by the [cip-automerger](https://github.com/cip-automerger/automerger) bot.

## Acknowledgements

This repository began as a direct clone of the [Ethereum EIP repo](https://github.com/ethereum/eips).
It is also inspired by the [Rust RFC
process](https://github.com/rust-lang/rfcs).
Special thanks to the incredible Ethereum and Rust core development communities and their
organizers for inspiration!
