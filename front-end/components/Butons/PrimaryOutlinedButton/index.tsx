import { type MouseEvent, type ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode; // Defines the children prop
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const PrimaryOutlinedButton = ({
  children,
  onClick,
  className = "",
}: Props) => {
  return (
    <button
      className={`
      transition duration-300 

      hover:bg-propy-primary-dark
      ease-in-out border-solid overflow-hidden flex flex-col px-2 items-center py-2 border rounded-[100px] hover:bg-gray-700
      
      ${className}

      `}
      onClick={onClick}
    >
      <div className="text-center text-sm font-medium  text-white">
        {children}
      </div>
    </button>
  );
};
