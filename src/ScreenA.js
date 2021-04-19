import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native';

export default function ScreenA({ navigation, route }) {

    const Users = [
        {
            id: 1,
            name: 'User A'
        },
        {
            id: 2,
            name: 'User B'
        },
        {
            id: 3,
            name: 'User C'
        }
    ];

    const [name, setName] = useState('');

    const onPressHandler = () => {
        // navigation.navigate('Screen_B');
        // navigation.toggleDrawer();
        for (let user of Users) {
            setName(user.name);
        }
    }

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Screen A
        </Text>
            <Pressable
                onPress={onPressHandler}
                style={({ pressed }) => ({ 
                    backgroundColor: pressed ? '#ddd' : '#0f0' })}
            >
                <Text style={styles.text}>
                    Get the last user
          </Text>
            </Pressable>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        margin: 10,
        fontFamily: 'IndieFlower-Regular'
    }
})