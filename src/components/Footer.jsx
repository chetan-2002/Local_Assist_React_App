import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      style={{
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        padding: "1.1rem",
      }}
    >
      <Text style={{ textAlign: "center" }}>
        © 2022 Local Assist. All rights reserved
      </Text>
    </Box>
  );
}
