import { type AddedParticipant } from "@/lib/services/apollo/queries/AllParticipants";
import { useAccount } from "wagmi";

import abi from "@/abi/RandomnessSource.json";
import { useEffect, useState } from "react";
import { useCommit } from "@/lib/wagmi/useCommit";
import {
  useDisclosure,
  Checkbox,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";
import Cookies from "js-cookie";

interface IVotedButton {
  addedParticipants: AddedParticipant[];
  randSrc: string;
}

export const CommitButton = ({ addedParticipants, randSrc }: IVotedButton) => {
  const { address } = useAccount();
  console.log({ randSrc, abi });

  const { /* write */ error } = useCommit({ randSrc, _commit: "asaofsdaifj" });
  const { onClose, onOpen, isOpen } = useDisclosure();

  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      Cookies.set("commitValue", inputValue, { path: "/" });
    }
  };

  const handleCommitInput = () => {
    Cookies.set("commitValue", inputValue, { path: "/" });
  };

  useEffect(() => {
    if (error) {
      console.log({ error });
    }
  }, [error]);

  if (
    addedParticipants
      .map((ap) => ap.participant)
      .includes(String(address?.toLocaleLowerCase()))
  )
    return (
      <div className="text-left p-4 bg-white rounded-lg w-1/2">
        <button
          className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            onOpen();
          }}
        >
          commit
        </button>
        <BaseModal title="Input commit" isOpen={isOpen} onClose={onClose}>
          {
            <div>
              <Input
                placeholder="Commit value"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Checkbox
                defaultChecked={isChecked}
                onChange={handleCheckboxChange}
              >
                Store commit value on cookies
              </Checkbox>
              <ModalFooter>
                <Button onClick={handleCommitInput}>Commit input</Button>
              </ModalFooter>
            </div>
          }
        </BaseModal>
      </div>
    );
  else return <div></div>;
};
