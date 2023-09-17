import Image from "next/image";
import { type ReactNode, type MouseEvent } from "react";

interface Props {
  className?: string;
  children: ReactNode;
  imgPath?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Defines the onClick prop
}

export const ImageButton = ({
  children,
  imgPath,
  onClick,
  className = "",
}: Props) => {
  return (
    <button
      className={`
      ${className}      
      p-2  
      w-full
      text-center
      bg-[#F2F3F5] rounded-md align-middle inline-flex items-center 
      transition ease-in-out
      hover:bg-[#e5e5e5]
      `}
      onClick={onClick}
    >
      {imgPath && (
        <Image src={imgPath} alt="MetaMask Icon" width={25} height={25} />
      )}{" "}
      <span className="text-[#444] font-bold ml-2 self-center text-center w-full">
        {children}
      </span>
    </button>
  );
};
