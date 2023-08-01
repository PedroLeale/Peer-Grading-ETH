import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { BaseModal } from "../BaseModal";
import { Wallets } from "../Wallets";
import { useDisclosure } from "@chakra-ui/react";

const WalletButton = () => {
  const { address, status } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderWalletText = () => {
    if (status === "connected" && address) {
      const shortAddress = `${String(address).slice(0, 3)}...${String(
        address
      ).slice(-3)}`;
      return shortAddress;
    } else {
      return "connect wallet";
    }
  };

  return (
    <div>
      <div
        className="p-3 m-3 rounded bg-dark-blue text-white font-bold flex flex-row cursor-pointer"
        onClick={onOpen}
      >
        <Image
          src="/assets/solid_wallet.svg"
          width={18}
          height={18}
          alt="wallet icon"
        />
        <span className="ml-3">{renderWalletText()}</span>
      </div>
      <BaseModal onClose={onClose} isOpen={isOpen} title="connect wallet">
        <Wallets />
      </BaseModal>
    </div>
  );
};

export default WalletButton;
