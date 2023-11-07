import React, { useState, useEffect } from "react";
import { Button, TextInput, Flex, Space, Box } from "@mantine/core";
import {
  IconCircleCheck,
  IconTrash,
  IconEdit,
  IconCircleDashed,
} from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoList.module.css";

const LOCAL_STORAGE_KEY = "tasks";

const getTasks = () => {
  if (typeof window !== "undefined") {
    const list = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (list) {
      return JSON.parse(list);
    }
  }
  return [];
};

const TodoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(getTasks());
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (text) => {
    setTaskList((prevTaskList) => [
      ...prevTaskList,
      { id: uuidv4(), text, status: false },
    ]);
  };

  const editTask = (id, text) => {
    setIsEditing(true);
    setEditedTaskId(id);
    setTask(text);
  };

  const saveTask = () => {
    setTaskList((prevTaskList) => {
      const updatedTasks = prevTaskList.map((item) =>
        item.id === editedTaskId ? { ...item, text: task } : item
      );
      return updatedTasks;
    });

    setTask("");
    setIsEditing(false);
    setEditedTaskId(null);
  };

  const deleteTask = (id) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task.id !== id)
    );
  };

  const toggleTaskStatus = (id) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      if (isEditing) {
        saveTask();
      } else {
        addTask(task);
        setTask("");
      }
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Flex justify="center" align="center" direction="row">
          <TextInput
            value={task}
            size="lg"
            w={"100%"}
            radius="lg"
            placeholder="Enter Your Task"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <Space w="lg" />
          <Button size="lg" radius="lg" onClick={submitHandler}>
            {isEditing ? "Save" : "Add"}
          </Button>
        </Flex>
      </form>

      <Space h="xl" />

      {taskList.map((task) => (
        <Box w={"100%"} my={"lg"}>
          <Flex
            align="center"
            justify="space-between"
            p={"10px"}
            w={"100%"}
            className={styles.taskContainer}
          >
            <span
              className={`${styles.taskText} ${
                task.status ? styles.completedTask : ""
              }`}
            >
              {task.text}
            </span>

            <Flex>
              {task.status ? (
                <IconCircleCheck
                  className={styles.iconCircleCheck}
                  onClick={() => toggleTaskStatus(task.id)}
                />
              ) : (
                <IconCircleDashed
                  className={styles.iconCircleDashed}
                  onClick={() => toggleTaskStatus(task.id)}
                />
              )}
              <Space w="lg" />
              {task.id === editedTaskId ? (
                isEditing ? (
                  <IconEdit className={styles.iconEdit} onClick={saveTask} />
                ) : (
                  <IconEdit
                    className={styles.iconEdit}
                    onClick={() => editTask(task.id, task.text)}
                  />
                )
              ) : (
                <IconEdit
                  className={styles.iconEdit}
                  onClick={() => editTask(task.id, task.text)}
                />
              )}
              <Space w="lg" />
              <IconTrash
                className={styles.iconTrash}
                onClick={() => deleteTask(task.id)}
              />
            </Flex>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default TodoList;
