import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Create = () => {
    const navigate = useNavigate();

    const createForm = () => {
        navigate("/create");
      }
  return (
    <Button onClick={createForm}>
        <AddIcon />
    </Button>
  )
}

export default Create;