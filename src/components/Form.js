import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const Form = ({ addTodo, }) => {
    const [todo, setTodo] = useState('')
    const [disabled, setDisabled] = useState(true)

    const onAdd = () => {
        addTodo(todo)
        setTodo('')
        setDisabled(true)
    }

    const onInput = text => {
        setTodo(text)
        setDisabled(!Boolean(text))
    }

    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                mode='outlined' 
                label='Todo'
                underlineColor='#3949ab'
                onChangeText={onInput}
                value={todo}
                autoCorrect={false}
                autoCapitalize='none'
                onSubmitEditing={onAdd}
            />
            <Button 
                mode='contained' 
                style={styles.button}
                onPress={onAdd}
                disabled={disabled}
            >Add Todo</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        marginRight: 10,
        width: '65%',
    },
    button: {
        justifyContent: 'center',
        height: 60,
        marginTop: 5,
        flexGrow: 1,
    }
})

export default Form