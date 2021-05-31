import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'

import Filters from './src/components/Filters'
import Form from './src/components/Form'
import Navbar from './src/components/Navbar'
import TodoList from './src/components/TodoList'
import { getTodos, saveTodos } from './src/storage'

const App = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [searching, setSearching] = useState(false)
  const [searchText, setSearchText] = useState('')

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

  const searchTodo = todos => (
    todos.filter(({ title, }) => title.includes(searchText))
  )

  const filterTodos = () => searchTodo(
    (index === 0 || index === 3) ? 
      todos :
      todos.filter(({ completed, }) => index === 1 ? !completed : completed)
  )

  const onIndexChange = index => {
    setSearching(index === 3)
    setIndex(index)
    setSearchText('')
  }

  return <>
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Navbar />
      <View style={styles.padding}>
        <Form 
          addTodo={addTodo} 
          setSearchText={setSearchText} 
          searching={searching} searchText={searchText}
        />
        {loading ?
          <ActivityIndicator 
            size='large' 
            color='#0000ff' 
            style={{ marginTop: 30, }}
          /> :
          <TodoList
            list={filterTodos()}
            removeTodo={removeTodo}
            toggleDone={toggleDone}
            editTodo={editTodo}
          />
        }
      </View>
    </ScrollView>
    { loading || <Filters index={index} setIndex={onIndexChange} /> }
  </>
}

const styles = StyleSheet.create({
  padding: {
    padding: 10,
  }
})

export default App
