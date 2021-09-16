import { GiftedChat } from 'react-native-gifted-chat';
import React, { useState, useEffect } from 'react';
import { BackHandler ,View} from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';

const Chat = ({ route, navigation }) => {
    const { SenderData } = route.params;
    const { _MyData } = route.params;
    const { _value } = route.params;
    const { newUser  } = route.params

    const [NewUser,setNewUser] = useState([]);
    const [messages, setMessages] = useState([]);

    const uid = _MyData.email>SenderData.email?_MyData.email+"_"+SenderData.email:SenderData.email+"_"+_MyData.email

    const socket = io("http://192.168.1.5:8000/");
    
    useEffect(()=>{

        socket.emit("chats", {
            "MyEmail": _MyData.email,
            "OtherUserEmail":SenderData.email
        });

        socket.on("messages", ({arr }) => {
            setMessages(arr);
            console.log("get",arr)
        })
        // // return () =>{
        //     if(socket) socket.disconnect();
        // }
    })

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            // return navigation!=undefined?navigation.navigate('ChatRoom'):true 
            // console.log("navigated to ")
            navigation.navigate('ChatRoom',{"NewUser":NewUser});
        });
        
        // let x = axios.post('http://192.168.1.5:8000/Router/Chat',{
        //     "uid":uid
        // })
        // x.then(res=>{
        //     // console.log('res',res.data.RenderArr)
        //     setMessages(res.data.RenderArr)
        // })

        // setMessages(
        //    [ {
        //         "_id": "da707c04-5bd5-40c7-907c-e0a4fe8399bc",
        //         "createdAt":" 2021-09-16T04:47:56.643Z",
        //         "text": "Bebbdjf",
        //         "user": {
        //             "uid": "Kartik@gmail.com_Chetan@gmail.com",
        //             "_id": "Kartik@gmail.com",
        //             "OtherUserEmail": "Chetan@gmail.com",
        //         },
        //       },
        //     ]
        // )

    }, [])

    const onSend = async (messages) => {
        
        let d = await axios.post('http://192.168.1.5:8000/Router/search', { 'email': newUser });
        // console.log(d.data.message[0]);
        
        setNewUser(d.data.message[0]);

        let SendData = [...messages]
        SendData[0].user.uid = uid;
        SendData[0].user.OtherUserEmail = SenderData.email
        // SendData[0].user.OtherEmail = SenderData.email;
        
        let x = await axios.post('http://192.168.1.5:8000/Router/Chat',SendData);
        // console.log(x);
        
        console.log('messages', messages);
        console.log('SendData',SendData);

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    };

    return (
        <View style={{ flex: 1 }}>
            {/* {console.log('_MyData',_MyData)} */}
            {/* {console.log('_value',_value)} */}
            {/* {console.log('messages',messages)} */}
            {/* {console.log(newUser)} */}

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                   _id:_MyData.email,
                }}
            />
        </View>
    )
};

export default Chat;




// setMessages([
// {
//     _id: 1,
//     text: 'Hello developer',
//     createdAt: new Date(),
//     user: {
//         _id:"KartikSharma_UditSharma",
//         avatar: 'https://placeimg.com/140/140/any',
//     },
// }, {
//     _id: 2,
//     createdAt: "2021-08-31T11:41:55.766Z",
//     text: "Hii",
//     user: {
//         _id:"UditSharma_KartikSharma",
//         avatar: 'https://placeimg.com/140/140/any',
//     },
// }, {
//     _id: 3,
//     createdAt: "2021-08-31T11:41:55.766Z",
//     text: "Hey",
//     user: {
//         _id:"UditSharma_KartikSharma",
//         avatar: 'https://placeimg.com/140/140/any',
//     },
// },
// ])


// //============================================================//


// // import React, { useState, useEffect, useRef } from 'react';
// // import { AntDesign } from '@expo/vector-icons';
// // import {
// //     View,
// //     Text,
// //     FlatList,
// //     TextInput,
// //     Pressable,
// //     StyleSheet,
// //     BackHandler,
// //     ActivityIndicator,
// //     TouchableOpacity,
// // } from 'react-native';
// // import axios from 'axios';

