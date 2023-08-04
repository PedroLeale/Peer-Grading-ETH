import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ColoredBadge = ({ children }: Props) => {
  const badgeStyle = `bg-[#7777] text-black font-bold text-sm py-1 px-2 rounded-full`;

  return <span className={badgeStyle}>{children}</span>;
};
