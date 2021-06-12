import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
    FlatList,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge, increaseAge, getCities } from '../redux/actions';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

export default function Home({ navigation, route }) {

    const { name, age, cities } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');

    useEffect(() => {
        getData();
        dispatch(getCities());
    }, []);

    const getData = () => {
        try {
            // AsyncStorage.getItem('UserData')
            //     .then(value => {
            //         if (value != null) {
            //             let user = JSON.parse(value);
            //             setName(user.Name);
            //             setAge(user.Age);
            //         }
            //     })
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item(0).Name;
                            var userAge = results.rows.item(0).Age;
                            dispatch(setName(userName));
                            dispatch(setAge(userAge));
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                // var user = {
                //     Name: name
                // }
                // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        () => { Alert.alert('Success!', 'Your data has been updated.') },
                        error => { console.log(error) }
                    )
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            // await AsyncStorage.clear();
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM Users",
                    [],
                    () => { navigation.navigate('Login') },
                    error => { console.log(error) }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body}>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Welcome {name} !
            </Text>
            <FlatList
                data={cities}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.country}</Text>
                        <Text style={styles.subtitle}>{item.city}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            {/* <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Your age is {age}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={name}
                onChangeText={(value) => dispatch(setName(value))}
            />
            <CustomButton
                title='Update'
                color='#ff7f00'
                onPressFunction={updateData}
            />
            <CustomButton
                title='Remove'
                color='#f40100'
                onPressFunction={removeData}
            />
            <CustomButton
                title='Increase Age'
                color='#0080ff'
                onPressFunction={()=>{dispatch(increaseAge())}}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        margin: 10,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 130,
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#cccccc',
        borderRadius: 5,
        margin: 7,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        margin: 10,
    },
    subtitle: {
        fontSize: 20,
        margin: 10,
        color: '#999999',
    }
})