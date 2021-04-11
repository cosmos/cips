---
cip: 1
title: CIP Process - Purpose and Guidelines
status: Draft
type: Meta
author: Ethan Buchman
created: 2021-03-16
---

## Simple Summary

A process for reviewing and finalizing changes to Cosmos using Cosmos
Improvement Proposals (CIPs).

A CIP is a design document providing information to the Cosmos community, or describing a new feature or major change for Cosmos or its processes or environment. 
The CIP should provide a concise technical specification of the feature or change and a clear rationale. 
The CIP author is responsible for building consensus within the community and documenting dissenting opinions.

## Abstract

The CIP process draws heavily from Ethereum's EIP process and Rust's RFC
process. It pertains primarily to the protocol and APIs of the Cosmos Hub
blockchain (Cosmos, for short), including Tendermint, Cosmos-SDK, IBC, and other modules. 
Ideas for a change to the Cosmos protocols or APIs are first vetted in the
Cosmos forums and channels, and then formalized as a CIP, detailing clearly the
proposed change. The CIP includes all information necessary to implement the
change, including detailed specification and rationale. CIPs are checked for
correctnes and process adherence by a select group of CIP editors, though
finalization of a CIP does not equate to acceptance into Cosmos. For that, CIP
authors must turn to Cosmos Governance.

## Motivation

The current process for upgrades involves an ad-hoc mix of methods, primarily, the RFC process of the `tendermint/spec` repo, 
the ADR process of the `cosmos-sdk`, and the various forum discussions for
additional modules or changes. The CIP process being proposed is most similar to
the existing RFC process of the `tendermint/spec` repo, though with expanded
scope. The ADR process of the SDK is a mix of protocol changes and
implementation details. This CIP process aims to subsume, but not
necessarily to replace those existing forums. The goal of the CIP repo is to create
a canonical home and standardized process for proposing changes to the Cosmos
Hub, regardless of which sub-technology they impact. It is expected that CIPs
will still have corresponding RFCs, ADRs, and other design docs as appropriate
in the respective repos. While this may result in some duplication initially,
the process can be expected to evolve over time to strike the right balance
between canonicalization of proposed changes in the CIP repo and the respective
process sovereignty of the component repos.

We intend CIPs to be the primary mechanisms for proposing new features and major changes, for collecting community technical input on an issue, and for documenting the design decisions that have gone into Cosmos. Because the CIPs are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.

For Cosmos implementers, CIPs are a convenient way to track the progress of their implementation. Ideally each implementation maintainer would list the CIPs that they have implemented. This will give end users a convenient way to know the current status of a given implementation or library.

While Cosmos is a large ecosystem with many components, and especially many
blockchains who consider themselves part of Cosmos by virtue of using the Cosmos
technology stack (ie. Tendermint, Cosmos-SDK, and/or IBC), the primary use case
for the CIP process is for features or changes to the Cosmos Hub blockchain.
Since the Cosmos Hub remains a primary and dominant user of the Cosmos
technologies, any major changes to Tendermint, Cosmos-SDK, or IBC that are
intended to land on the Cosmos Hub, as well as any modules built for the Cosmos
Hub, should be documented as a CIP. We will regularly refer to the Cosmos Hub
blockchain as simply Cosmos within the CIP process.

In this way, it should be possible to describe any Cosmos upgrade completely by reference to a list of CIPs.

## Documentation

TODO: condensed version of the specification

## Specification

Contents:

