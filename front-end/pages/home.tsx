import { Navbar } from "@/components/Navbar";
import { TextBorder } from "../components/TextBorder";
import { Flex, Image, Box } from '@chakra-ui/react'

export default function Home() {
  return (
    <><Navbar />
    <div className=" w-1000 h-screen flex justify-center items-center">
        <Flex direction="row">
        <TextBorder children={"Peer Grading text 1"} imageSrc={"/assets/security-icon.png"}/>
        <Box w='70px' h='10'/>
        <TextBorder children={"Peer Grading text 2"} imageSrc={"/assets/verified-icon.png"}/>
        <Box w='70px' h='10'/>
        <Image
            src="/assets/first-page-image.png"
            w="500px"
            h="600px"
          />
        </Flex>
      </div></>
  );
}
