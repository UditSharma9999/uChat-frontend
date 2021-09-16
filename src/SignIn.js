import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    Alert,
    Button,
    StatusBar,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const SignIn = ({ navigation }) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    // const [ValidationRes,setValidationRes] = useState(false);
    const [Response, setResponse] = useState('');
    const [SecureText, setSecureText] = useState(true);
    const [Variable, setVariable] = useState(true);

    const isSignIn = async () => {
        let data = {
            "email": `${Email}`,
            "password": `${Password}`
        }

        let fetch_data = await axios.post('http://192.168.1.5:8000/Router/signin', data)
        // .then(response => {
        //     // console.log('response.data',response.data);
        //     setResponse(response.data.message);
        //     setValidationRes(response.data.validation);
        // })
        // setResponse(fetch_data.data.message);



        // if password and email is wrong then this will not work
        if (fetch_data.data != "") {
            console.log(fetch_data.data);
            if (fetch_data.data.message == "error") {
                Alert.alert(
                    'Alert',
                    'You Email or Password is wrong!!',
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )

            }else{
                await AsyncStorage.setItem('Jwt', fetch_data.data.message[0].token);
                console.log(fetch_data.data.message[0].token);
            }
        }

        // console.log(fetch_data.data.message[0].token);
        setResponse(fetch_data.data.message);
        return (fetch_data.data.validation);
    }

    const HaveAccount = async () => {

        const ValidationRes = await isSignIn();

        if (ValidationRes) {
            navigation.navigate('ChatRoom');
        } else {
            Alert.alert(
                'Alert',
                'You Email or Password is wrong!!',
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

    }


    const getJwt = async () => {
        let x = await AsyncStorage.getItem('Jwt');
        let Response = await axios.post('http://192.168.1.5:8000/Router/isSignUp', { 'token': x });
        console.log(Response.data.message);
        if (Response.data.message.length != 0) {      // if token is not in array
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
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <StatusBar backgroundColor="#8a2be2" />
                <Text style={styles.text}>Welocme to Chat app</Text>
                <TextInput
                    style={styles.input}
                    label="Email"
                    right={<TextInput.Icon name="gmail" />}
                    onChangeText={(email) => { setEmail(email) }}
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    secureTextEntry={SecureText}
                    right={<
                        TextInput.Icon
                        name="eye"
                        onPress={() => { setSecureText(!SecureText) }} />}

                    onChangeText={(password) => { setPassword(password) }}
                />
                <View style={styles.button}>
                    <Button
                        title='Login'
                        color='#8a2be2'
                        onPress={() => {
                            HaveAccount();
                        }} />
                </View>

                <View style={{
                    width: width,
                    // height: 300,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '2%'
                }}>
                    <View style={{ width: 100, height: 50, margin: '4%' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                            <Text style={styles.newuser}>New user?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 200, height: 50, alignItems: 'flex-end', margin: '4%' }}>

                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.Forrgotpassword}>Forrgot password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.newuserContainer}>
                    <Button
                        mode="text"
                        onPress={() => { }}>
                        New user?
                    </Button>
                </View> */}
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: '400',
        padding: '2%',
        marginLeft: '25%'
    },
    input: {
        padding: 0,
        margin: '2%',
        marginLeft: '10%',
        marginRight: '10%',
        position: 'relative',
        backgroundColor: 'white'
    },
    button: {
        marginTop: '2%',
        marginLeft: '10%',
        marginRight: '10%'
    },
    newuser: {
        fontSize: 20,
        color: '#8a2be2',
        fontWeight: '400',
    },
    Forrgotpassword: {
        fontSize: 20,
        color: '#8a2be2',
        fontWeight: '400',
    },
});

export default SignIn;