---
cip: 5
title: Module Readiness Committee
author: Shahan Khatchadourian <@shahankhatch>
status: Living
type: Meta
created: 2021-05-05
requires: [cip-4: Module Readiness Checklist](cip-4.md)
---

There are many great teams building invaluable modules for the Cosmos Hub. This proposal aims to address a fair and inclusive process for guiding modules towards integration and deployment on the Cosmos Hub; guidelines which ensure safe and robust execution of modules on the Hub.

### Current Process

Currently, there are two paths for a module to be deployed onto the Hub:
committing module code into the Gaia codebase followed by a coordinated Hub upgrade.
committing module code into the Gaia codebase in such a way that it is activated by a Hub parameter change proposal, ensuring that validators upgrade their client in an uncoordinated way, then submitting a parameter change proposal which activates the module once voters pass the proposal.

Both of these paths can optionally be preceded by a signaling proposal to ensure the community's agreement that the module should be included into the Hub.

Most often, code committed to the Hub endures testing and analysis by the teams developing the core Cosmos SDK and Tendermint libraries. In addition, gaps are often identified by partner organizations (either Hub operators, or with their own chains), who then inform module development.

Upcoming modules are being developed by decentralized teams spanning organisations, each with their own processes. While any individual or organization can submit a governance proposal for a new module, there needs to be a process that can guide a module’s success for inclusion and operation on the Hub.

### Proposed Process

This proposal aims to use committees to guide modules through the Hub Module Readiness Checklist in a simple way. The Hub Module Readiness Checklist ensures that module development, support, and documentation meets a minimum standard that the community agrees on, while ensuring correct operations, including stability, performance, and scalability. Modules may not need to adhere to the full checklist, as they affect the Hub in different ways, and as such modules may be exempt from completing the checklist.

In order for module checklists to be completed in a way that meets community standards, this proposal considers the use of a Module Readiness Committee.

## Module Readiness Committee

The committee will be formed by a module Champion, who is:
From the Cosmos community
The module’s Product Owner, or someone appointed by the Product Owner.
Accepted by the community as an advocate of the module’s inclusion in the Hub

A module’s committee will consist of 3 or more people who are:
From the Cosmos community
Not directly involved with this module’s development
Are accepted by the community as advocates of the module’s inclusion in the Hub
Are key stakeholders in other modules for the Hub to ensure reciprocal standards and fairness

Teams can continue to operate in a decentralized way, and this proposal does not explicitly select a committee lead.

The charter of a committee is to ensure that required elements of a checklist are met. Required elements are decided by the committee, using their own decision making approach, such as majority or unanimous voting; this proposal advocates for unanimous approval.

### Openness

Readiness checklists are intended for review by the Cosmos community, and as such are to be included with a module’s proposal; the checklist should contain the relevant information by which to base their decision of a module’s preparedness and inclusion of its code in a Hub upgrade.

There is no minimum standard for minute taking or sharing a committee’s decisions; however, the Readiness Checklist can contain links to additional details.

### Finality

Motivated by decentralization and the Cosmos community’s decisions, a module’s code is activated by submitting a parameter change proposal.

### Duration of this proposal

This proposal aims to provide guidance for modules added to the Hub for the next 2 Hub upgrades, cosmoshub-5 and cosmoshub-6.

### Glossary

Community advocate: Has a platform from which to influence public opinion for module adoption on the Hub.

Cosmos community: Group of people that spend their time working to drive useful adoption of Cosmos technology.

Key stakeholder: A person who is employed by an organization that is funded by Tendermint Inc. or the Interchain Foundation.

Module Team: Organization developing a module, often consisting of at least a team of developers and a product owner.

Product Owner: A person who defines the module’s roadmap based on user needs.

# Process

For modules developed outside from core teams, module teams that have succeeded in deploying modules to the Cosmos Hub 
have used community-engaged approaches.

A community-engaged approach often follows the process as described on the governance Github repository, and an example approach is given 
in the [Best Practices for Drafting a Proposal](https://github.com/cosmos/governance/blob/master/best_practices.md#stage-2-your-draft-proposal).

Once a module is built, the module is scheduled for integration into a release of Gaia. With the Cosmos Hub's increasingly 
versatile capabilities may permit automatically automatic upgrades across all the Cosmos Hub's validators. The Cosmos Hub
upgrades that result in breaking changes will be scheduled with 1 month lead time once there is a final release for the upgrade.

The community is informed of an upcoming parameter change proposal to activate the module.




## Copyright
Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