// // const Chat = ({ route, navigation }) => {
// //     const [msg, setmsg] = useState(null);
// //     const { SenderData } = route.params;
// //     const { _MyData } = route.params;
// //     const { _value } = route.params;

// //     const [fetchdata, setFetchData] = useState([]);

// //     const [ChatMessage, setChatMessage] = useState([]);
// //     const [_ChatMessage, _setChatMessage] = useState([]);

// //     console.log('SenderData', SenderData);
// //     const Data = async () => {
// //         if (_value) {
// //             let x = await axios.post('http://192.168.1.5:8000/chatroom', { 'user': SenderData.email });
// //             console.log('x.data', x.data);
// //             setFetchData([
// //                 x.data
// //             ])
// //         }
// //     };

// //     useEffect(() => {
// //         BackHandler.addEventListener("hardwareBackPress", () => {
// //             navigation.navigate('ChatRoom');
// //         })
// //         Data();
// //     });

// //     const My = ({ message }) => (
// //         <View style={{
// //             left: "53%",
// //             width: 160,
// //             margin: "1%",
// //         }}>
// //             <Text
// //                 style={{
// //                     fontWeight: '200',
// //                     fontSize: 18,
// //                     padding: 8,
// //                     alignSelf: 'flex-end',
// //                     backgroundColor: '#8a2be2',
// //                     borderTopLeftRadius: 20,
// //                     borderTopRightRadius: 25,
// //                     borderBottomLeftRadius: 20,
// //                 }}
// //             >{message}</Text>
// //         </View>
// //     );

// //     const NotMy = ({ message }) => (
// //         <View style={{
// //             width: 160,
// //             margin: "1%",
// //         }}>
// //             <Text
// //                 style={{
// //                     fontWeight: '200',
// //                     fontSize: 18,
// //                     padding: 8,
// //                     borderTopLeftRadius: 20,
// //                     borderTopRightRadius: 25,
// //                     borderBottomRightRadius: 20,
// //                     backgroundColor: 'white',
// //                     alignSelf: 'flex-start',
// //                 }}
// //             >{message}</Text>
// //         </View>
// //     );

// //     const renderItem = ({ item }) => {
// //         return(
// //             <View>
// //             {console.log('fetchdata', fetchdata)}

// //             {item.isSendByMe == _MyData.email ?
// //                 <My message={item.message} /> :
// //                 <NotMy message={item.message} />}
// //             </View>
// //         )
// //     }

// //     return (
// //         <View style={styles.container}>
// //             <View>
// //                 {/* <FlatList
// //                     // data={_ChatMessage}

// //                     renderItem={renderItem}
// //                 /> */}

// //                 {console.log('fetchdata',fetchdata)}
// //             </View>
// //             <View style={styles.bottomView}>
// //                 <View style={styles.keyboard}>
// //                     <TextInput
// //                         value={msg}
// //                         selectionColor={'#8a2be2'}
// //                         style={styles.input}
// //                         placeholder='Type your message'
// //                         onChangeText={(text) => { setmsg(text) }}
// //                     />

// //                 </View>
// //                 <View style={{
// //                     width: "14%",
// //                     marginLeft: 7,
// //                     height: "95%",
// //                     left: 0,
// //                 }}>
// //                     <Pressable
// //                         style={styles.sent}
// //                         onPress={() => {}}>
// //                         <AntDesign
// //                             name="rightcircleo"
// //                             size={32}
// //                             color="white" />
// //                     </Pressable>
// //                 </View>
// //             </View>
// //         </View>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         paddingLeft: 10,
// //         paddingRight: 10,
// //         // flexDirection: 'column',
// //         // backgroundColor: '#8a2be2',
// //         // justifyContent: 'center',
// //     },
// //     bottomView: {
// //         bottom: 4,
// //         height: 50,
// //         width: '100%',
// //         flexDirection: 'row',
// //         position: 'absolute',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         // backgroundColor: '#EE5407',
// //     },
// //     keyboard: {
// //         width: "80%",
// //         height: "90%",
// //         // marginLeft: 8,
// //         borderRadius: 20,
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         backgroundColor: 'white',
// //         // paddingLeft:2,
// //         marginLeft: 20,
// //     },
// //     input: {
// //         width: "90%",
// //         borderRadius: 20,
// //         backgroundColor: 'white',
// //     },
// //     sent: {
// //         width: "100%",
// //         height: "100%",
// //         // marginRight: 2,
// //         borderRadius: 100,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         backgroundColor: '#8a2be2',
// //     }
// // });

