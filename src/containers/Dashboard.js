// localhoast:3000/dashboard
import { Link as ReachLink, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { MoonIcon, SunIcon, AddIcon } from "@chakra-ui/icons";
import { useUserAuth } from "../context/UserAuthContext";
import Card from "../components/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";
import Create from "../components/Create";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(true);
  const [posts, setPosts] = useState([]);
  const usersCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const response = await getDocs(usersCollectionRef);
      setPosts(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsFetching(false);
    };

    getPosts();
  });

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
    return navigate("/login");
  };

  return (
    <>
      <Heading>
        <title>Local Assist</title>
      </Heading>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight="bold" fontSize="3xl" fontFamily="sans-serif">
            <button>
              <Link
                as={ReachLink}
                to="/dashboard"
                style={{ textDecoration: "none" }}
              >
                Local Assist
              </Link>
            </button>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Create />
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    {user ? <p>{user.email}</p> : <p>Username</p>}
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Add Profile Photo</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>
                    <Button colorScheme="teal" size="xs" onClick={handleLogout}>
                      Log Out
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
          {isFetching ? (
            <Loader />
          ) : (
            <Masonry>
              {posts.map((post) => (
                <Card
                  key={post.id}
                  description={post.description}
                  id={post.id}
                  url={post.image}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  // like={post.like}
                />
              ))}
            </Masonry>
          )}
        </ResponsiveMasonry>
      </Box>
    </>
  );
}
