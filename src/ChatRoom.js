import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import {
    View,
    Text,
    Image,
    FlatList,
    StatusBar,
    StyleSheet,
    BackHandler,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

const ChatRoom = ({ route, navigation }) => {
    const { NewUser } = (route.params) != undefined ? `${route.param}` : "";
    
    const [MyData, setMyData] = useState({
        __v: 0,
        _id: "",
        email: "",
        lname: "",
        name: "",
        password: "",
        token: "",
    });
    const socket = io("http://192.168.1.6:8000/");
    const [OtherUserDetails, setOtherUserDetails] = useState([])
    const [Variable, setVariable] = useState(true);

    const [FetchUserData, setFetchUserData] = useState(async () => {
        let x = await AsyncStorage.getItem('Jwt');
        let Response = await axios.post('http://192.168.1.6:8000/Router/isSignUp', { 'token': x });

        return Response.data.message[0];
    });
    const UserData = async () => {
        let value = await FetchUserData;

        setMyData(() => ({
            ...value
        }));
    };


    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => { return true });
        UserData();
    }, []);


    useEffect(() => {

        socket.emit("chat room", {
            "MyEmail": MyData.email,
        });

        socket.on("users", ({ arr }) => {
            setOtherUserDetails(arr);
        })

        return () =>{
            if(socket) socket.disconnect();
        }
    })


    const startLoading = () => {
        setTimeout(() => {
            setVariable(false);
        }, 3000);
    }

    const Item = ({ name, lname }) => (
        <View style={styles.item}>
            <Image
                style={styles.dp}
                source={require('../assets/logo.png')} />
            <View style={{
                flexDirection: 'column',
                marginLeft: "5%",
                height: '100%',
                width: "60%",
                paddingBottom: 10,
            }}>
                <Text style={{ fontSize: 20 }}>{`${name}` + " " + `${lname == undefined ? "" : lname}`}</Text>

            </View>

        </View>
    );


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log('item', item);
                    navigation.navigate('Chat', {
                        SenderData: item,
                        _MyData: MyData,
                        _value: true
                    });
                }}>
                <Item
                    name={item.name}
                    lname={item.lname}
                />
            </TouchableOpacity>
        )
    }


    if (OtherUserDetails.length != 0) {
        return (
            <View style={styles.container}>
                {/* {console.log(NewUser + "////")} */}
                <StatusBar backgroundColor="#8a2be2" />
                <View style={{
                    width: "100%",
                    height: "20%",
                    alignItems:"flex-start",
                    paddingLeft:"2%",
                    paddingTop:"8%",
                }}> 
                    <Text style={styles.text}>Chat with</Text>
                    <Text style={styles.text}>your friends</Text>
                </View>
                <View style={styles.screen}>
                    {/* {console.log("OtheruserEmail", OtherUserEmailId)} */}
                    <FlatList
                        data={ OtherUserDetails } // to get new user at top
                        renderItem={renderItem}
                        style={styles.list}
                    />
                    <TouchableOpacity
                        style={styles.search}
                        onPress={() => {
                            navigation.navigate('SearchScreen', {
                                _MyData: MyData
                            });
                        }}>
                        <AntDesign
                            name="plus"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#8a2be2" />
                <View style={{
                    width: "100%",
                    height: "20%",
                    alignItems:"flex-start",
                    paddingLeft:"2%",
                    paddingTop:"8%",
                }}> 
                    <Text style={styles.text}>Chat with</Text>
                    <Text style={styles.text}>your friends</Text>
                </View>
                <View style={styles.screen}>
                    {Variable ? <ActivityIndicator
                        visible={true}
                        size="large"
                        color="#8a2be2"
                    /> : <View></View>
                    }
                    {startLoading()}
                    <TouchableOpacity
                        style={styles.search}
                        onPress={() => {
                            navigation.navigate('SearchScreen', {
                                _MyData: MyData
                            });
                        }}>
                        <AntDesign
                            name="plus"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8a2be2',
    },
    text: {
        fontSize: 25,
        color: 'white',
        fontWeight: '400',
    },
    screen: {
        width: "100%",
        height: "80%",
        paddingTop: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        borderTopRightRadius: 30,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        marginVertical: 1,
        flexDirection: 'row',
    },
    dp: {
        width: "15%",
        height: "100%",
        borderRadius: 60,
    },
    search: {
        right: 10,
        width: 50,
        height: 50,
        bottom: 10,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#8a2be2',
        borderRadius: 50,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    dd:{
        alignContent:'center',
        justifyContent:'space-around',
    }
});

export default ChatRoom;
