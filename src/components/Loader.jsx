import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div
      style={{
        position: "absolute",
        right: "30%",
        width: "300px",
        padding: "10px",
      }}
    >
      <Spinner
        thickness="7px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
};

export default Loader;