// // export default Chat;






// // import React, { useState, useEffect, useRef } from 'react';
// // import { AntDesign } from '@expo/vector-icons';
// // import {
// //     View,
// //     Text,
// //     FlatList,
// //     TextInput,
// //     Pressable,
// //     StyleSheet,
// //     BackHandler,
// //     ActivityIndicator,
// //     TouchableOpacity,
// // } from 'react-native';
// // import axios from 'axios';

// // const Chat = ({ route, navigation }) => {
// //     const [msg, setmsg] = useState(null);
// //     const { SenderData } = route.params;
// //     const { _MyData } = route.params;
// //     const { _value } = route.params;
// //     const [RenderArr, setRenderArr] = useState([]);
// //     const [Variable, setVariable] = useState(true);

// //     const data = [_MyData, SenderData];


// //     const DATA = async () => {
// //         if (_value) {
// //             let x = await axios.post('http://192.168.1.5:8000/chatroom', { 'user': SenderData.email });
// //             console.log('x.data', x.data);
// //             ChatMessage.push(x.data);

// //             let y = [];
// //             y.push(ChatMessage[0].find1)
// //             for (let i = 0; i < ChatMessage[0].find1.length; i++) {
// //                 y.map(item => {
// //                     RenderArr.push(item[i].chats);
// //                 })
// //             }


// //             console.log(ChatMessage[0].find2)
// //             let z = [];
// //             z.push(ChatMessage[0].find2);
// //             console.log('_ChatMessage', _ChatMessage)
// //             for (let i = 0; i < ChatMessage[0].find2.length; i++) {
// //                 z.map(item => {
// //                     RenderArr.push(item[i].chats);
// //                 })
// //             }
// //             console.log('RenderAeeAy', RenderArr);

// //             const filteredArr = RenderArr.reduce((acc, current) => {
// //                 const x = acc.find(item => item.email === current.email && item.date === current.date);
// //                 if (!x) {
// //                     return acc.concat([current]);
// //                 } else {
// //                     return acc;
// //                 }
// //             }, []);
// //             console.log('filteredArr', filteredArr);
// //             console.log('filteredArr length', filteredArr.length);


// //             for (let i = 0; i < filteredArr.length; i++) {
// //                 _ChatMessage.push(filteredArr[i]);
// //             }
// //             console.log('_ChatMessage', _ChatMessage);
// //         }
// //     }

// //     useEffect(() => {
// //         BackHandler.addEventListener("hardwareBackPress", () => {
// //             navigation.navigate('ChatRoom');
// //         })
// //         // Data();
// //     }, []);

// //     const send = async (msg) => {
// //         const chats = {
// //             "isSendByMe": _MyData.email,
// //             "message": msg,
// //             "date": Date.now()
// //         }
// //         // console.log('ChatMessage',ChatMessage[0].find1[0])
// //         if (ChatMessage[0].find1[0] != undefined) {
// //             console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
// //             let x = await axios.post('http://192.168.1.5:8000/chat', {
// //                 "user1": ChatMessage[0].find1[0].user1,
// //                 "user2": _MyData.email,
// //                 "chats": chats
// //             });
// //             // Data();
// //             // UpdateedData();
// //             // _ChatMessage.push(chats)
// //         }
// //         else {
// //             if (SenderData.email != undefined) {
// //                 console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
// //                 let x = await axios.post('http://192.168.1.5:8000/chat', {
// //                     "user1": SenderData.email,
// //                     "user2": _MyData.email,
// //                     "chats": {
// //                         "isSendByMe": _MyData.email,
// //                         "message": msg,
// //                         "date": Date.now()
// //                     }
// //                 });
// //                 // Data();
// //                 // UpdateedData();
// //                 // _ChatMessage.push(chats)
// //             }
// //         }
// //     }



// //     const renderItem = ({ item }) => {

// //         const startLoading = () => {

