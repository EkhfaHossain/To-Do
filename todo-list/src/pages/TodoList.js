import React, {useState} from "react";
import { Button, TextInput, Flex, Container, Space, List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';

const TodoList = () => {

  const[task, setTask] = useState('');
  const[taskList, setTaskList] = useState([]);

  const handleTaskChange = (e) => {
      const newValue = e.currentTarget.value;
      console.log(newValue); 
      setTask(newValue);
    }
  
  const submitHandler = (e) =>{
    e.preventDefault()
    setTask("");
  }


    return ( 
    <>
    <Flex justify="center" align="center" direction="row" wrap="wrap">
    <TextInput value={task} size="xl" radius="xl"
    placeholder="Enter Your Task!" 
    onChange={handleTaskChange}/>
    <Space w="lg"/>
    <Button>Add</Button>
    </Flex>
    <Space h="xl"/>
    <List
    spacing="lg"
    size="sm"
    center
    icon={
      <ThemeIcon color="blue" size={24} radius="xl">
        <IconCircleCheck size="1rem" />
      </ThemeIcon>
    }
  >
    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleDashed size="1rem" />
          </ThemeIcon>
        }
      >
        Submit a pull request once you are done
      </List.Item>
    </List>
   </>
    
  );
}
 
export default TodoList;