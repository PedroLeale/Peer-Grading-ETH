import { Navbar } from "@/components/Navbar";
interface Props {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />

      <div className="max-w-[1200px] m-auto">
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
