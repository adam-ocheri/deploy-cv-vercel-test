/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import axios from "axios";

const upload = () => {
  const [file, setFile] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file?.target.files[0]);
  };

  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={setFile} />
        <button>Upload</button>
      </form>
    </Center>
  );
};

export default upload;