// //             setTimeout(() => {
// //                 setVariable(false);
// //             }, 1500);
// //             let _x = DATA()
// //             _x.then((res) => {
// //                 for (let i = 0; i < res.length; i++) {
// //                     message.push(res[i]);
// //                 }
// //                 console.log('message', message)
// //             })
// //         }

// //         if (_ChatMessage.length == 0) {
// //             return (
// //                 <View style={{
// //                     flex: 1,
// //                     justifyContent: 'center',
// //                     alignContent: 'center',
// //                 }}>
// //                     <ActivityIndicator
// //                         visible={true}
// //                         size="large"
// //                         color="#8a2be2"
// //                     />
// //                     {startLoading()}
// //                     {console.log("==========", ChatMessage)}
// //                     {console.log('message ===', message)}
// //                 </View>
// //             )
// //         } else {
// //             if (_ChatMessage.length != 0) {
// //                 return (
// //                     <View style={{
// //                         flex: 1,
// //                         justifyContent: 'center',
// //                         alignContent: 'center',
// //                         backgroundColor: 'red'
// //                     }}>
// //                         {console.log("itms", _ChatMessage)}
// //                         <Text>{item.email}</Text>
// //                     </View>
// //                 )
// //             }
// //         }
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <View>
// //                 <FlatList
// //                     data={data}
// //                     renderItem={renderItem}
// //                 />
// //             </View>

// //             <View style={styles.bottomView}>
// //                 <View style={styles.keyboard}>
// //                     <TextInput
// //                         value={msg}
// //                         selectionColor={'#8a2be2'}
// //                         style={styles.input}
// //                         placeholder='Type your message'
// //                         onChangeText={(text) => { setmsg(text) }}
// //                     />

// //                 </View>
// //                 <View style={{
// //                     width: "14%",
// //                     marginLeft: 7,
// //                     height: "95%",
// //                     left: 0,
// //                 }}>
// //                     <Pressable
// //                         style={styles.sent}
// //                         onPress={() => {
// //                             send(msg);
// //                             setmsg(null);
// //                             // Data();
// //                         }}>
// //                         <AntDesign
// //                             name="rightcircleo"
// //                             size={32}
// //                             color="white" />
// //                     </Pressable>
// //                 </View>
// //             </View>
// //         </View>
// //     )
// // }


// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         paddingLeft: 10,
// //         paddingRight: 10,
// //         // flexDirection: 'column',
// //         // backgroundColor: '#8a2be2',
// //         // justifyContent: 'center',
// //     },
// //     bottomView: {
// //         bottom: 4,
// //         height: 50,
// //         width: '100%',
// //         flexDirection: 'row',
// //         position: 'absolute',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         // backgroundColor: '#EE5407',
// //     },
// //     keyboard: {
// //         width: "80%",
// //         height: "90%",
// //         // marginLeft: 8,
// //         borderRadius: 20,
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         backgroundColor: 'white',
// //         // paddingLeft:2,
// //         marginLeft: 20,
// //     },
// //     input: {
// //         width: "90%",
// //         borderRadius: 20,
// //         backgroundColor: 'white',
// //     },
// //     sent: {
// //         width: "100%",
// //         height: "100%",
// //         // marginRight: 2,
// //         borderRadius: 100,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         backgroundColor: '#8a2be2',
// //     }
// // });

// // export default Chat;



// //========================================================//





// import React, { useState, useEffect, useRef } from 'react';
// import { AntDesign } from '@expo/vector-icons';
// import {
//     View,
//     Text,
//     FlatList,
//     TextInput,
//     Pressable,
//     StyleSheet,
//     BackHandler,
//     ActivityIndicator,
//     TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';

// const Chat = ({ route, navigation }) => {
//     const [msg, setmsg] = useState(null);
//     const { SenderData } = route.params;
//     const { _MyData } = route.params;
//     const { _value } = route.params;
//     // const [ChatMessage, setChatMessage] = useState([]);
//     // const [_ChatMessage, _setChatMessage] = useState([]);
//     const [RenderArr, setRenderArr] = useState([]);
//     const [Variable, setVariable] = useState(true);
//     const flatlistRef = useRef();

