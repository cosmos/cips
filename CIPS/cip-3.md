---
cip: 3
title: Minimum Commission Rate Param
status: Draft
type: Core
author: Sunny Aggarwal <@sunnya97>
created: 2021-05-02
---


# Minimum Commission Rate Param

## Motivation

In the cosmos-sdk's staking module, validators are allowed to set their commission rate, that gets charged on all rewards accrued to their delegations.  Currently, a validator can set this to any value between 0% and 100%.  

It has been seen in practice that this often leads to validators undercutting each other to provide the lowest commission rate to attract delegators, creating a "race to 0" on commission rates.  This leads operating validators to be an unprofitable enterprise for many validators, which had a potentially negative impact on the security of the network.
Cosmos hub governance in the past has overwhelmingly also indicated that it finds 0% commission rates harmful to the success of the network. See cosmos hub proposal 12 (https://www.mintscan.io/cosmos/proposals/12)

## Goals

Create a new staking module parameter called MinCommissionRate, which sets the lower bound on a commission rate that a validator is allowed to charge. For example, if the MinCommissionRate is set at 10%, this means that a validator can only set their commission rate to a value between 10% and 100%.

This feature is meant to be fully backwards-compatible as its usage should be optional to chains.  Chains opting out of this feature may just keep their MinCommissionRate param at 0%.


## Open Questions

1. If the minimum commission rate param is increased by governance, what should be done for the validator's whose existing commission rate is lower than the new minimum?  Should they all be automatically increased to  the new minimum?  Or should they be grandfathered in at the old commission rate?
