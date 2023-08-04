interface Props {
  className: string;
}

export const SidedButton = ({ className }: Props) => {
  const commonStyle = `rounded-s-lg bg-[#884566] p-1 cursor-pointer w-[100px] text-center`;

  return (
    <div className={`flex flex-row text-white ${className}`}>
      <div dir="ltr" className="flex flex-col">
        <div className={`${commonStyle} border-r-2 border-white`}>
          <span>company</span>
        </div>
      </div>

      <div dir="rtl">
        <div className={`${commonStyle}`}>
          <span>guest</span>
        </div>
      </div>
    </div>
  );
};
