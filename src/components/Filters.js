import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { BottomNavigation, Text } from 'react-native-paper'

const AllRoute = () => <Text>All</Text>
const ActiveRoute = () => <Text>Active</Text>
const CompletedRoute = () => <Text>Completed</Text>
const SearchRoute = () => <Text>Search</Text>

const Filters = ({ index, setIndex, }) => {
    const [routes] = useState([
        { 
            key: 'all', title: 'All', 
            icon: 'note-multiple', color: '#3949ab', 
        },
        { 
            key: 'active', title: 'Active', 
            icon: 'note-text', color: '#ed2a11', 
        },
        { 
            key: 'completed', title: 'Completed', 
            icon: 'checkbox-marked-circle', color: '#0ea603', 
        },
        { 
            key: 'search', title: 'Search', 
            icon: 'magnify', color: '#e07b16', 
        }
    ])

    const renderScene = BottomNavigation.SceneMap({
        all: AllRoute,
        active: ActiveRoute,
        completed: CompletedRoute,
        search: SearchRoute,
    })

    return (
        <View style={styles.filters}>
            <BottomNavigation 
                navigationState={{ index, routes, }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                shifting
            />
        </View>
    )
}

const styles = StyleSheet.create({
    filters: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    }
})

export default Filters