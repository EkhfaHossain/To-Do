import styles from './style.module.css'
import TodoList from './TodoList'
import { Center, Container } from '@mantine/core'

export default function Home() {
  return (
    <>
      <Container style={{ width: '100%' }}>
        <Center>
          <h1> Drop your To-Dos Here! </h1>
        </Center>

        <TodoList />
      </Container>
    </>
  )
}
