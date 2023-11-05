import React, { useState, useEffect } from 'react'
import { Button, TextInput, Flex, Space, Box } from '@mantine/core'
import { IconCircleCheck, IconTrash, IconEdit, IconCircleDashed } from '@tabler/icons-react'
import { v4 as uuidv4 } from 'uuid'
import dynamic from 'next/dynamic'

const LOCAL_STORAGE_KEY = 'tasks'

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    let list = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (list) {
      return JSON.parse(list)
    } else {
      return []
    }
  }
  return []
}

const TodoList = () => {
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState(getLocalStorage())

  const [editedTaskId, setEditedTaskId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()

    if (task.trim() !== '') {
      if (isEditing) {
        setTaskList((prevTaskList) => {
          const updatedTasks = prevTaskList.map((item) => {
            if (item.id === editedTaskId) {
              return { ...item, text: task }
            }
            return item
          })
          return updatedTasks
        })

        setTask('')
        setIsEditing(false)
        setEditedTaskId(null)
      } else {
        setTaskList((prevTaskList) => [
          ...prevTaskList,
          { id: uuidv4(), text: task, status: false },
        ])
        setTask('')
      }
    }
  }

  const deleteHandler = (id) => {
    setTaskList((prevTaskList) => prevTaskList.filter((task) => task.id !== id))
  }

  const toggleTaskStatus = (id) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status }
        }
        return task
      })
    )
  }

  const editHandler = (id, text) => {
    setIsEditing(true)
    setEditedTaskId(id)
    setTask(text)
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, index) => {
    const sourceIndex = e.dataTransfer.getData('text/plain')
    if (sourceIndex !== '' && sourceIndex !== index) {
      const updatedTaskList = [...taskList]
      const [draggedTask] = updatedTaskList.splice(sourceIndex, 1)
      updatedTaskList.splice(index, 0, draggedTask)
      setTaskList(updatedTaskList)
    }
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList))
  }, [taskList])

  return (
    <>
      <form onSubmit={submitHandler}>
        <Flex justify="center" align="center" direction="row">
          <TextInput
            value={task}
            size="lg"
            w={'100%'}
            radius="lg"
            placeholder="Enter Your Task"
            onChange={(e) => {
              setTask(e.target.value)
            }}
          />

          <Space w="lg" />

          <Button size="lg" radius="lg" onClick={submitHandler}>
            {isEditing ? 'Save' : 'Add'}
          </Button>
        </Flex>
      </form>

      <Space h="xl" />

      {taskList.map((task, index) => (
        <Box
          key={task.id}
          w={'100%'}
          my={'lg'}
          style={{ cursor: 'grab' }}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}>
          <Flex
            align="center"
            justify="space-between"
            p={'10px'}
            w={'100%'}
            style={{
              border: '2px solid rgb(65, 148, 230)',
              background: 'white',
              borderRadius: '10px',
            }}>
            <span
              style={{
                textDecoration: task.status ? 'line-through' : 'none',
                fontSize: '18px',
              }}>
              {task.text}
            </span>

            <Flex>
              {task.status ? (
                <IconCircleCheck
                  size={20}
                  color="green"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleTaskStatus(task.id)}
                />
              ) : (
                <IconCircleDashed
                  size={20}
                  color="gray"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleTaskStatus(task.id)}
                />
              )}

              <Space w="lg" />
              {task.id === editedTaskId ? (
                isEditing ? (
                  <IconEdit
                    size={20}
                    color="blue"
                    style={{ cursor: 'pointer' }}
                    onClick={submitHandler}
                  />
                ) : (
                  <IconEdit
                    size={20}
                    color="blue"
                    style={{ cursor: 'pointer' }}
                    onClick={() => editHandler(task.id, task.text)}
                  />
                )
              ) : (
                <IconEdit
                  size={20}
                  color="blue"
                  style={{ cursor: 'pointer' }}
                  onClick={() => editHandler(task.id, task.text)}
                />
              )}
              <Space w="lg" />
              <IconTrash
                size={20}
                color="red"
                style={{ cursor: 'pointer' }}
                onClick={() => deleteHandler(task.id)}
              />
            </Flex>
          </Flex>
        </Box>
      ))}
    </>
  )
}

export default dynamic(() => Promise.resolve(TodoList), { ssr: false })
