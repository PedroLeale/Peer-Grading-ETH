import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProfileSide = () => {
  const profileIcon = "http://placekitten.com/200/300";

  const name = "pedro bufulin";

  const router = useRouter();

  return (
    <div className="w-1/4 m-5 border-2 border-hard-pink rounded-md p-3">
      <Flex alignItems="left" flexDirection={"column"}>
        <Flex flexDirection={"row"} alignItems={"center"}>
          <Avatar size="md" src={profileIcon} />
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="bold">
              {name}
            </Text>
          </Box>
        </Flex>

        <Button
          width={"fit-content"}
          height="24px"
          lineHeight="1.2"
          marginTop={"2"}
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          border="1px"
          px="8px"
          borderRadius="5px"
          fontSize="14px"
          fontWeight="semibold"
          bg="#fff"
          borderColor="#804461"
          color="#4b4f56"
          _hover={{ bg: "#e6d4dc" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          onClick={async () => await router.push("/create-place")}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
        >
          tokenize your property
        </Button>
      </Flex>
    </div>
  );
};

export default ProfileSide;
