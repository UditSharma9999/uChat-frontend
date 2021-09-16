// import React,{useState} from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Button,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const LocalStorage = () => {
//     // const [Data,setData];
//     const storeData = async ()=>{
//         // await AsyncStorage.setItem('@storage_Key', value)
//         let x = await AsyncStorage.getItem('name');
//         console.log(x);
//         return x;
//     }

//     return(
//         <View style={styles.container}>
//             <Text style={{
//                 padding:10,
//                 marginLeft:10,
//                 fontSize:18,
//                 fontWeight:'bold'
//             }}>Hi</Text>
//             <Button 
//                 title="Press me"
//                 onPress={()=>{
//                     storeData();
//                 }}/>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         alignSelf:'center',
//         justifyContent:'center',
//     }
// });

// export default LocalStorage;

//=================================================================================//





import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
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
} from 'react-native';


const ChatRoom = ({ navigation }) => {

    const [MyData, setMyData] = useState({
        __v: 0,
        _id: "",
        email: "",
        lname: "",
        name: "",
        password: "",
        token: "",
    });
    const [FetchUserData, setFetchUserData] = useState(async () => {
        let x = await AsyncStorage.getItem('Jwt');
        let Response = await axios.post('http://192.168.42.246:8000/isSignUp', { 'token': x });

        console.log('Response.data.message[0]', Response.data.message[0])
        return Response.data.message[0];
    });
    const [UserData, setUserData] = useState(async () => {
        let value = await FetchUserData;
        console.log('value', value);

        setMyData(() => ({
            ...value
        }));

        let x = await axios.post('http://192.168.42.246:8000/users', { 'email': value.email });
        console.log('x.data', x.data.message);
        setUserData(x.data.message);
    });

    // const [ChatRoomData,setChatRoomData] = useState(async ()=>{
    // let Response = await axios.post('http://192.168.1.4:8000/isSignUp');
    // });



    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => { return true })
    })

    console.log('MyData', MyData);

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
                {/* <Text style={{
                    height: 16
                }}>msg  sknlshdasjkchdjjjcjceeddeqwwww.google.com</Text> */}
            </View>
            {/* <Text>{date}</Text> */}
        </View>
    );

    // console.log('UserData //=>', UserData);

    const id = () => MyData.email!=item.user1?item.user1:item.user2

    const otherUserData = async () =>{
        let email = id()
        let x = await axios.post('http://192.168.42.246:8000/users', { 'email': email });
        console.log('x.data of otherUserData', x.data.message);
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                console.log('item /====>', item);
                navigation.navigate('Chat');
            }}>
            {
                MyData.email!=item.user1?"":""
            }
            <Item
                name={item.name}
                // date={item.date} 
                lname={item.lname}
            />
        </TouchableOpacity>
    );

    if (MyData != undefined && MyData.length != 0 ) {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#8a2be2" />
                {console.log('UserData', UserData)}
                <View style={{
                    width: "100%",
                    height: "20%"
                }}>
                    <Text style={styles.text}>Chat with your friends</Text>
                </View>
                <View style={styles.screen}>
                    <FlatList
                        data={UserData}
                        renderItem={renderItem}
                        style={styles.list}
                    />
                    <TouchableOpacity style={styles.search}>
                        <Image
                            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                            style={styles.FloatingButtonStyle} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#8a2be2" />
                {console.log('UserData', UserData)}
                <View style={{
                    width: "100%",
                    height: "20%"
                }}>
                    <Text style={styles.text}>Chat with your friends</Text>
                </View>
                <View style={styles.screen}>
                    <TouchableOpacity style={styles.search}>
                        <Image
                            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                            style={styles.FloatingButtonStyle} />
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
        width: "40%",
        fontSize: 25,
        color: 'white',
        fontWeight: '400',
        paddingTop: "8%",
        paddingLeft: "5%"
    },
    screen: {
        width: "100%",
        height: "80%",
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30
    },
    item: {
        padding: 10,
        marginVertical: 1,
        flexDirection: 'row',
        // backgroundColor: '#f9c2ff',

    },
    dp: {
        width: "15%",
        height: "100%",
        borderRadius: 60,
    },
    // msg: {},
    search: {
        right: 10,
        width: 50,
        height: 50,
        bottom: 10,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
});

export default ChatRoom;