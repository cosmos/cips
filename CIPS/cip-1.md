---
cip: 1
title: CIP Purpose and Guidelines
status: Living
type: Meta
author: Martin Becze <mb@cosmos.org>, Hudson Jameson <hudson@cosmos.org>, et al.
created: 2015-10-27
---

## What is an CIP?

CIP stands for Cosmos Improvement Proposal. An CIP is a design document providing information to the Cosmos community, or describing a new feature for Cosmos or its processes or environment. The CIP should provide a concise technical specification of the feature and a rationale for the feature. The CIP author is responsible for building consensus within the community and documenting dissenting opinions.

## CIP Rationale

We intend CIPs to be the primary mechanisms for proposing new features, for collecting community technical input on an issue, and for documenting the design decisions that have gone into Cosmos. Because the CIPs are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.

For Cosmos implementers, CIPs are a convenient way to track the progress of their implementation. Ideally each implementation maintainer would list the CIPs that they have implemented. This will give end users a convenient way to know the current status of a given implementation or library.

## CIP Types

There are three types of CIP:

- A **Standards Track CIP** describes any change that affects most or all Cosmos implementations, such as—a change to the network protocol, a change in block or transaction validity rules, proposed application standards/conventions, or any change or addition that affects the interoperability of applications using Cosmos. Standards Track CIPs consist of three parts—a design document, an implementation, and (if warranted) an update to the [formal specification]. Furthermore, Standards Track CIPs can be broken down into the following categories:
  - **Core**: improvements requiring a consensus fork (e.g. [CIP-5](./cip-5.md), [CIP-101](./cip-101.md)), as well as changes that are not necessarily consensus critical but may be relevant to [“core dev” discussions](https://github.com/cosmos/pm) (for example, [CIP-90], and the miner/node strategy changes 2, 3, and 4 of [CIP-86](./cip-86.md)).
  - **Networking**: includes improvements around [devp2p] ([CIP-8](./cip-8.md)) and [Light Cosmos Subprotocol], as well as proposed improvements to network protocol specifications of [whisper] and [swarm].
  - **Interface**: includes improvements around client [API/RPC] specifications and standards, and also certain language-level standards like method names ([CIP-6](./cip-6.md)) and [contract ABIs]. The label “interface” aligns with the [interfaces repo] and discussion should primarily occur in that repository before an CIP is submitted to the CIPs repository.
  - **ERC**: application-level standards and conventions, including contract standards such as token standards ([ERC-20](./cip-20.md)), name registries ([ERC-137](./cip-137.md)), URI schemes, library/package formats, and wallet formats.

- A **Meta CIP** describes a process surrounding Cosmos or proposes a change to (or an event in) a process. Process CIPs are like Standards Track CIPs but apply to areas other than the Cosmos protocol itself. They may propose an implementation, but not to Cosmos's codebase; they often require community consensus; unlike Informational CIPs, they are more than recommendations, and users are typically not free to ignore them. Examples include procedures, guidelines, changes to the decision-making process, and changes to the tools or environment used in Cosmos development. Any meta-CIP is also considered a Process CIP.

- An **Informational CIP** describes an Cosmos design issue, or provides general guidelines or information to the Cosmos community, but does not propose a new feature. Informational CIPs do not necessarily represent Cosmos community consensus or a recommendation, so users and implementers are free to ignore Informational CIPs or follow their advice.

It is highly recommended that a single CIP contain a single key proposal or new idea. The more focused the CIP, the more successful it tends to be. A change to one client doesn't require an CIP; a change that affects multiple clients, or defines a standard for multiple apps to use, does.

An CIP must meet certain minimum criteria. It must be a clear and complete description of the proposed enhancement. The enhancement must represent a net improvement. The proposed implementation, if applicable, must be solid and must not complicate the protocol unduly.

### Special requirements for Core CIPs

If a **Core** CIP mentions or proposes changes to the EVM (Cosmos Virtual Machine), it should refer to the instructions by their mnemonics and define the opcodes of those mnemonics at least once. A preferred way is the following:
```
REVERT (0xfe)
```

## CIP Work Flow

### Shepherding an CIP

Parties involved in the process are you, the champion or *CIP author*, the [*CIP editors*](#cip-editors), and the [*Cosmos Core Developers*](https://github.com/cosmos/pm).

Before you begin writing a formal CIP, you should vet your idea. Ask the Cosmos community first if an idea is original to avoid wasting time on something that will be rejected based on prior research. It is thus recommended to open a discussion thread on [the Cosmos Magicians forum] to do this, but you can also use [one of the Cosmos Gitter chat rooms], [the Cosmos subreddit] or [the Issues section of this repository]. 

Once the idea has been vetted, your next responsibility will be to present (by means of an CIP) the idea to the reviewers and all interested parties, invite editors, developers, and the community to give feedback on the aforementioned channels. You should try and gauge whether the interest in your CIP is commensurate with both the work involved in implementing it and how many parties will have to conform to it. For example, the work required for implementing a Core CIP will be much greater than for an ERC and the CIP will need sufficient interest from the Cosmos client teams. Negative community feedback will be taken into consideration and may prevent your CIP from moving past the Draft stage.

### Core CIPs

For Core CIPs, given that they require client implementations to be considered **Final** (see "CIPs Process" below), you will need to either provide an implementation for clients or convince clients to implement your CIP. 

The best way to get client implementers to review your CIP is to present it on an AllCoreDevs call. You can request to do so by posting a comment linking your CIP on an [AllCoreDevs agenda GitHub Issue].  

The AllCoreDevs call serve as a way for client implementers to do three things. First, to discuss the technical merits of CIPs. Second, to gauge what other clients will be implementing. Third, to coordinate CIP implementation for network upgrades.

These calls generally result in a "rough consensus" around what CIPs should be implemented. This "rough consensus" rests on the assumptions that CIPs are not contentious enough to cause a network split and that they are technically sound.

:warning: The CIPs process and AllCoreDevs call were not designed to address contentious non-technical issues, but, due to the lack of other ways to address these, often end up entangled in them. This puts the burden on client implementers to try and gauge community sentiment, which hinders the technical coordination function of CIPs and AllCoreDevs calls. If you are shepherding an CIP, you can make the process of building community consensus easier by making sure that [the Cosmos Magicians forum] thread for your CIP includes or links to as much of the community discussion as possible and that various stakeholders are well-represented.

*In short, your role as the champion is to write the CIP using the style and format described below, shepherd the discussions in the appropriate forums, and build community consensus around the idea.* 

### CIP Process 

The following is the standardization process for all CIPs in all tracks:

![CIP Status Diagram](../assets/cip-1/CIP-process.png)

**Idea** - An idea that is pre-draft. This is not tracked within the CIP Repository.

**Draft** - The first formally tracked stage of an CIP in development. An CIP is merged by an CIP Editor into the CIP repository when properly formatted.

**Review** - An CIP Author marks an CIP as ready for and requesting Peer Review.

**Last Call** - This is the final review window for an CIP before moving to `FINAL`. An CIP editor will assign `Last Call` status and set a review end date (review-period-end), typically 14 days later.

If this period results in necessary normative changes it will revert the CIP to `REVIEW`.

**Final** - This CIP represents the final standard. A Final CIP exists in a state of finality and should only be updated to correct errata and add non-normative clarifications.

**Stagnant** - Any CIP in `DRAFT` or `REVIEW` if inactive for a period of 6 months or greater is moved to `STAGNANT`. An CIP may be resurrected from this state by Authors or CIP Editors through moving it back to `DRAFT`.

>*CIP Authors are notified of any algorithmic change to the status of their CIP*

**Withdrawn** - The CIP Author(s) have withdrawn the proposed CIP. This state has finality and can no longer be resurrected using this CIP number. If the idea is pursued at later date it is considered a new proposal.

**Living** - A special status for CIPs that are designed to be continually updated and not reach a state of finality. This includes most notably CIP-1. Any changes to these CIPs will move between `REVIEW` and `LIVING` states.

## What belongs in a successful CIP?

Each CIP should have the following parts:

- Preamble - RFC 822 style headers containing metadata about the CIP, including the CIP number, a short descriptive title (limited to a maximum of 44 characters), and the author details. See [below](./cip-1.md#cip-header-preamble) for details.
- Abstract - A short (~200 word) description of the technical issue being addressed.
- Motivation (*optional) - A motivation section is critical for CIPs that want to change the Cosmos protocol. It should clearly explain why the existing protocol specification is inadequate to address the problem that the CIP solves. CIP submissions without sufficient motivation may be rejected outright.
- Specification - The technical specification should describe the syntax and semantics of any new feature. The specification should be detailed enough to allow competing, interoperable implementations for any of the current Cosmos platforms (cpp-cosmos, go-cosmos, parity, cosmosJ, cosmosjs-lib, [and others](https://github.com/cosmos/wiki/wiki/Clients).
- Rationale - The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale may also provide evidence of consensus within the community, and should discuss important objections or concerns raised during discussion.
- Backwards Compatibility - All CIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The CIP must explain how the author proposes to deal with these incompatibilities. CIP submissions without a sufficient backwards compatibility treatise may be rejected outright.
- Test Cases - Test cases for an implementation are mandatory for CIPs that are affecting consensus changes. Tests should either be inlined in the CIP as data (such as input/expected output pairs, or included in `../assets/cip-###/<filename>`.
- Reference Implementation - An optional section that contains a reference/example implementation that people can use to assist in understanding or implementing this specification.
- Security Considerations - All CIPs must contain a section that discusses the security implications/considerations relevant to the proposed change. Include information that might be important for security discussions, surfaces risks and can be used throughout the life-cycle of the proposal. E.g. include security-relevant design decisions, concerns, important discussions, implementation-specific guidance and pitfalls, an outline of threats and risks and how they are being addressed. CIP submissions missing the "Security Considerations" section will be rejected. An CIP cannot proceed to status "Final" without a Security Considerations discussion deemed sufficient by the reviewers.
- Copyright Waiver - All CIPs must be in the public domain. See the bottom of this CIP for an example copyright waiver.

## CIP Formats and Templates

CIPs should be written in [markdown] format. There is a [template](https://github.com/cosmos/CIPs/blob/master/cip-template.md) to follow.

## CIP Header Preamble

Each CIP must begin with an [RFC 822](https://www.ietf.org/rfc/rfc822.txt) style header preamble, preceded and followed by three hyphens (`---`). This header is also termed ["front matter" by Jekyll](https://jekyllrb.com/docs/front-matter/). The headers must appear in the following order. Headers marked with "*" are optional and are described below. All other headers are required.

` cip:` *CIP number* (this is determined by the CIP editor)

` title:` *CIP title*

` author:` *a list of the author's or authors' name(s) and/or username(s), or name(s) and email(s). Details are below.*

` * discussions-to:` *a url pointing to the official discussion thread*

` status:` *Draft, Review, Last Call, Final, Stagnant, Withdrawn, Living*

`* review-period-end:` *date review period ends*

` type:` *Standards Track, Meta, or Informational*

` * category:` *Core, Networking, Interface, or ERC* (fill out for Standards Track CIPs only)

` created:` *date created on*

` * updated:` *comma separated list of dates*

` * requires:` *CIP number(s)*

` * replaces:` *CIP number(s)*

` * superseded-by:` *CIP number(s)*

` * resolution:` *a url pointing to the resolution of this CIP*

Headers that permit lists must separate elements with commas.

Headers requiring dates will always do so in the format of ISO 8601 (yyyy-mm-dd).

#### `author` header

The `author` header lists the names, email addresses or usernames of the authors/owners of the CIP. Those who prefer anonymity may use a username only, or a first name and a username. The format of the `author` header value must be:

> Random J. User &lt;address@dom.ain&gt;

or

> Random J. User (@username)

if the email address or GitHub username is included, and

> Random J. User

if the email address is not given.

It is not possible to use both an email and a GitHub username at the same time. If important to include both, one could include their name twice, once with the GitHub username, and once with the email.

At least one author must use a GitHub username, in order to get notified on change requests and have the capability to approve or reject them.

#### `resolution` header

The `resolution` header is required for Standards Track CIPs only. It contains a URL that should point to an email message or other web resource where the pronouncement about the CIP is made.

#### `discussions-to` header

While an CIP is a draft, a `discussions-to` header will indicate the mailing list or URL where the CIP is being discussed. As mentioned above, examples for places to discuss your CIP include [Cosmos topics on Gitter](https://gitter.im/cosmos/topics), an issue in this repo or in a fork of this repo, [Cosmos Magicians](https://cosmos-magicians.org/) (this is suitable for CIPs that may be contentious or have a strong governance aspect), and [Reddit r/cosmos](https://www.reddit.com/r/cosmos/).

No `discussions-to` header is necessary if the CIP is being discussed privately with the author.

As a single exception, `discussions-to` cannot point to GitHub pull requests.

#### `type` header

The `type` header specifies the type of CIP: Standards Track, Meta, or Informational. If the track is Standards please include the subcategory (core, networking, interface, or ERC).

#### `category` header

The `category` header specifies the CIP's category. This is required for standards-track CIPs only.

#### `created` header

The `created` header records the date that the CIP was assigned a number. Both headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

#### `updated` header

The `updated` header records the date(s) when the CIP was updated with "substantial" changes. This header is only valid for CIPs of Draft and Active status.

#### `requires` header

CIPs may have a `requires` header, indicating the CIP numbers that this CIP depends on.

#### `superseded-by` and `replaces` headers

CIPs may also have a `superseded-by` header indicating that an CIP has been rendered obsolete by a later document; the value is the number of the CIP that replaces the current document. The newer CIP must have a `replaces` header containing the number of the CIP that it rendered obsolete.

## Linking to other CIPs

References to other CIPs should follow the format `CIP-N` where `N` is the CIP number you are referring to.  Each CIP that is referenced in an CIP **MUST** be accompanied by a relative markdown link the first time it is referenced, and **MAY** be accompanied by a link on subsequent references.  The link **MUST** always be done via relative paths so that the links work in this GitHub repository, forks of this repository, the main CIPs site, mirrors of the main CIP site, etc.  For example, you would link to this CIP with `[CIP-1](./cip-1.md)`.

## Auxiliary Files

Images, diagrams and auxiliary files should be included in a subdirectory of the `assets` folder for that CIP as follows: `assets/cip-N` (where **N** is to be replaced with the CIP number). When linking to an image in the CIP, use relative links such as `../assets/cip-1/image.png`.

## Transferring CIP Ownership

It occasionally becomes necessary to transfer ownership of CIPs to a new champion. In general, we'd like to retain the original author as a co-author of the transferred CIP, but that's really up to the original author. A good reason to transfer ownership is because the original author no longer has the time or interest in updating it or following through with the CIP process, or has fallen off the face of the 'net (i.e. is unreachable or isn't responding to email). A bad reason to transfer ownership is because you don't agree with the direction of the CIP. We try to build consensus around an CIP, but if that's not possible, you can always submit a competing CIP.

If you are interested in assuming ownership of an CIP, send a message asking to take over, addressed to both the original author and the CIP editor. If the original author doesn't respond to the email in a timely manner, the CIP editor will make a unilateral decision (it's not like such decisions can't be reversed :)).

## CIP Editors

The current CIP editors are

- Nick Johnson (@arachnid)
- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Vitalik Buterin (@vbuterin)
- Nick Savers (@nicksavers)
- Martin Becze (@wanderer)
- Greg Colvin (@gcolvin)
- Alex Beregszaszi (@axic)
- Micah Zoltu (@MicahZoltu)

## CIP Editor Responsibilities

For each new CIP that comes in, an editor does the following:

- Read the CIP to check if it is ready: sound and complete. The ideas must make technical sense, even if they don't seem likely to get to final status.
- The title should accurately describe the content.
- Check the CIP for language (spelling, grammar, sentence structure, etc.), markup (GitHub flavored Markdown), code style

If the CIP isn't ready, the editor will send it back to the author for revision, with specific instructions.

Once the CIP is ready for the repository, the CIP editor will:

- Assign an CIP number (generally the PR number or, if preferred by the author, the Issue # if there was discussion in the Issues section of this repository about this CIP)

- Merge the corresponding pull request

- Send a message back to the CIP author with the next step.

Many CIPs are written and maintained by developers with write access to the Cosmos codebase. The CIP editors monitor CIP changes, and correct any structure, grammar, spelling, or markup mistakes we see.

The editors don't pass judgment on CIPs. We merely do the administrative & editorial part.

## Style Guide

When referring to an CIP by number, it should be written in the hyphenated form `CIP-X` where `X` is the CIP's assigned number.

## History

This document was derived heavily from [Bitcoin's BIP-0001] written by Amir Taaki which in turn was derived from [Python's PEP-0001]. In many places text was simply copied and modified. Although the PEP-0001 text was written by Barry Warsaw, Jeremy Hylton, and David Goodger, they are not responsible for its use in the Cosmos Improvement Process, and should not be bothered with technical questions specific to Cosmos or the CIP. Please direct all comments to the CIP editors.

### Bibliography

[devp2p]: https://github.com/cosmos/wiki/wiki/%C3%90%CE%9EVp2p-Wire-Protocol
[Light Cosmos Subprotocol]: https://github.com/cosmos/wiki/wiki/Light-client-protocol
[whisper]: https://github.com/cosmos/go-cosmos/wiki/Whisper-Overview
[swarm]: https://github.com/cosmos/go-cosmos/pull/2959
[API/RPC]: https://github.com/cosmos/wiki/wiki/JSON-RPC
[contract ABIs]: https://github.com/cosmos/wiki/wiki/Cosmos-Contract-ABI
[interfaces repo]: https://github.com/cosmos/interfaces
[the Cosmos subreddit]: https://www.reddit.com/r/cosmos/
[one of the Cosmos Gitter chat rooms]: https://gitter.im/cosmos/
[pull request]: https://github.com/cosmos/CIPs/pulls
[formal specification]: https://github.com/cosmos/yellowpaper
[the Issues section of this repository]: https://github.com/cosmos/CIPs/issues
[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[Bitcoin's BIP-0001]: https://github.com/bitcoin/bips
[Python's PEP-0001]: https://www.python.org/dev/peps/
[the Cosmos Magicians forum]: https://cosmos-magicians.org/
[AllCoreDevs agenda GitHub Issue]: https://github.com/cosmos/pm/issues

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