//     // console.log('SenderData', SenderData);
//     const Data = async () => {
//         // console.log('_value', _value);
//         // console.log(SenderData);
//         var ChatMessage = []
//         var _ChatMessage = []

//         if (_value) {
//             let x = await axios.post('http://192.168.1.5:8000/chatroom', { 'user': SenderData.email });
//             console.log('x.data', x.data);

//             ChatMessage.push(x.data);
//             // console.log("//=========working============//");

//             console.log(ChatMessage[0])
//             let y = [];
//             y.push(ChatMessage[0].find1)
//             for (let i = 0; i < ChatMessage[0].find1.length; i++) {
//                 y.map(item => {
//                     RenderArr.push(item[i].chats);
//                 })
//             }


//             // console.log(ChatMessage[0].find2)
//             let z = [];
//             z.push(ChatMessage[0].find2);
//             // console.log('_ChatMessage', _ChatMessage)
//             for (let i = 0; i < ChatMessage[0].find2.length; i++) {
//                 z.map(item => {
//                     RenderArr.push(item[i].chats);
//                 })
//             }
//             // console.log('RenderAeeAy', RenderArr);

//             const filteredArr = RenderArr.reduce((acc, current) => {
//                 const x = acc.find(item => item.email === current.email && item.date === current.date);
//                 if (!x) {
//                     return acc.concat([current]);
//                 } else {
//                     return acc;
//                 }
//             }, []);
//             // console.log('filteredArr', filteredArr);
//             // console.log('filteredArr length', filteredArr.length);

//             for (let i = 0; i < filteredArr.length; i++) {
//                 _ChatMessage.push(filteredArr[i]);
//             }
//             // console.log('_ChatMessage', _ChatMessage);
//             // return x.data;
//             return _ChatMessage;
//         } else if (_value == false) {
//             let x = await axios.post('http://192.168.1.5:8000/chatroom', { 'user': SenderData });
//             // console.log('x.data', x.data);
//             ChatMessage.push(x.data);
//             console.log("//=====================//");


//             let y = [];
//             y.push(ChatMessage[0].find1)
//             for (let i = 0; i < ChatMessage[0].find1.length; i++) {
//                 y.map(item => {
//                     RenderArr.push(item[i].chats);
//                 })
//             }


//             // console.log(ChatMessage[0].find2)
//             let z = [];
//             z.push(ChatMessage[0].find2);
//             // console.log('_ChatMessage', _ChatMessage)
//             for (let i = 0; i < ChatMessage[0].find2.length; i++) {
//                 z.map(item => {
//                     RenderArr.push(item[i].chats);
//                 })
//             }
//             // console.log('RenderAeeAy', RenderArr);

//             const filteredArr = RenderArr.reduce((acc, current) => {
//                 const x = acc.find(item => item.email === current.email && item.date === current.date);
//                 if (!x) {
//                     return acc.concat([current]);
//                 } else {
//                     return acc;
//                 }
//             }, []);
//             // console.log('filteredArr', filteredArr);
//             // console.log('filteredArr length', filteredArr.length);


//             for (let i = 0; i < filteredArr.length; i++) {
//                 _ChatMessage.push(filteredArr[i]);
//             }
//             // console.log('_ChatMessage', _ChatMessage);
//             return _ChatMessage;

//         }
//     };

//     const updatedata = () => {

//         // const filteredArr = _ChatMessage.reduce((acc, current) => {
//         //     const x = acc.find(item => item.email === current.email && item.date === current.date && item.message === current.message);
//         //     if (!x) {
//         //         return acc.concat([current]);
//         //     } else {
//         //         return acc;
//         //     }
//         // }, []);
//         // console.log('filteredArr ===>', filteredArr);
//         // return filteredArr;
//     }

//     useEffect(() => {
//         BackHandler.addEventListener("hardwareBackPress", () => {
//             navigation.navigate('ChatRoom');
//         })
//         Data();
//     });

//     // console.log('ChatMessage', ChatMessage);

