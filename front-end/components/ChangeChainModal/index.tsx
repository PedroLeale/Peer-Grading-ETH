import { Button, useDisclosure } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useEffect } from "react";
import { polygonMumbai } from "viem/chains";

export function ChangeChainModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { chain } = useNetwork();
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  useEffect(() => {
    if (chain?.id) {
      if (chain.id !== polygonMumbai.id) {
        onOpen();
      }
    }
    if (chain?.id === polygonMumbai.id) onClose();
  }, [chain]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="set the correct network"
    >
      <div className="flex flex-col items-center">
        <span> you must change your network in order to use the app</span>
        <Button
          className="w-1/2 items mt-5"
          disabled={!switchNetwork || chain?.id === polygonMumbai.id}
          onClick={() => {
            switchNetwork?.(polygonMumbai.id);
          }}
        >
          {isLoading && pendingChainId
            ? "loading chain..."
            : "switch to mumbai"}
        </Button>
      </div>
    </BaseModal>
  );
}
