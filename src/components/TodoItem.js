import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Checkbox, IconButton, Colors } from 'react-native-paper'
import Dialog from 'react-native-dialog'

const TodoItem = ({
    id, title, completed,
    toggleDone, removeTodo, 
    index, editTodo,
}) => {
    const [checked, setChecked] = useState(completed)
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [newText, setNewText] = useState(title)

    const onToggle = () => {
        setChecked(!checked)
        toggleDone(id)
    }

    const onRemove = () => {
        Alert.alert('Are you sure to remove todo?', '', [
            {
                text: 'Yes, remove',
                onPress: () => removeTodo(id),
            },
            {
                text: 'Cancel',
                style: 'cancel',
            }
        ])
    }

    const onEdit = () => {
        setVisibleDialog(true)
    }

    const closeDialog = () => {
        setVisibleDialog(false)
        setNewText(title)
    }

    const saveChanges = () => {
        editTodo(id, newText)
        setVisibleDialog(false)
        
        if (!newText) {
            setNewText(title)
        }
    }

    const changeNewText = text => setNewText(text)

    const {
        todo, todoMargin, checkbox, 
        todoText, completedStyle,
    } = styles

    return (
        <View style={index === 0 ? todo : { ...todo, ...todoMargin }}>
            <View style={checkbox}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={onToggle}
                />
            </View>
            <Text
                style={!completed ? todoText : { ...todoText, ...completedStyle, }}
            >{title}</Text>
            <IconButton 
                icon='pen'
                color={Colors.blue500}
                onPress={onEdit}
                animated
            />
            <IconButton 
                icon='close'
                color={Colors.red500}
                onPress={onRemove}
                animated
            />
            <Dialog.Container visible={visibleDialog}>
                <Dialog.Title>Enter a new text for the todo</Dialog.Title>
                <Dialog.Input 
                    value={newText} 
                    onChangeText={changeNewText} 
                    onSubmitEditing={saveChanges}
                />
                <Dialog.Button label='Save' onPress={saveChanges} />
                <Dialog.Button label='Cancel' onPress={closeDialog} />
            </Dialog.Container>
        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
        fontSize: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#efefef',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todoMargin: {
        marginTop: 10,
    },
    todoText: {
        fontSize: 25,
        color: '#000',
        flexGrow: 1,
        width: '60%',
    },
    checkbox: {
        marginRight: 5,
    },
    completedStyle: {
        textDecorationLine: 'line-through',
    },
})

export default TodoItem