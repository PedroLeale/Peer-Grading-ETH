import { Navbar } from "@/components/Navbar";
interface Props {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />

      <div className=" m-auto">
        <div className="mt-">{children}</div>
      </div>
    </div>
  );
};
