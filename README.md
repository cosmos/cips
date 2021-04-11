# Cosmos Improvement Proposals (CIPs)

TODO: 

- badges - join chat, etc.
- Cosmos Magicians Forum or equivalent and AllCoreDevs
- Setup https://cips.cosmos.network
- Setup auto PR merge bot for drafts from their authors
- Setup validation bots
- Expand this README to be more an introduction to the process, see
  https://github.com/rust-lang/rfcs for inspiration
    - eg. "when you need to follow this process" and "sub-team
      specific guidelines"
    - or possibly work more of the RFC readme into CIP-1 ?

Cosmos Improvement Proposals (CIPs) describe standards for the Cosmos platform, including core protocol specifications, client APIs, and module and IBC standards.

**Before you initiate a pull request**, please read the [CIP-1](https://cips.cosmos.network/CIPS/cip-1) process document. Ideas should be thoroughly discussed prior to opening a pull request, 
such as on the [Cosmos forums](https://forum.cosmos.network) , or in a [GitHub issue in this repository](https://github.com/cosmos/cips/issues). CIPs should begin by copying the 
[cip-template](./cip-template.md).

This repository tracks the ongoing status of CIPs. It contains:

TODO: these links ...

- [Draft](https://cips.cosmos.network/all#draft) proposals which intend to complete the CIP review process.
- [Last Call](https://cips.cosmos.network/all#last-call) for proposals that may become final (see also [RSS feed](https://cips.cosmos.network/last-call.xml)).
- [Accepted](https://cips.cosmos.network/all#accepted) proposals which are awaiting implementation or deployment by Cosmos client developers.
- [Final](https://cips.cosmos.network/all#final) and [Active](https://cips.cosmos.network/all#active) proposals that are recorded.
- The [CIP process](./CIPS/cip-1.md#cip-workflow) that governs the CIP repository.

Achieving "Final" status in this repository only represents that a proposal has been reviewed for technical accuracy. It does not imply approval for the proposal to be accepted by Cosmos.
For that, turn to [Cosmos Governance](https://github.com/cosmos/governance). It is solely the responsibility of the reader to decide whether a proposal will be useful to them.

Browse all current and draft CIPs on [the official CIP site](https://cips.cosmos.network/).

(TODO: setup this bot): Once your first PR is merged, we have a bot that helps out by automatically merging PRs to draft CIPs. For this to work, it has to be able to tell that you own the draft being edited. Make sure that the 'author' line of your CIP contains either your GitHub username or your email address inside <triangular brackets>. If you use your email address, that address must be the one publicly shown on [your GitHub profile](https://github.com/settings/profile).

## Project Goal

The Cosmos Improvement Proposals repository exists as a place to share concrete proposals with potential users of the proposal and the Cosmos community at large.

## Preferred Citation Format

The canonical URL for a CIP that has achieved draft status at any point is at https://cips.cosmos.network/. For example, the canonical URL for CIP-1 is https://cips.cosmos.network/CIPS/cip-1.

Please consider anything which is not published on https://cips.cosmos.network/ as a working paper.

And please consider anything published at https://cips.cosmos.network/ with a status of "draft" as an incomplete draft.

# Validation

TODO: create cip_validator ?

CIPs must pass some validation tests.  The CIP repository ensures this by running tests using [html-proofer](https://rubygems.org/gems/html-proofer) and [cip_validator](https://rubygems.org/gems/cip_validator).

It is possible to run the CIP validator locally:
```sh
gem install cip_validator
cip_validator <INPUT_FILES>
```

# Automerger

The CIP repository contains an "auto merge" feature to ease the workload for CIP editors.  If a change is made via a PR to a draft CIP, then the authors of the CIP can GitHub approve the change to have it auto-merged by the [cip-automerger](https://github.com/cip-automerger/automerger) bot.

# Local development

## Prerequisites

1. Open Terminal.

2. Check whether you have Ruby 2.1.0 or higher installed:

```sh
$ ruby --version
```

3. If you don't have Ruby installed, install Ruby 2.1.0 or higher.

4. Install Bundler:

```sh
$ gem install bundler
```

5. Install dependencies:

```sh
$ bundle install
```

## Build your local Jekyll site

1. Bundle assets and start the server:

```sh
$ bundle exec jekyll serve
```

2. Preview your local Jekyll site in your web browser at `http://localhost:4000`.

More information on Jekyll and GitHub pages [here](https://help.github.com/en/enterprise/2.14/user/articles/setting-up-your-github-pages-site-locally-with-jekyll).

## Acknowledgements

This repository began as a direct clone of the [Ethereum EIP repo](https://github.com/ethereum/eips).
It also incorporates some components of the [Rust RFC
process](https://github.com/rust-lang/rfcs).
Special thanks to the incredible Ethereum and Rust core development communities and their
organizers for inspiration!