//     const send = async (msg) => {
//         // console.log('ChatMessage',ChatMessage[0].find1[0])
//         // if (ChatMessage[0].find1[0] != undefined) {
//         //     console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
//         //     let x = await axios.post('http://192.168.1.5:8000/chat', {
//         //         "user1": ChatMessage[0].find1[0].user1,
//         //         "user2": _MyData.email,
//         //         "chats": {
//         //             "isSendByMe": _MyData.email,
//         //             "message": msg,
//         //             "date": Date.now()
//         //         }
//         //     });
//         //     updatedata()
//         // }
//         // else {
//         //     if (SenderData.email != undefined) {
//         //         console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
//         //         let x = await axios.post('http://192.168.1.5:8000/chat', {
//         //             "user1": SenderData.email,
//         //             "user2": _MyData.email,
//         //             "chats": {
//         //                 "isSendByMe": _MyData.email,
//         //                 "message": msg,
//         //                 "date": Date.now()
//         //             }
//         //         });
//         //         updatedata()
//         //     }
//         // }
//     }



//     const My = ({ message }) => (
//         <View style={{
//             left: "53%",
//             width: 160,
//             margin: "1%",
//             // alignSelf:'flex-end',
//             // position: 'relative',
//             // borderBottomRightRadius:20,
//         }}>
//             <Text
//                 style={{
//                     fontWeight: '200',
//                     fontSize: 18,
//                     padding: 8,
//                     alignSelf: 'flex-end',
//                     backgroundColor: '#8a2be2',
//                     borderTopLeftRadius: 20,
//                     borderTopRightRadius: 25,
//                     borderBottomLeftRadius: 20,
//                 }}
//             >{message}</Text>
//         </View>
//     );

//     const NotMy = ({ message }) => (
//         <View style={{
//             width: 160,
//             margin: "1%",
//         }}>
//             <Text
//                 style={{
//                     fontWeight: '200',
//                     fontSize: 18,
//                     padding: 8,
//                     borderTopLeftRadius: 20,
//                     borderTopRightRadius: 25,
//                     borderBottomRightRadius: 20,
//                     backgroundColor: 'white',
//                     alignSelf: 'flex-start',
//                 }}
//             >{message}</Text>
//         </View>
//     );


//     const renderItem = ({ item }) => (
//         <View>

//             {console.log('item', item)}

//             {item.isSendByMe == _MyData.email ?
//                 <My message={item.message} /> :
//                 <NotMy message={item.message} />}
//         </View>
//     );


//     const startLoading = () => {
//         setTimeout(() => {
//             setVariable(false);
//         }, 1500);
//     }

//     return (
//         <View style={styles.container}>
//             <View>
//                 <FlatList
//                     data={updatedata()}
//                     renderItem={renderItem}
//                     // extraData={_ChatMessage}
//                 />
//             </View>
//             <View style={styles.bottomView}>
//                 <View style={styles.keyboard}>
//                     <TextInput
//                         value={msg}
//                         selectionColor={'#8a2be2'}
//                         style={styles.input}
//                         placeholder='Type your message'
//                         onChangeText={(text) => { setmsg(text) }}
//                     />

//                 </View>
//                 <View style={{
//                     width: "14%",
//                     marginLeft: 7,
//                     height: "95%",
//                     left: 0,
//                 }}>
//                     <Pressable
//                         style={styles.sent}
//                         onPress={() => {
//                             send(msg);
//                             setmsg(null);
//                             // Data();
//                         }}>
//                         <AntDesign
//                             name="rightcircleo"
//                             size={32}
//                             color="white" />
//                     </Pressable>
//                 </View>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingLeft: 10,
//         paddingRight: 10,
//         // flexDirection: 'column',
//         // backgroundColor: '#8a2be2',
//         // justifyContent: 'center',
//     },
//     bottomView: {
//         bottom: 4,
//         height: 50,
//         width: '100%',
//         flexDirection: 'row',
//         position: 'absolute',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: '#EE5407',
//     },
//     keyboard: {
//         width: "80%",
//         height: "90%",
//         // marginLeft: 8,
//         borderRadius: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         // paddingLeft:2,
//         marginLeft: 20,
//     },
//     input: {
//         width: "90%",
//         borderRadius: 20,
//         backgroundColor: 'white',
//     },
//     sent: {
//         width: "100%",
//         height: "100%",
//         // marginRight: 2,
//         borderRadius: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8a2be2',
//     }
// });

// export default Chat;
