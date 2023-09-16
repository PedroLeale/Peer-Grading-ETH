import { type ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerButton } from "./HamburgerButton";
import WalletButton from "../WalletButton";
import { useRouter } from "next/router";
import { ConnectWalletModal } from "../ConnectWalletModal";

const Links = [
  {
    name: "Do a peer review",
    route: "create",
  },
];

const NavLink = ({
  children,
  route,
}: {
  children: ReactNode;
  route: string;
}) => {
  const router = useRouter();

  return (
    <Link
      px={2}
      onClick={() => {
        router.push(route);
      }}
      py={1}
      rounded={"md"}
      color="black"
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
  const { isOpen: isOpenSignIn, onClose: onCloseSignIn } = useDisclosure();

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
                <NavLink key={link.route} route={link.route}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} hideBelow="md">
            <WalletButton></WalletButton>
          </Flex>
        </Flex>
      </Box>
      <ConnectWalletModal
        isOpen={isOpenSignIn}
        onClose={onCloseSignIn}
        title="Sign in with your wallet "
      />
    </>
  );
};
