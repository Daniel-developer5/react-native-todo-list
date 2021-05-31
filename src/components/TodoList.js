import React from 'react'
import { View, StyleSheet, } from 'react-native'
import EmptyBlock from './EmptyBlock'
import TodoItem from './TodoItem'

const TodoList = ({ 
    list, removeTodo, 
    toggleDone, editTodo
}) => {
    return (
        <View style={styles.block}>
            {list.map(({ id, ...todo }, index) => (
                <TodoItem 
                    key={id} {...todo} index={index} id={id}
                    removeTodo={removeTodo} toggleDone={toggleDone}
                    editTodo={editTodo}
                />
            ))}
            { !list.length && <EmptyBlock /> }
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        paddingTop: 20,
        paddingBottom: 60,
    },
})

export default TodoList