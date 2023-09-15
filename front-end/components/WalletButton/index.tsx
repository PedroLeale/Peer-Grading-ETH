import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { BaseModal } from "../BaseModal";
import { Wallets } from "../Wallets";
import { useDisclosure } from "@chakra-ui/react";
import { renderWalletText } from "@/lib/utils/renderWalletText";

const WalletButton = () => {
  const { address, status } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div
        className="p-3 m-3  bg-pg-primary text-[#444] font-bold flex flex-row cursor-pointer rounded-md"
        onClick={onOpen}
      >
        <Image
          src="/assets/solid_wallet.svg"
          width={18}
          height={18}
          alt="wallet icon"
        />
        <span className="ml-3">{renderWalletText(status, address)}</span>
      </div>
      <BaseModal onClose={onClose} isOpen={isOpen} title="connect wallet">
        <Wallets />
      </BaseModal>
    </div>
  );
};

export default WalletButton;
