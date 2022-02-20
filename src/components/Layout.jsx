import { Box } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Local Assist</title>
      </Head>
      <Box maxWidth="1280px" margin="auto">
        <header>
          <NavBar></NavBar>
        </header>
        <main>{children}</main>
        <footer>
            <Footer></Footer>
        </footer>
      </Box>
    </>
  );
};
export default Layout;