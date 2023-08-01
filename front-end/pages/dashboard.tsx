import ProfileSide from "@/components/ProfileSide";
import { Navbar } from "../components/Navbar";
import "react-quill/dist/quill.snow.css";

const Dashboard = () => {
  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />
      <ProfileSide />
    </div>
  );
};

export default Dashboard;
