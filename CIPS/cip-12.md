---
cip: 12
title: Chain registry for Cosmos HD key derivation
author: Simon Warta (@webmaster128)
discussions-to: <URL>
status: Draft
type: <Standards Track, Meta, or Informational>
category (only required for Standards Track): <Core, Networking, Interface, or ERC>
created: 2021-06-16
requires: 11
---

## Simple Summary

This chain registry for Cosmos chains is used to avoid conflicts in the chain
index value of CIP-11.
It is heavily inspired by [SLIP44](https://github.com/satoshilabs/slips/blob/ef6d7700cc/slip-0044.md)
but explicitly registers chains instead of coins.

## Registry

| Chain index | Network                                       | Notes                |
| ----------- | --------------------------------------------- | -------------------- |
| 0           | –                                             | For testing purposes |
| 1           | Cosmos Hub                                    | Reserved but unused  |
| 2           | [Tgrade](https://tgrade.finance/)             |                      |
| 3           | [Starport Network](https://starport.network/) |                      |
| 4           | [Pylons](https://www.pylons.tech/)            |                      |

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
