export const renderWalletText = (
  status: string,
  address: `0x${string}` | undefined
) => {
  if (status === "connected" && address) {
    const shortAddress = `${String(address).slice(0, 3)}...${String(
      address
    ).slice(-3)}`;
    return shortAddress;
  } else {
    return "connect wallet";
  }
};
