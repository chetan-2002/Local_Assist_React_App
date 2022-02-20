// localhoast:3000/dashboard
import { Link as ReachLink, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Text,
  Image,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useUserAuth } from "../context/UserAuthContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";
import SingleComment from "./SingleComment";
import { Input } from "@chakra-ui/react";
import Create from "./Create";

const Comments = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  // Post Id
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const usersCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const response = await getDocs(usersCollectionRef);
      setPosts(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [newComment]);

  let title = null;
  let comments = null;
  let firstName = "";
  let lastName = "";
  let url = "";
  posts.map((post) => {
    if (post.id === id) {
      title = post.description;
      comments = post.comments;
      firstName = post.firstName;
      lastName = post.lastName;
      url = post.image;
    }
  });

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
    return navigate("/login");
  };

  const AddComment = async () => {
    const postDoc = doc(db, "posts", id);
    const newCommentArray = [...comments, newComment];
    await updateDoc(postDoc, { comments: newCommentArray });
    setNewComment("");
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
                  <MenuItem>Your Servers</MenuItem>
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
      <Flex flexDir={"column"} alignItems={"center"}>
        <Flex alignItems={"center"} gap="50px">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            padding={4}
            fontSize="2xl"
            fontFamily={["sans-serif"]}
            fontWeight="bold"
          >
            {title}
          </Box>
          {/* <Spacer /> */}
          <Box>
            <Flex alignItems={"center"}>
              <Box>
                <Input
                  variant="flushed"
                  placeholder="Add a Comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Box>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                onClick={() => {
                  AddComment();
                }}
              >
                Comment
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
          {
            <Masonry>
              {comments?.map((item) => (
                <SingleComment key={item.id} comment={item} />
              ))}
            </Masonry>
          }
        </ResponsiveMasonry>
      </Box>
    </>
  );
};

export default Comments;
