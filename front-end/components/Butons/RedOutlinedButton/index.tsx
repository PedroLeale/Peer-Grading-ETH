import { type ReactNode, type MouseEvent } from "react";

interface Props {
  key?: string;
  className?: string;
  children: ReactNode; // Defines the children prop
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const RedOutlinedButton = ({
  onClick,
  children,
  className = "",
}: Props) => {
  return (
    <button
      className={` 
      ${className}
      flex  overflow-hidden p-2      whitespace-nowrap 
        text-[#ff3232] border border-[#ff3232] border-1 rounded-[100px]
    w-min `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
