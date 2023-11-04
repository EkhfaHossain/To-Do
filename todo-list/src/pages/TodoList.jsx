import React, { useState, useEffect } from "react";
import { Button, TextInput, Flex, Container, Space, Box } from "@mantine/core";
import { IconCircleCheck, IconTrash, IconCircleDashed } from '@tabler/icons-react';
import dynamic from "next/dynamic";


const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    let list = localStorage.getItem('tasks');

    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }
  return [];
};


const TodoList = () => {
  
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState(getLocalStorage());
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(task.trim() !== "") {
    setTaskList([...taskList, { text: task, done: false }]);
    setTask("");
    }
  };

  const deleteHandler = (index) => {
    const copyTask = [...taskList];
    copyTask.splice(index, 1);
    setTaskList(copyTask);
  };

  const toggleTaskDone = (index) => {
    const copyTask = [...taskList];
    copyTask[index].done = !copyTask[index].done;
    setTaskList(copyTask);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <Flex justify="center" align="center" direction="row">
          <TextInput value={task} size="lg" w={"100%"} radius="xl" placeholder="Enter Your Task!"
            onChange={(e) => {
              setTask(e.target.value);
            }}/>

          <Space w="lg" />

          <Button size="lg" radius="lg "onClick={submitHandler}>Add</Button>
        </Flex>
      </form>

      <Space h="xl" />

      <Flex align={"center"} justify={"center"} direction={"column"} w={"100%"} >
        {taskList.map((task, index) => (
          <Box key={index} w={"100%"} my={"lg"} >
            <Flex align="center" justify="space-between" p={"1px"} w={"100%"}>
              <span
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                }}>
                {task.text}
              </span>

              <Flex>
                {task.done ? 
                  (
                    <IconCircleCheck size={20} color="green" style={{ cursor: "pointer" }}
                      onClick={() => toggleTaskDone(index)}  
                    />
                  ) : (
                    <IconCircleDashed size={20} color="gray" style={{ cursor: "pointer" }}
                      onClick={() => toggleTaskDone(index)}  
                    />
                  )}

                 <Space w="lg" />

                 <IconTrash size={20} color="red" style={{ cursor: "pointer" }} 
                  onClick={() => {deleteHandler(index) }}
                  />
              </Flex>
           </Flex>
          </Box>
        ))}
     </Flex>  
    </>
  );
};


export default dynamic (() => Promise.resolve(TodoList), {ssr: false})

