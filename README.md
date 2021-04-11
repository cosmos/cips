# Cosmos Improvement Proposals (CIPs)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cosmos/CIPs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Cosmos Improvement Proposals (CIPs) describe standards for the Cosmos platform, including core protocol specifications, client APIs, and contract standards.

**Before you initiate a pull request**, please read the [CIP-1](https://cips.cosmos.org/CIPS/cip-1) process document. Ideas should be thoroughly discussed prior to opening a pull request, such as on the [Cosmos Magicians forums](https://cosmos-magicians.org) or in a GitHub issue in this repository.

This repository tracks the ongoing status of CIPs. It contains:

- [Draft](https://cips.cosmos.org/all#draft) proposals which intend to complete the CIP review process.
- [Last Call](https://cips.cosmos.org/all#last-call) for proposals that may become final (see also [RSS feed](https://cips.cosmos.org/last-call.xml)).
- [Accepted](https://cips.cosmos.org/all#accepted) proposals which are awaiting implementation or deployment by Cosmos client developers.
- [Final](https://cips.cosmos.org/all#final) and [Active](https://cips.cosmos.org/all#active) proposals that are recorded.
- The [CIP process](./CIPS/cip-1.md#cip-work-flow) that governs the CIP repository.

Achieving "Final" status in this repository only represents that a proposal has been reviewed for technical accuracy. It is solely the responsibility of the reader to decide whether a proposal will be useful to them.

Browse all current and draft CIPs on [the official CIP site](https://cips.cosmos.org/).

Once your first PR is merged, we have a bot that helps out by automatically merging PRs to draft CIPs. For this to work, it has to be able to tell that you own the draft being edited. Make sure that the 'author' line of your CIP contains either your GitHub username or your email address inside \<triangular brackets>. If you use your email address, that address must be the one publicly shown on [your GitHub profile](https://github.com/settings/profile).

## Project Goal

The Cosmos Improvement Proposals repository exists as a place to share concrete proposals with potential users of the proposal and the Cosmos community at large.

## Preferred Citation Format

The canonical URL for a CIP that has achieved draft status at any point is at https://cips.cosmos.org/. For example, the canonical URL for CIP-1 is https://cips.cosmos.org/CIPS/cip-1.

Please consider anything which is not published on https://cips.cosmos.org/ as a working paper.

And please consider anything published at https://cips.cosmos.org/ with a status of "draft" as an incomplete draft.

# Validation

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
