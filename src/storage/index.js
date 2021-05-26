import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const saveTodos = async todos => {
    try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos))
    } catch (err) {
        Alert.alert('There is some issue to save todo into the device storage')
    }
}

export const getTodos = async () => {
    try {
        return await AsyncStorage.getItem('todos')
    } catch (err) {
        Alert.alert('There is some issue to get todos from the device storage')
    }
}