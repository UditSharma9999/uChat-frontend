import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import axios from 'axios'
import {
    View,
    Text,
    Alert,
    Button,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';

const SignUp = ({ navigation }) => {
    const [Name, setName] = useState('');
    const [LName, setLName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Variable, setVariable] = useState(true);
    let Response = '';

    const hendelRes = async (Response) => {
        if (Response == "Account already exist!") {
            Alert.alert(
                '',
                Response,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
        else {
            console.log('Response', Response);
            await AsyncStorage.setItem('Jwt',Response);
            navigation.navigate('ChatRoom');
        }

    }

    const Auth = async () => {
        var data = {
            "name": `${Name}`,
            "lname": `${LName}`,
            "email": `${Email}`,
            "password": `${Password}`
        }


        Response = await axios.post('http://192.168.1.5:8000/Router/signup', data);
        console.log('Response', Response);
        await hendelRes(Response.data.message);

    };



    const emailValidate = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(Email) === false) {
            console.log(false);
            Alert.alert(
                '',
                "Email is Not Correct",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        } else {
            console.log("Email is Correct");
            Auth();
        }
    }


    const getJwt = async () => {
        let x = await AsyncStorage.getItem('Jwt');
        let Response = await axios.post('http://192.168.1.5:8000/Router/isSignUp', {'token':x});
        console.log('Response.data.message',Response.data.message);
        

        if(Response.data.message.length != 0){      // if token is not in array
            navigation.navigate('ChatRoom');
        }
    }

    const startLoading = () => {
        setTimeout(() => {
            setVariable(false);
        }, 1500);
        getJwt();
    }
    if (Variable == true) {
        return (
            <View style={styles.container}>

                <ActivityIndicator
                    visible={true}
                    size="large"
                    color="#8a2be2"
                />
                {startLoading()}

            </View>
        )
    } else {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"} //commnet for web
                >
                <StatusBar backgroundColor="#8a2be2" />
                <Text style={styles.text}>Register to Chat app</Text>
                <TextInput
                    style={styles.input}
                    label="Fisrt Name"
                    onChangeText={(name) => { setName(name) }}
                />
                <TextInput
                    style={styles.input}
                    label="Last Name"
                    onChangeText={(lname) => { setLName(lname) }}
                />
                <TextInput
                    style={styles.input}
                    label="Email"
                    onChangeText={(email) => { setEmail(email) }}
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => { setPassword(password) }}
                />
                <View style={styles.button}>
                    <Button
                        title='SignUp'
                        color='#8a2be2'
                        onPress={() => {
                            emailValidate();
                        }}
                    />
                </View>
                <IconButton
                    icon='keyboard-backspace'
                    size={30}
                    style={styles.navButton}
                    color='#6646ee'
                    onPress={() => navigation.navigate('SignIn')}
                />
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    text: {
        fontSize: 25,
        fontWeight: '400',
        paddingBottom: '2%',
        marginLeft: '20%',
        marginTop: '20%'
    },
    input: {
        padding: 0,
        margin: '2%',
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: 'white',
    },
    button: {
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    navButton: {
        marginTop: 10,
        paddingTop: 10,
        marginLeft: '40%',
    }
});

export default SignUp;