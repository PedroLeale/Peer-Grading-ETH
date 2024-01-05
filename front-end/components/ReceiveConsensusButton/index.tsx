import { useState } from "react";
import { useDisclosure, Input, ModalFooter, Button } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";
import { useSendConsensus } from "@/lib/wagmi/useSendConsensus";

interface IReceiveConsensus {
  contract: string;
}

export const ReceiveConsensusButton = ({ contract }: IReceiveConsensus) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9,]*$/;
    const value = event.target.value;
    // If the value matches the regex, update the input value
    if (regex.test(value)) {
      setInputValue(value);
    }
  };

  const { write } = useSendConsensus({
    contract,
    uintVector: inputValue,
  });

  const HandleWrite = () => {
    write?.();
  };

  return (
    <div className="text-left p-4 bg-white rounded-lg w-1/2">
      <button
        className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => {
          onOpen();
        }}
      >
        Insert consensus
      </button>
      <BaseModal
        title="send consensus vector"
        isOpen={isOpen}
        onClose={onClose}
      >
        {
          <div>
            <span>
              insert as comma separated values. the best from the left, and the
              worst to the end
            </span>
            <Input
              placeholder="consenus vector"
              value={inputValue}
              onChange={handleInputChange}
            />

            <ModalFooter>
              <Button disabled={!write} onClick={HandleWrite}>
                Send consensus
              </Button>
            </ModalFooter>
          </div>
        }
      </BaseModal>
    </div>
  );
};
