import { type MouseEvent, type ReactNode } from "react";

interface Props {
  key?: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode; // Defines the children prop
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const PrimaryButton = ({
  key = "",
  children,
  onClick,
  disabled = false,
  className = "",
}: Props) => {
  return (
    <button
      key={key}
      disabled={disabled}
      onClick={onClick}
      className={`
      ${className}
      ${disabled ? "opacity-40" : ""}
      text-white
      inline-flex  flex-col justify-center items-center p-2  flex-shrink-0 rounded-full 
      transition ease-in-out
      `}
    >
      {children}
    </button>
  );
};
