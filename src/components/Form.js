import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const Form = ({ 
    addTodo, setSearchText, 
    searching, searchText,
}) => {
    const [todo, setTodo] = useState('')
    const [disabled, setDisabled] = useState(true)

    const onAdd = () => {
        addTodo(todo)
        setTodo('')
        setDisabled(true)
    }

    const onInput = text => {
        setTodo(text)
        setDisabled(!Boolean(text.trim()))
    }

    const onSearch = text => setSearchText(text)

    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                mode='outlined' 
                label={!searching ? 'Todo' : 'Search'}
                underlineColor='#3949ab'
                onChangeText={!searching ? onInput : onSearch}
                value={!searching ? todo : searchText}
                autoCorrect={false}
                autoCapitalize='none'
                onSubmitEditing={onAdd}
            />
            {!searching &&
                <Button 
                    mode='contained' 
                    style={styles.button}
                    onPress={onAdd}
                    disabled={disabled}
                >Add Todo</Button>
            }
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
        flexGrow: 1,
    },
    button: {
        justifyContent: 'center',
        height: 60,
        marginTop: 5,
        width: '35%',
        marginLeft: 10,
    },
    searchButton: {
        marginLeft: 5,
    }
})

export default Form