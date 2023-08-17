import React from "react";
import { Box, Image } from "@chakra-ui/react";

export const TextBorder = ({
  children,
  imageSrc,
}: {
  children: string;
  imageSrc: string;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="10px"
      border="3px solid"
      borderColor="#004238"
      borderRadius="lg"
      justifyContent="flex-start"
    >
      <Image src={imageSrc} w="60px" h="60px" />
      <Box marginTop="10px">{children}</Box>
    </Box>
  );
};

export default TextBorder;
