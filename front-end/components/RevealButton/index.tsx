import { type AddedParticipant } from "@/lib/services/apollo/queries/AllParticipants";
import { useAccount } from "wagmi";
import Cookies from "js-cookie";
import abi from "@/abi/RandomnessSource.json";
import { useState } from "react";
import { useDisclosure, Input, ModalFooter, Button } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";
import { useReveal } from "@/lib/wagmi/useReveal";

interface IRevealButton {
  addedParticipants: AddedParticipant[];
  randSrc: string;
}

export const RevealButton = ({ addedParticipants, randSrc }: IRevealButton) => {
  const { address } = useAccount();
  console.log({ randSrc, abi });

  const { onClose, onOpen, isOpen } = useDisclosure();

  const [inputValue, setInputValue] = useState(0);
  const { write } = useReveal({ randSrc, randNumb: inputValue });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  const handleCommitInput = () => {
    write?.();
  };

  const handleOpen = () => {
    // Retrieve the commit value from the cookies when the modal opens
    const commitValue = Cookies.get(`commitValue/${randSrc}`);
    // If the commit value exists, set it as the input value
    // If the commit value does not exist, set the input value to 0
    setInputValue(commitValue ? Number(commitValue) : 0);
    onOpen();
  };

  if (
    addedParticipants
      .map((ap) => ap.participant)
      .includes(String(address?.toLocaleLowerCase()))
  )
    return (
      <div className="text-left p-4 bg-white rounded-lg w-1/2">
        <button
          className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleOpen}
        >
          Reveal commit
        </button>
        <BaseModal title="Input commit" isOpen={isOpen} onClose={onClose}>
          {
            <div>
              <Input
                placeholder="Commit value"
                value={inputValue}
                onChange={handleInputChange}
              />

              <ModalFooter>
                <Button disabled={!write} onClick={handleCommitInput}>
                  Reveal commit
                </Button>
              </ModalFooter>
            </div>
          }
        </BaseModal>
      </div>
    );
  else return <div></div>;
};
