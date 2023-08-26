import { type MouseEvent } from "react";
import { ImageButton } from "../ImageButton";

interface Props {
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const MetaMaskButton = ({ onClick, className = "" }: Props) => {
  return (
    <ImageButton
      onClick={onClick}
      className={className}
      imgPath="/images/metamask.svg"
    >
      MetaMask
    </ImageButton>
  );
};
