import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const ColoredBadge = ({ children, className }: Props) => {
  const badgeStyle = `bg-[#7777] text-black font-bold text-sm py-1 px-2 rounded-full ${
    className ?? ""
  }`;

  return <span className={badgeStyle}>{children}</span>;
};
