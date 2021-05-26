import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'

import Form from './src/components/Form'
import Navbar from './src/components/Navbar'
import TodoList from './src/components/TodoList'
import { getTodos, saveTodos } from './src/storage'

const App = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTodos().then(data => {
      data && setTodos(JSON.parse(data))
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = title => setTodos([...todos, {
    id: String(Date.now()),
    title, completed: false,
  }])

  const removeTodo = id => {
    setTodos(todos.filter(({ id: todoId, }) => todoId !== id))
  }

  const updateTodo = (id, key, newText) => {
    const toggledIndex = todos.findIndex(({ id: todoId, }) => todoId === id)

    setTodos([
      ...todos.slice(0, toggledIndex),
      {
        ...todos[toggledIndex],
        [key]: key === 'title' ?
          newText || todos[toggledIndex].title :
          !todos[toggledIndex].completed,
      },
      ...todos.slice(toggledIndex + 1)
    ])
  }

  const toggleDone = id => updateTodo(id, 'completed')

  const editTodo = (id, newText) => updateTodo(id, 'title', newText)

  return <ScrollView keyboardShouldPersistTaps='handled'>
    <Navbar />
    <View style={styles.padding}>
      <Form addTodo={addTodo} />
      {loading ?
        <ActivityIndicator 
          size='large' 
          color='#0000ff' 
          style={{ marginTop: 30, }}
        /> :
        <TodoList
          list={todos}
          removeTodo={removeTodo}
          toggleDone={toggleDone}
          editTodo={editTodo}
        />
      }
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  padding: {
    padding: 10,
  }
})

export default App
