import { TextBorder } from "../components/TextBorder";
import { Flex, Image, Box } from "@chakra-ui/react";
import { Explanation } from "@/components/Explanation";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { type ReactNode } from "react";

function Home() {
  return (
    <div className=" w-1000 h-screen m-auto flex  flex-col ">
      <Explanation />

      <h1 className="p-2 text-2xl font-bold mb-4">Some example contracts</h1>

      <Flex direction="row" className="p-4">
        <TextBorder
          children={"Peer Grading text 1"}
          imageSrc={"/assets/security-icon.png"}
        />
        <Box w="70px" h="10" />
        <TextBorder
          children={"Peer Grading text 2"}
          imageSrc={"/assets/verified-icon.png"}
        />
        <Box w="70px" h="10" />
        <Image src="/assets/first-page-image.png" w="500px" h="600px" />
      </Flex>
    </div>
  );
}
Home.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
