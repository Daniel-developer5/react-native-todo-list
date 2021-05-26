import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>To-Do App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        paddingBottom: 25,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#3949ab',
    },
    text: {
        color: 'white',
        fontSize: 25,
    },
})

export default Navbar