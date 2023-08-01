import { BaseModal } from "../BaseModal";
import { Wallets } from "../Wallets";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export function SignInModal({ onClose, isOpen, title }: Props) {
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
        <Wallets />
      </BaseModal>
    </>
  );
}
