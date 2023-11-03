import React, {useState} from "react";
import { Trash } from 'tabler-icons-react';
import { Button, TextInput, Flex, Container,Paper, Space, List, ThemeIcon, Center, Box, ListItem } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';

const TodoList = () => {

    const[task, setTask] = useState('');
    const[taskList, setTaskList] = useState([]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      setTaskList([...taskList, task]);
      console.log(taskList);
      setTask("");
    }

    const deleteHandler = (index) => {
      let copyTask = [...taskList]
      copyTask.splice(index, 1);
      setTaskList(copyTask)
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
  >
    
    {taskList.map((task, index) => (
      <List.Item key={index}>
        {task}
       
        <Trash size={24} strokeWidth={2} color={'black'} onClick={() => {
          deleteHandler(index);
        }} />
 
        </List.Item>
      ))}
    </List>
    </Center>
    </Paper>
   </>
   
    
  );
}
 
export default TodoList;