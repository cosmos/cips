# Distribution module 2.0: Farming the Stars

## Motivation
During the original launch of the Cosmos SDK, the distribution module was  one of the key breakthroughs behind Cosmos proof of stake. It enables the block by block distribution of staking rewards and fees to millions of delegators in a scalable manner.

Buried within the distribution module is something much more powerful, a generic reward module that can enable Cosmos SDK application developers to enable yield farming, rewards for Interchain staking and more. The goal of this endeavor is to surface this potential.

## Use Cases

### Staking Derivatives

Staking derivatives requires a few components to be established. 

1. Staking derivatives reworking the mechanics of the staking module and distribution module to respond to possession of the appropriate denom for both withdrawing staked tokens and collecting rewards
2. Some staking derivatives designs require reward behavior to be triggered at the epoch boundary. The distribution module should be adapted to integrate with epoch base staking.

### Interchain Staking Rewards

Interchain Staking Rewards will require multiple pieces. Each Validator pool can now be a member of one or Interchain Staking Pool. Rewards will be able to be sent directly to these pools from IBC transactions.


### Liquidity Farming


The distribution module needs to establish pools where membership in the pool is established by locked certain denims. For example, there may be a pool that pays out for locking GravityDex LP shares for certain markets to incentivize bootstrapping liquidity.


See some additional thoughts from the Osmosis team.
[Use F1 based reward distribution for v1 · Issue #74 · osmosis-labs/osmosis · GitHub](https://github.com/osmosis-labs/osmosis/issues/74)



## Goals

Create a Pools abstraction that can be extended for different use cases.

Create a validator of pools that enables the current validator/delegator incentive system.

Integrate with staking epochs to enable epoch based behavior.


## Open Questions

1. Is it possible to build the distribution module in a way that it can be extended without forking/customization? The short term goal will be enable the distribution module to be customized and extended with custom pools rather than full programmable.

2. Composability with Cosmwasm.  A subset of the features proposed for the distribution module have been implemented on Cosmwasm supporting blockchains in the last?




