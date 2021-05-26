import React from 'react'
import { Text, StyleSheet } from 'react-native'

const EmptyBlock = () => {
    return (
        <Text style={styles.block}>There is no any todos</Text>
    )
}

const styles = StyleSheet.create({
    block: {
        padding: 10,
        fontSize: 20,
        textAlign: 'center',
    },
})

export default EmptyBlock