import React from "react";
import { IconButton, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MobileDrawer } from "./Drawer";

export const HamburgerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <IconButton
        onClick={onOpen}
        aria-label="Open menu"
        icon={<HamburgerIcon boxSize={8} />}
        variant="ghost"
        colorScheme="gray"
        _hover={{
          color: useColorModeValue("gray.600", "gray.300"),
          transform: "scale(1.2)",
        }}
      />
      <MobileDrawer isOpen={isOpen} onClose={onClose}>
        <span>teste</span>
      </MobileDrawer>
    </div>
  );
};