- [CIP Types](#cip-types)
- [CIP Workflow](#cip-workflow)
- [What belongs in a successful CIP?](#what-belongs-in-a-successful-cip)
- [CIP Formatting](#cip-formatting)
- [CIP Ownership](#cip-ownership)
- [CIP Editors](#cip-editors)

### CIP Types

There are three types of CIP:

- A **Standards Track CIP** describes any change that affects most or all Cosmos implementations, such as—a change to the network protocol, a change in block or transaction validity rules, proposed application standards/conventions, or any change or addition that affects the interoperability of applications using Cosmos. Standards Track CIPs consist of three parts—a design document, an implementation, and (if warranted) an update to the relevant, ideally formal, specification. Furthermore, Standards Track CIPs can be broken down into the following categories:

  - **Core**: improvements requiring a consensus fork or chain upgrade, as well as changes that are not necessarily consensus critical but may be relevant to “core dev” discussions.
  - **Networking**: includes improvements around the p2p system and the Tendermint reactors, as well as the light client protocol.
  - **Interface**: includes improvements around client [API/RPC] specifications and standards. 

- A **Meta CIP** describes a process surrounding Cosmos or proposes a change to (or an event in) a process. Meta CIPs are like Standards Track CIPs but apply to areas other than the Cosmos protocol itself. They may propose an implementation, but not to Cosmos's codebase; they often require community consensus; unlike Informational CIPs, they are more than recommendations, and users are typically not free to ignore them. Examples include procedures, guidelines, changes to the decision-making process, and changes to the tools or environment used in Cosmos development. 

- An **Informational CIP** describes a Cosmos design issue, or provides general guidelines or information to the Cosmos community, but does not propose a new feature. Informational CIPs do not necessarily represent Cosmos community consensus or a recommendation, so users and implementers are free to ignore Informational CIPs or follow their advice.

It is highly recommended that a single CIP contain a single key proposal or new idea. The more focused the CIP, the more successful it tends to be. A change to one client doesn't require a CIP; a change that affects multiple clients, or defines a standard for multiple apps to use, does. Certain features that span multiple components may require multiple CIPs to fully describe. CIPs may depend on other CIPs, but they may also be co-dependent, in which case the set of co-dependent CIPs need to be approved together.

A CIP must meet certain minimum criteria. It must be a clear and complete description of the proposed enhancement. The enhancement must represent a net improvement. The proposed implementation, if applicable, must be solid and must not complicate the protocol unduly.

### CIP Workflow

#### Shepherding a CIP

Parties involved in the process are you, the champion or *CIP author*, the [*CIP editors*](#cip-editors), and the *[Cosmos Core Developers]*.

Before you begin writing a formal CIP, you should vet your idea. Ask the Cosmos community first if an idea is original to avoid wasting time on something that will be rejected based on prior research. It is thus recommended to open a discussion thread on [the Cosmos forum] to do this, but you can also use [the Cosmos Discord], [the Cosmos subreddit] or [the Issues section of this repository]. 

Once the idea has been vetted, your next responsibility will be to present (by means of a CIP) the idea to the reviewers and all interested parties, invite editors, developers, and the community to give feedback on the aforementioned channels. You should try and gauge whether the interest in your CIP is commensurate with both the work involved in implementing it and how many parties will have to conform to it. For example, the work required for implementing a Core CIP will be much greater than for an Interface and the CIP will need sufficient interest from the Cosmos development teams. Negative community feedback will be taken into consideration and may prevent your CIP from moving past the Draft stage.

#### Core CIPs

For Core CIPs, given that they require client implementations to be considered **Final** (see "CIPs Process" below), you will need to either provide an implementation for clients or convince clients to implement your CIP. 

The best way to get client implementers to review your CIP is to present it on an [AllCoreDevs] call. You can request to do so by posting a comment linking your CIP on an [AllCoreDevs agenda GitHub Issue].  

The AllCoreDevs call serve as a way for client implementers to do three things. First, to discuss the technical merits of CIPs. Second, to gauge what other clients will be implementing. Third, to coordinate CIP implementation for network upgrades.

These calls generally result in a "rough consensus" around what CIPs should be implemented. This "rough consensus" rests on the assumptions that CIPs are not contentious enough to cause a network split and that they are technically sound.

:warning: The CIPs process and AllCoreDevs call were not designed to address contentious non-technical issues, but, due to the lack of other ways to address these, often end up entangled in them. This puts the burden on client implementers to try and gauge community sentiment, which hinders the technical coordination function of CIPs and AllCoreDevs calls. If you are shepherding a CIP, you can make the process of building community consensus easier by making sure that [the Cosmos forum] thread for your CIP includes or links to as much of the community discussion as possible and that various stakeholders are well-represented.

*In short, your role as the champion is to write the CIP using the style and format described below, shepherd the discussions in the appropriate forums, and build community consensus around the idea.* 

#### CIP Process 

The following is the standardization process for all CIPs in all tracks:

![CIP Status Diagram](../assets/cip-1/CIP-process.png)

**Idea** - An idea that is pre-draft. This is not tracked within the CIP Repository.

**Draft** - The first formally tracked stage of a CIP in development. A CIP is merged by a CIP Editor into the CIP repository when properly formatted.

**Review** - A CIP Author marks a CIP as ready for and requesting Peer Review.

**Last Call** - This is the final review window for a CIP before moving to `FINAL`. A CIP editor will assign `Last Call` status and set a review end date (review-period-end), typically 14 days later.

If this period results in necessary normative changes it will revert the CIP to `REVIEW`.

**Final** - This CIP represents the final standard. A Final CIP exists in a state of finality and should only be updated to correct errata and add non-normative clarifications.

**Stagnant** - Any CIP in `DRAFT` or `REVIEW` if inactive for a period of 6 months or greater is moved to `STAGNANT`. A CIP may be resurrected from this state by Authors or CIP Editors through moving it back to `DRAFT`.

>*CIP Authors are notified of any algorithmic change to the status of their CIP*

**Withdrawn** - The CIP Author(s) have withdrawn the proposed CIP. This state has finality and can no longer be resurrected using this CIP number. If the idea is pursued at later date it is considered a new proposal.

**Living** - A special status for CIPs that are designed to be continually updated and not reach a state of finality. This includes most notably CIP-1. Any changes to these CIPs will move between `REVIEW` and `LIVING` states.

#### Submitting a CIP

To create a CIP:

- Fork this repository
- Copy `cip-template.md` to `CIPS/cip-X.md` (don't assign a CIP number yet)
- Fill in the CIP template with a first draft of the CIP
- Submit a pull request back to this repo. When formatted correctly, Draft CIPs are given a CIP number and merged to the
  repo by a CIP editor.

At this point, the CIP officially exists in Draft form with a designated CIP
number. The process continues as follows:

- Submit additional pull requests to improve the Draft.
- Submit a pull request to change the CIP Status from Draft to Review. At this
  point, the CIP is officially ready for wider peer review from the Cosmos
  developers. They will open issues to further discuss elements of the CIP, or submit PRs to make changes.
- Eventually, a CIP editor will change the status to Last Call, setting a
  deadling for further review, following which they will change the status to
  Final.
- At this point, the CIP is finalized and should not be changed other than for cosmetic purposes. 
- The CIP can now be submitted to the [Cosmos Governance] process for
  acceptance onto the network.

### What belongs in a successful CIP?

Each CIP should have the following parts:

- Preamble - RFC 822 style headers containing metadata about the CIP, including the CIP number, a short descriptive title (limited to a maximum of 44 characters), and the author details. See [below](./cip-1.md#cip-header-preamble) for details.
- Simple Summary - simplified and layman-accessible explanation of the CIP. Imagine an email subject line, GitHub PR title, or forum post title. 
- Abstract - A short (~200 word) description of the technical issue being addressed.
- Motivation - A motivation section is critical for CIPs that want to change the Cosmos protocol. It should clearly explain why the existing protocol specification is inadequate to address the problem that the CIP solves. CIP submissions without sufficient motivation may be rejected outright.
- Documentation - Explain the proposal as if it was already deployed on the network and you were documenting it for another Cosmos user.
- Specification - The technical specification should describe the syntax and semantics of any new feature in detail. The specification should be detailed enough to allow competing, interoperable implementations for any of the current Cosmos components.
- Drawbacks - Why should we not do this?
- Rationale - The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale may also provide evidence of consensus within the community, and should discuss important objections or concerns raised during discussion.
- Prior Art - Discuss prior art, both the good and the bad, in relation to this proposal
- Unresolved Questions - What will be resolved through the CIP process, what
  will be resolved during implementation, and what related issues are out of
  scope? 
- Backwards Compatibility - All CIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The CIP must explain how the author proposes to deal with these incompatibilities. CIP submissions without a sufficient backwards compatibility treatise may be rejected outright.
- Test Cases - Test cases for an implementation are mandatory for CIPs that are affecting consensus changes. Tests should either be inlined in the CIP as data (such as input/expected output pairs, or included in `../assets/cip-###/<filename>`.
- Reference Implementation - An optional section that contains a reference/example implementation that people can use to assist in understanding or implementing this specification.
- Security Considerations - All CIPs must contain a section that discusses the security implications/considerations relevant to the proposed change. Include information that might be important for security discussions, surfaces risks and can be used throughout the life-cycle of the proposal. E.g. include security-relevant design decisions, concerns, important discussions, implementation-specific guidance and pitfalls, an outline of threats and risks and how they are being addressed. CIP submissions missing the "Security Considerations" section will be rejected. A CIP cannot proceed to status "Final" without a Security Considerations discussion deemed sufficient by the reviewers.
- Future Possibilities - Think about what the natural extension and evolution
  of your proposal would be and how it would affect the network and project as a
  whole in a holistic way.
- Copyright Waiver - All CIPs must be in the public domain. See the bottom of this CIP for an example copyright waiver.


### CIP Formatting

CIPs should be written in [markdown] format. There is a [template](https://github.com/cosmos/CIPs/blob/master/cip-template.md) to follow.

#### CIP Header Preamble

Each CIP must begin with an [RFC 822](https://www.ietf.org/rfc/rfc822.txt) style header preamble, preceded and followed by three hyphens (`---`). This header is also termed ["front matter" by Jekyll](https://jekyllrb.com/docs/front-matter/). The headers must appear in the following order. Headers marked with "*" are optional and are described below. All other headers are required.

` cip:` *CIP number* (this is determined by the CIP editor)

` title:` *CIP title*

` author:` *a list of the author's or authors' name(s) and/or username(s), or name(s) and email(s). Details are below.*

` * discussions-to:` *a url pointing to the official discussion thread*

` status:` *Draft, Review, Last Call, Final, Stagnant, Withdrawn, Living*

`* review-period-end:` *date review period ends*

` type:` *Standards Track, Meta, or Informational*

` * category:` *Core, Networking, or Interface* (fill out for Standards Track CIPs only)

` created:` *date created on*

` * updated:` *comma separated list of dates*

` * requires:` *CIP number(s)*

` * replaces:` *CIP number(s)*

` * superseded-by:` *CIP number(s)*

` * resolution:` *a url pointing to the resolution of this CIP*

Headers that permit lists must separate elements with commas.

Headers requiring dates will always do so in the format of ISO 8601 (yyyy-mm-dd).

##### `author` header

The `author` header lists the names, email addresses or usernames of the authors/owners of the CIP. Those who prefer anonymity may use a username only, or a first name and a username. The format of the `author` header value must be:

> Random J. User &lt;address@dom.ain&gt;

or

> Random J. User (@username)

if the email address or GitHub username is included, and

> Random J. User

if the email address is not given.

It is not possible to use both an email and a GitHub username at the same time. If important to include both, one could include their name twice, once with the GitHub username, and once with the email.

At least one author must use a GitHub username, in order to get notified on change requests and have the capability to approve or reject them.

##### `resolution` header

The `resolution` header is required for Standards Track CIPs only. It contains a URL that should point to an email message or other web resource where the pronouncement about the CIP is made.

##### `discussions-to` header

While a CIP is a draft, a `discussions-to` header will indicate the mailing list or URL where the CIP is being discussed. As mentioned above, examples for places to discuss your CIP include [the Cosmos Discord], an issue in this repo or in a fork of this repo, [the Cosmos forum] (this is suitable for CIPs that may be contentious or have a strong governance aspect), and [Reddit r/cosmosnetwork](https://www.reddit.com/r/cosmosnetwork/).

No `discussions-to` header is necessary if the CIP is being discussed privately with the author.

As a single exception, `discussions-to` cannot point to GitHub pull requests.

##### `type` header

The `type` header specifies the type of CIP: Standards Track, Meta, or Informational. If the track is Standards please include the subcategory (core, networking, or interface).

##### `category` header

The `category` header specifies the CIP's category. This is required for standards-track CIPs only.

##### `created` header

The `created` header records the date that the CIP was assigned a number. Both headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

##### `updated` header

The `updated` header records the date(s) when the CIP was updated with "substantial" changes. This header is only valid for CIPs of Draft and Active status.

##### `requires` header

CIPs may have a `requires` header, indicating the CIP numbers that this CIP depends on.

##### `superseded-by` and `replaces` headers

CIPs may also have a `superseded-by` header indicating that a CIP has been rendered obsolete by a later document; the value is the number of the CIP that replaces the current document. The newer CIP must have a `replaces` header containing the number of the CIP that it rendered obsolete.

#### Linking to other CIPs

References to other CIPs should follow the format `CIP-N` where `N` is the CIP number you are referring to.  Each CIP that is referenced in a CIP **MUST** be accompanied by a relative markdown link the first time it is referenced, and **MAY** be accompanied by a link on subsequent references.  The link **MUST** always be done via relative paths so that the links work in this GitHub repository, forks of this repository, the main CIPs site, mirrors of the main CIP site, etc.  For example, you would link to this CIP with `[CIP-1](./cip-1.md)`.

#### Auxiliary Files

Images, diagrams and auxiliary files should be included in a subdirectory of the `assets` folder for that CIP as follows: `assets/cip-N` (where **N** is to be replaced with the CIP number). When linking to an image in the CIP, use relative links such as `../assets/cip-1/image.png`.

#### Style Guide

When referring to a CIP by number, it should be written in the hyphenated form `CIP-X` where `X` is the CIP's assigned number.

### CIP Ownership

It occasionally becomes necessary to transfer ownership of CIPs to a new champion. In general, we'd like to retain the original author as a co-author of the transferred CIP, but that's really up to the original author. A good reason to transfer ownership is because the original author no longer has the time or interest in updating it or following through with the CIP process, or has fallen off the face of the 'net (i.e. is unreachable or isn't responding to email). A bad reason to transfer ownership is because you don't agree with the direction of the CIP. We try to build consensus around a CIP, but if that's not possible, you can always submit a competing CIP.

If you are interested in assuming ownership of a CIP, send a message asking to take over, addressed to both the original author and the CIP editor. If the original author doesn't respond to the email in a timely manner, the CIP editor will make a unilateral decision (it's not like such decisions can't be reversed :)).

### CIP Editors

TODO - see [Unresolved Questions](#unresolved-questions).

The current CIP editors are

- Ethan Buchman (@ebuchman)
- ...

#### CIP Editor Responsibilities

For each new CIP that comes in, an editor does the following:

- Read the CIP to check if it is ready: sound and complete. The ideas must make technical sense, even if they don't seem likely to get to final status.
- The title should accurately describe the content.
- Check the CIP for language (spelling, grammar, sentence structure, etc.), markup (GitHub flavored Markdown), code style

If the CIP isn't ready, the editor will send it back to the author for revision, with specific instructions.

Once the CIP is ready for the repository, the CIP editor will:

- Assign a CIP number (generally the PR number or, if preferred by the author, the Issue # if there was discussion in the Issues section of this repository about this CIP)

- Merge the corresponding pull request

- Send a message back to the CIP author with the next step.

Many CIPs are written and maintained by developers with write access to the Cosmos codebase. The CIP editors monitor CIP changes, and correct any structure, grammar, spelling, or markup mistakes we see.

The editors don't pass judgment on CIPs. We merely do the administrative & editorial part.

## Drawbacks

The CIP process outlined here requires a number of existing repos and projects
to change their own processes and/or move them to this repository. There will be
new overhead to maintaining and governing this new process. There may also be
some redundancy as specifiction and design documents may be duplicated within
the CIP repo and other repos. It's also one more repo to keep track off.

## Rationale

This is a well worn process in the Ethereum and Rust communities. 
A single canonical place and standardized process across the Cosmos stack is
necessary to unite the efforts of the many Cosmos components and to provide
greater visibility into protocol and API changes to everyone.

## Prior Art

This document was derived heavily from [Ethereum's EIP-1], which was derived heavily from [Bitcoin's BIP-0001] written by Amir Taaki which in turn was derived from [Python's PEP-0001]. 
It is also inspired by the [Rust RFC process](https://github.com/rust-lang/rfcs), especially their 
[RFC Template](https://github.com/rust-lang/rfcs/blob/master/0000-template.md) and
[rfc-0002](https://github.com/rust-lang/rfcs/blob/master/text/0002-rfc-process.md).
The bulk of the text was copied from [Ethereum's EIP-1] and modified as necessary. 

Although the PEP-0001 text was written by Barry Warsaw, Jeremy Hylton, and David Goodger, 
they are not responsible for its use in the Cosmos Improvement Process, and should not be bothered with technical questions specific to Cosmos or the CIP. 
Please direct all comments to the CIP editors.

## Unresolved Questions

- Should we further decompose the "Core" category into perhaps Tendermint and
  State Machine, or even further, with distinctions like IBC, and more? Perhaps
  Tendermint and State Machine is the best place to start.
- What is the full scope of APIs that CIPs should cover? Certainly any protocol
  breaking change to the blockchain or its state machine should have a CIP, but
  what about API changes that don't involve a protocol breaking change or new
  protocol feature? 
- Who are the initial editors and how are they chosen?
- How exactly will this CIP process interact with other design and specification
  processes across Cosmos 
- What do we use as our equivalent of Ethereum's AllCoreDevs designation and
  process ?
- This repo is a fork of the Ethereum EIP process and includes a Jekyll site,
  which is all pretty simple, but the Rust process and seems more advanced and
  there may be more worth adopting from their bots and build pipelines
- What license should we use? EIPs use CC0 for everything (ie. no license,
  copyright is just waived!), but Rust RFCs are licensed dual Apache/MIT,
  which means anything we copy from Rust needs to respect those licenses (and
  thus can't use CC0 - you can't waive someone else's copyright). Should we just license
  everything here Apache 2.0 then? This document contains virtually nothing
  copied verbatim from Rust RFC, but the current cip-template.md does.

## Backwards Compatibility

Many of the design and specification processes currently carried out in `tendermint/spec`,
`cosmos/cosmos-sdk`, `cosmos/ibc`, and more are expected to move to this
repository. This is a large breaking change to the specification process.

That said, it is not unlikely that aspects of the specification will find
themselves duplicated as necessary for now. Ideally this is kept to a minimum.

## Test Cases

N/A

## Reference Implementation

This very repository, [cosmos/cips](https://github.com/cosmos/cips).

## Security Considerations

TODO

## Future Possibilities

- As much as possible of the administration of the process should be automated
- The process should be integrated with the Cosmos Governance process to
  facilitate direct funding of CIPs and approval on the Hub
- Move the process to [Radicle] to reduce dependency on Github and enhance
  automation and verifiability

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

---

[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[Ethereum's EIP-1]: https://github.com/ethereum/eips
[Bitcoin's BIP-0001]: https://github.com/bitcoin/bips
[Python's PEP-0001]: https://www.python.org/dev/peps/
[Radicle]: https://radicle.xyz/

[AllCoreDevs]: TODO
[AllCoreDevs agenda GitHub Issue]: TODO
[Cosmos Core Developers]: TODO

[API/RPC]: https://v1.cosmos.network/rpc/v0.41.4

[the Cosmos forum]: https://forum.cosmos.network
[the Cosmos Discord]: https://discord.gg/vcExX9T
[the Cosmos subreddit]: https://www.reddit.com/r/cosmosnetwork 
[the Issues section of this repository]: https://github.com/cosmos/cips/issues
[Cosmos Governance]: https://github.com/cosmos/governance

