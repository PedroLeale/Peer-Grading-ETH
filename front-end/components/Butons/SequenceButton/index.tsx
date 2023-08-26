import { type MouseEvent } from "react";
import { ImageButton } from "../ImageButton";

interface Props {
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const SequenceButton = ({ onClick, className = "" }: Props) => {
  return (
    <ImageButton
      onClick={onClick}
      className={className}
      imgPath="/images/sequence.png"
    >
      Sequence
    </ImageButton>
  );
};
