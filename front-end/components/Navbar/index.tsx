import { type ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerButton } from "./HamburgerButton";
import { SignUpModal } from "../SignUpModal";
import { useHandleToken } from "@/lib/utils/useHandleToken";
import WalletButton from "../WalletButton";
import { useRouter } from "next/router";
import { SignInModal } from "../SignInModal";

const Links = ["Dashboard", "Team"];

const NavLink = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <Link
      px={2}
      onClick={() => {
        router.push(String(children)?.toString().toLowerCase());
      }}
      py={1}
      rounded={"md"}
      color="white" // Set the color prop to "white"
      _hover={{
        color: "black",
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Link>
  );
};

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSignIn,
    onOpen: onOpenSignIn,
    onClose: onCloseSignIn,
  } = useDisclosure();

  // TODO: atualizar esse código posteriorment

  return (
    <>
      <Box bg={`#D9D9D9`} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <div className="flex flex-row items-center">
            <Link href="/home">
              <div className="cursor-pointer">
                <span className="text-2xl font-bold ">ScoreSync</span>
              </div>
            </Link>
          </div>

          <HStack spacing={8} alignItems={"center"} hideFrom="sm">
            <HamburgerButton />
          </HStack>

          <HStack spacing={8} alignItems={"center"} hideBelow="md">
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} hideBelow="md">
            <WalletButton></WalletButton>
          </Flex>
        </Flex>
      </Box>
      <SignUpModal isOpen={isOpen} onClose={onClose} title="Sign up" />
      <SignInModal
        isOpen={isOpenSignIn}
        onClose={onCloseSignIn}
        title="Sign in with your wallet "
      />
    </>
  );
};
