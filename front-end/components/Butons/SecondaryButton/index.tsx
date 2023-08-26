import { type MouseEvent, type ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode; // Defines the children prop
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const SecondaryButton = ({
  children,
  onClick,
  className = "",
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`
      ${className}
    bg-white    
        mr-3
    text-propy-secondary
       flex-col justify-center items-center 
       flex-shrink-0 rounded-full px-2 py-2
       transition ease-in-out
      `}
    >
      {children}
    </button>
  );
};
