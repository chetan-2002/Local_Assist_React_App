import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function SingleComment(props) {

  return (
    <>
      <Box
        maxW="20rem"
        w={"93%"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        margin={"12px"}
        p={8}
        textAlign={"center"}
      >
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {props.comment}
        </Text>
      </Box>
    </>
  );
}
