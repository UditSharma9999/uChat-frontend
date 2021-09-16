import React, { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import {
    View,
    Text,
    FlatList,
    TextInput,
    Pressable,
    StyleSheet,
    BackHandler,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Chat = ({ route, navigation }) => {
    const [msg, setmsg] = useState(null);
    const { SenderData } = route.params;
    const { _MyData } = route.params;
    const { _value } = route.params;
    const [ChatMessage, setChatMessage] = useState([]);
    const [_ChatMessage, _setChatMessage] = useState([]);
    const [RenderArr, setRenderArr] = useState([]);
    const [Variable, setVariable] = useState(true);
    const flatlistRef = useRef();

    console.log('SenderData',SenderData);
    const Data = async () => {
        console.log('_value',_value);
        console.log(SenderData);

        if(_value){
            let x = await axios.post('http://192.168.1.5:8000/Router/chatroom', { 'user': SenderData.email });
            console.log('x.data', x.data);

            if (ChatMessage.length == 0) {
                ChatMessage.push(x.data);
                console.log("//=========working============//");
                
                // console.log(ChatMessage[0].find1)
                let y = [];
                y.push(ChatMessage[0].find1)
                for (let i = 0; i < ChatMessage[0].find1.length; i++) {
                    y.map(item => {
                        RenderArr.push(item[i].chats);
                    })
                }


                console.log(ChatMessage[0].find2)
                let z = [];
                z.push(ChatMessage[0].find2);
                console.log('_ChatMessage',_ChatMessage)
                for (let i = 0; i < ChatMessage[0].find2.length; i++) {
                    z.map(item => {
                        RenderArr.push(item[i].chats);
                    })
                }
                console.log('RenderAeeAy',RenderArr);



                const filteredArr = RenderArr.reduce((acc, current) => {
                    const x = acc.find(item => item.email === current.email && item.date === current.date);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                console.log('filteredArr',filteredArr);
                console.log('filteredArr length',filteredArr.length);

                for (let i = 0; i < filteredArr.length; i++) {                    
                    _ChatMessage.push(filteredArr[i]);
                }
            }
            console.log('_ChatMessage',_ChatMessage);
            // return x.data;
            return _ChatMessage.length;
        }else{
            if(_value == false){
                let x = await axios.post('http://192.168.1.5:8000/Router/chatroom', { 'user': SenderData});
                console.log('x.data', x.data);
                ChatMessage.push(x.data);
                if (ChatMessage.length == 0) {
                    ChatMessage.push(x.data);
                    console.log("//=====================//");


                    let y = [];
                    y.push(ChatMessage[0].find1)
                    for (let i = 0; i < ChatMessage[0].find1.length; i++) {
                        y.map(item => {
                            RenderArr.push(item[i].chats);
                        })
                    }
    
    
                    console.log(ChatMessage[0].find2)
                    let z = [];
                    z.push(ChatMessage[0].find2);
                    console.log('_ChatMessage',_ChatMessage)
                    for (let i = 0; i < ChatMessage[0].find2.length; i++) {
                        z.map(item => {
                            RenderArr.push(item[i].chats);
                        })
                    }
                    console.log('RenderAeeAy',RenderArr);

                    const filteredArr = RenderArr.reduce((acc, current) => {
                        const x = acc.find(item => item.email === current.email && item.date === current.date);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);
                    console.log('filteredArr',filteredArr);
                    console.log('filteredArr length',filteredArr.length);


                    for (let i = 0; i < filteredArr.length; i++) {                    
                        _ChatMessage.push(filteredArr[i]);
                    }
                }
                console.log('_ChatMessage',_ChatMessage);
                // return x.data;
                return _ChatMessage.length;
            }

        }
    };

    // const UpdateedData = async () =>{
        
    //     if(_value){
    //         let x = await axios.post('http://192.168.1.5:8000/chatroom', { 'user': SenderData.email });
    //         for(var i = 0;i<=(_ChatMessage.length);i++){
    //             if(x.data.find1[i].data != undefined || x.data.find2[i].data == undefined){
    //                 if((_ChatMessage[i].date == x.data.find1[i].date && _ChatMessage[i].isSendByMe == x.data.find1[i].isSendByMe)||_ChatMessage[i].date == x.data.find2[i].date && _ChatMessage[i].isSendByMe == x.data.find2[i].isSendByMe){
    //                     console.log("Updating Messages")
    //                 }else{
    //                     console.log("Updating Messages!!! 1");
    //                     // _ChatMessage
    //                     console.log(x.data.find1[i]);
    //                     console.log(x.data.find2[i])
    //                 }
    //             }
    //         }            
    //     }else{
    //         if(_value == false){
    //             let x = await axios.post('http://192.168.1.5:8000/chatroom', { 'user': SenderData});
    //             for(var i = 0;i<=(_ChatMessage.length);i++){
    //                 if(x.data.find1[i].data != undefined || x.data.find2[i].data == undefined){
    //                     if((_ChatMessage[i].data == x.data.find1[i].data && _ChatMessage[i].isSendByMe == x.data.find1[i].isSendByMe)||_ChatMessage[i].data == x.data.find2[i].data && _ChatMessage[i].isSendByMe == x.data.find2[i].isSendByMe){
    //                         console.log("Updating Messages")
    //                     }else{
    //                         console.log("Updating Messages!!! 2")
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => { 
            navigation.navigate('ChatRoom');
        })
        Data();
    });

    // const sendNew = async (msg) =>{
    //     let x = await axios.post('http://192.168.1.5:8000/chat', {
    //         "user1": SenderData.email,
    //         "user2": _MyData.email,
    //         "chats": {                
    //             "isSendByMe": _MyData.email,
    //             "message": msg,
    //             "date":Date.now()
    //         },
    //     });
    //     console.log(x);
    // }   
    
    console.log('ChatMessage',ChatMessage);

    const send = async (msg) => {
        // console.log('ChatMessage',ChatMessage[0].find1[0])
        if(ChatMessage[0].find1[0] != undefined){
            console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
            let x = await axios.post('http://192.168.1.5:8000/Router/chat', {
                "user1": ChatMessage[0].find1[0].user1,
                "user2": _MyData.email,
                "chats":{
                    "isSendByMe": _MyData.email,
                    "message": msg,
                    "date":Date.now()
                }        
            });
            // Data();
            // UpdateedData();
        }
        else{
            if(SenderData.email!=undefined){
                console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                let x = await axios.post('http://192.168.1.5:8000/Router/chat', {
                    "user1": SenderData.email,
                    "user2": _MyData.email,
                    "chats": {
                        "isSendByMe": _MyData.email,
                        "message": msg,
                        "date":Date.now()
                    }        
                });
                // Data();
                // UpdateedData();
            }
        }
    }



    const My = ({ message }) => (
        <View style={{
            left: "53%",
            width:160,
            margin:"1%",
            // alignSelf:'flex-end',
            // position: 'relative',
            // borderBottomRightRadius:20,
        }}>
            <Text
                style={{
                    fontWeight: '200',
                    fontSize: 18,
                    padding: 8,
                    alignSelf:'flex-end',
                    backgroundColor: '#8a2be2',
                    borderTopLeftRadius:20,
                    borderTopRightRadius:25,
                    borderBottomLeftRadius:20,
                }}
            >{message}</Text>
        </View>
    );

    const NotMy = ({ message }) => (
        <View style={{
            width: 160,
            margin:"1%",
        }}>
            <Text
                style={{
                    fontWeight: '200',
                    fontSize: 18,
                    padding: 8,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:25,
                    borderBottomRightRadius:20,
                    backgroundColor: 'white',
                    alignSelf:'flex-start',
                }}
            >{message}</Text>
        </View>
    );


    const renderItem = ({ item }) => (
        <View>

            {console.log('item', item)}
            {/* {console.log('item',item.find1[0].user2)} */}
            {/* <Text>{item != null?item.find1[0].chats.message:"HIII"}</Text> */}
            {/* <Text >{item.chats.message}</Text> */}

            {console.log('_MyData',_MyData)}


            {item.isSendByMe==_MyData.email?
            <My message={item.message}/>:
            <NotMy message={item.message}/>}

{/* 
            {item.find1.map(item => {
                RenderArr.push(item.chats);
            })}

            {item.find2.map(item => {
                RenderArr.push(item.chats);
            })}


            

            {console.log('RenderArr', RenderArr)}

            {RenderArr.map(item => {
                if (item.isSendByMe == _MyData.email) {
                    return <My message={item.message}/>
                }
                if (item.isSendByMe != _MyData.email) {
                    return <NotMy message={item.message}/>
                }
            })} */}


            {/* {item.find1.map(item => (

                item.user2 == _MyData.email?
                <My
                    message={item.chats.message} 
                />:<NotMy
                    message={item.chats.message} 
                />
            ))} */}





            {/* {
                item.find1[0].user2 == _MyData.email?
                <My
                    message={item.find1[0].chats.message} 
                />:
                <NotMy
                    message={item.find1[0].chats.message} 
                />
            }
            {
                item.find2[0].user1 == _MyData.email?
                <NotMy
                    message={item.find2[0].chats.message} 
                />:<My
                    message={item.find2[0].chats.message} 
                />
            } */}
        </View>
    );


    const startLoading = () => {
        setTimeout(() => {
            setVariable(false);
        }, 1500);
    }

    // if(_value){
        return (
            <View style={styles.container}>
                <View>
                <FlatList
                    // inverted
                    // ref={flatlistRef}
                    data={_ChatMessage}
                    renderItem={renderItem}
                    extraData={_ChatMessage}
                    // style={styles.list}
                    />
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.keyboard}>
                        <TextInput
                            value={msg}
                            selectionColor={'#8a2be2'}
                            style={styles.input}
                            placeholder='Type your message'
                            onChangeText={(text) => { setmsg(text) }}
                        />
                    
                    </View>
                    <View style={{
                        width: "14%",
                        marginLeft: 7,
                        height: "95%",
                        left:0,
                    }}>
                        <Pressable
                            style={styles.sent}
                            onPress={() => {
                                send(msg);
                                setmsg(null);
                                // Data();
                            }}>
                            <AntDesign 
                                name="rightcircleo" 
                                size={32} 
                                color="white" />
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    // }else{
    //     return (
    //         <View style={styles.container}>
    
    //             {/* <Text style={styles.text}>{
    //                 msg != null ? msg : ""
    //             }</Text> */}
    
    //             {/* {console.log("Sender Data",SenderData.message[0].email)} */}
    
    //             {/* {console.log("ChatMessage",ChatMessage[0])}  */}
    //             {/* {console.log("send by me if ChatMessage[0].find1[0].user2:", ChatMessage[0].find1[0].user2)} */}
    //             {/* {console.log("Other user email:",ChatMessage[0].find1[0].user1)} */}
    
    //             {/* {console.log('MyData',_MyData.email)} */}
    //             <FlatList
    //                 data={ChatMessage}
    //                 renderItem={renderItem}
    //             // style={styles.list}
    //             />
    
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
    //                 {/* <View style={styles.sent}></View> */}
    //                 <TouchableOpacity
    //                     style={styles.sent}
    //                     onPress={() => {
    //                         sendNew(msg);
    //                         setmsg(null);
    //                     }}>
    //                     <Image
    //                         style={{
    //                             width: "100%",
    //                             height: "100%",
    //                             borderRadius: 70,
    //                         }}
    //                         source={require('../assets/send.png')} />
    //                 </TouchableOpacity>
    
    //             </View>
    //         </View>
    //     )
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        // flexDirection: 'column',
        // backgroundColor: '#8a2be2',
        // justifyContent: 'center',
    },
    bottomView: {
        bottom: 4,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#EE5407',
    },
    keyboard: {
        width: "80%",
        height: "90%",
        // marginLeft: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        // paddingLeft:2,
        marginLeft: 20,
    },
    input: {
        width: "90%",
        borderRadius: 20,
        backgroundColor: 'white',
    },
    sent: {
        width: "100%",
        height: "100%",
        // marginRight: 2,
        borderRadius: 100,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#8a2be2',
    }
});

export default Chat;