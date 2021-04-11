---
cip: <to be assigned>
title: <CIP title>
author: <a list of the author's or authors' name(s) and/or username(s), or name(s) and email(s), e.g. (use with the parentheses or triangular brackets): FirstName LastName (@GitHubUsername), FirstName LastName <foo@bar.com>, FirstName (@GitHubUsername) and GitHubUsername (@GitHubUsername)>
discussions-to: <URL>
status: Draft
type: <Standards Track, Meta, or Informational>
category (only required for Standards Track): <Core, Networking, Interface, or ERC>
created: <date created on, in ISO 8601 (yyyy-mm-dd) format>
requires (optional): <CIP number(s)>
replaces (optional): <CIP number(s)>
---

This is the suggested template for new CIPs.

Note that an CIP number will be assigned by an editor. When opening a pull request to submit your CIP, please use an abbreviated title in the filename, `cip-draft_title_abbrev.md`.

The title should be 44 characters or less.

## Simple Summary
If you can't explain it simply, you don't understand it well enough." Provide a simplified and layman-accessible explanation of the CIP. Imagine an email subject line, GitHub PR title, or forum post title.

## Abstract
A short (~200 word) description of the technical issue being addressed. This should be a very terse and human-readable version of the specification section. Someone should be able to read only the abstract to get the gist of what this specification does.

## Motivation
The motivation section should describe the "why" of this CIP. What problem does it solve? Why should someone want to implement this standard? What benefit does it provide to the Cosmos ecosystem? What use cases does this CIP address?

## Documentation
Explain the proposal as if it was already deployed on the network and you were documenting it for another Cosmos user. That generally means:

- Introducing new named concepts.
- Explaining the feature largely in terms of examples.
- Explaining how Cosmos users should think about the feature, and how it should impact the way they use Cosmos. It should explain the impact as concretely as possible.
- If applicable, provide sample error messages, deprecation warnings, or migration guidance.
- If applicable, describe the differences between teaching this to existing Cosmos users and new Cosmos users.

## Specification
This is the technical portion of the CIP. Explain the design in sufficient detail that:

- Its interaction with other features is clear.
- It is reasonably clear how the feature would be implemented.
- Corner cases are dissected by example.

The section should return to the examples given in the previous section, 
and explain more fully how the detailed proposal makes those examples work.
The specification should be detailed enough to allow competing, interoperable
implementations for any of the Cosmos components (eg. tendermint, tendermint-rs,
ibc-go, ibc-rs, etc. TODO a link for all these)

## Drawbacks
Why should we not do this?

## Rationale
The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. It should address:

- Why is this design the best in the space of possible designs?
- What other designs have been considered and what is the rationale for not choosing them?
- What is the impact of not doing this?

## Prior Art
Discuss prior art, both the good and the bad, in relation to this proposal. For
instance,

- Does this feature exist in other blockchain networks and what experience have their
community had? 
- What lessons can we learn from what others have done? 
- Are there papers to cite with relevant theoretical background?

This section is intended to encourage you as an author to think about the lessons from other networks, provide readers of your CIP with a fuller picture. 

## Unresolved Questions

- What parts of the design do you expect to resolve through the CIP process before this gets approved?
- What parts of the design do you expect to resolve through the implementation of this feature before stabilization?
- What related issues do you consider out of scope for this CIP that could be addressed in the future independently of the solution that comes out of this CIP?

## Backwards Compatibility
All CIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The CIP must explain how the author proposes to deal with these incompatibilities. CIP submissions without a sufficient backwards compatibility treatise may be rejected outright.

## Test Cases
Test cases for an implementation are mandatory for CIPs that are affecting consensus changes. Other CIPs can choose to include links to test cases if applicable.

## Reference Implementation
An optional section that contains a reference/example implementation that people can use to assist in understanding or implementing this specification.  If the implementation is too large to reasonably be included inline, then consider adding it as one or more files in `../assets/cip-####/`.

## Security Considerations
All CIPs must contain a section that discusses the security implications/considerations relevant to the proposed change. Include information that might be important for security discussions, surfaces risks and can be used throughout the life cycle of the proposal. E.g. include security-relevant design decisions, concerns, important discussions, implementation-specific guidance and pitfalls, an outline of threats and risks and how they are being addressed. CIP submissions missing the "Security Considerations" section will be rejected. An CIP cannot proceed to status "Final" without a Security Considerations discussion deemed sufficient by the reviewers.

## Future Possibilities
Think about what the natural extension and evolution of your proposal would be and how it would affect the network and project as a whole in a holistic way. 
Try to use this section as a tool to more fully consider all possible interactions with the project and language in your proposal. 
Also consider how this all fits into the roadmap for the project and of the relevant sub-team.

This is also a good place to "dump ideas", if they are out of scope for the RFC you are writing but otherwise related.

If you have tried and cannot think of any future possibilities, you may simply state that you cannot think of anything.

Note that having something written down in the future-possibilities section is not a reason to accept the current or a future CIP; such notes should be in the section on motivation or rationale in this or subsequent CIPs. The section merely provides additional information.


## Copyright
Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
