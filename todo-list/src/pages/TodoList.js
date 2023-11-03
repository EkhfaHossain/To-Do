import React, {useState} from "react";
import { Button, TextInput, Flex, Container,Paper, Space, List, ThemeIcon, Center, Box, ListItem } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';

const TodoList = () => {

    const[task, setTask] = useState('');
    const[taskList, setTaskList] = useState([]);
  
    const submitHandler = (e) =>{
      e.preventDefault();
      setTaskList([...taskList, task]);
      console.log(taskList);
      setTask("");
    }


    return ( 
    <>
    <form onSubmit={submitHandler}>
    <Flex justify="center" align="center" direction="row">
    <TextInput value={task} size="lg" w={"100%"} radius="xl"
     placeholder="Enter Your Task!" onChange={(e) => {
      setTask(e.target.value)
     }}/>
    <Space w="lg"/>
    <Button onClick={submitHandler}>Add</Button>
    </Flex>
    </form>


    <Space h="xl"/>
    <Paper shadow="xl" radius="xl" withBorder p="xl">
    <Center>
    <List spacing="lg" size="sm" center
    icon={
      <ThemeIcon color="blue" size={24} radius="xl">
        <IconCircleCheck size="1rem" />
      </ThemeIcon>
    }
  >
    
    {taskList.map((task, index) => (
      <List.Item key={index}>
        {task}
        </List.Item>
      ))}
    </List>
    </Center>
    </Paper>
   </>
   
    
  );
}
 
export default TodoList;