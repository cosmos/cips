# Requires a version of bip_utils > 1.1.1
# 1. Ensure bip_utils is not installed
# 2. Clone https://github.com/ebellocchia/bip_utils
# 3. Navigate to checkout and run `python3 setup.py install`
# 4. Get ☕️ while libsodium is compiling
# 5. Execute this script with `python3 generate_test_vectors.py`

from bip_utils import Bip32Utils, Bip32Path

COSMOS_PURPOSE=7564153

def cosmos_path(chain_index, *argv):
  out = [Bip32Utils.HardenIndex(COSMOS_PURPOSE), Bip32Utils.HardenIndex(chain_index)]
  for arg in argv:
    out.append(arg)
  return out


def cosmos_simple_hd_path(chain_index, a):
  return cosmos_path(chain_index, Bip32Utils.HardenIndex(1), a)

def print_path(path):
  hexlist=",".join('{:0>8x}'.format(c) for c in path)
  print("m/" + Bip32Path(path).ToStr() + ": " + hexlist)

print("Simple HD path for account 0, 1, 75_000_000 on the testing chain:")
for a in [0, 1, 75_000_000]:
  print_path(cosmos_simple_hd_path(0, a))

print("Simple HD path for account 0 on the chains 0, 1, 42, 42_000_000:")
for chain_index in [0, 1, 42, 42_000_000]:
  print_path(cosmos_simple_hd_path(chain_index, 0))

print("Cosmos path with all unhardened sub-trees of length 0, 1, 3 on the testing chain:")
print_path(cosmos_path(0))
print_path(cosmos_path(0, 7))
print_path(cosmos_path(0, 7, 7, 7))

print("Cosmos path with all hardened sub-trees of length 0, 1, 3 on the testing chain:")
print_path(cosmos_path(0))
print_path(cosmos_path(0, Bip32Utils.HardenIndex(7)))
print_path(cosmos_path(0, Bip32Utils.HardenIndex(7), Bip32Utils.HardenIndex(7), Bip32Utils.HardenIndex(7)))

print("Cosmos path with hardened/unhardened sub-tree on the testing chain:")
print_path(cosmos_path(0, Bip32Utils.HardenIndex(2), 3, Bip32Utils.HardenIndex(4)))
