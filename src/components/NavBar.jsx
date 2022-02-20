import { Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { FcMenu } from "react-icons/fc";
import { IconButton } from "@chakra-ui/react";
import { Flex, Box } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex
      p="2"
      borderBottom="1px"
      paddingRight={4}
      paddingLeft={4}
      borderColor="gray.400"
    >
      <Box fontSize="3xl" color="blue.400" fontWeight="bold">
        <Link href="/">Local Assist</Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outline"
            color="red.400"
          />
          <MenuList>
            <MenuItem>Lorem Ipsum</MenuItem>
            <MenuItem>Lorem Ipsum</MenuItem>
            <MenuItem>Lorem Ipsum</MenuItem>
            <MenuItem>Lorem Ipsum</MenuItem>
            <MenuItem>Lorem Ipsum</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
export default NavBar;