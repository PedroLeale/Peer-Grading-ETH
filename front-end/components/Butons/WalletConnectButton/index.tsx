import { type MouseEvent } from "react";
import { ImageButton } from "../ImageButton";

interface Props {
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const WalletConnect = ({ onClick, className = "" }: Props) => {
  return (
    <ImageButton
      onClick={onClick}
      className={className}
      imgPath="/images/wallet_connect.png"
    >
      WalletConnect
    </ImageButton>
  );
};
