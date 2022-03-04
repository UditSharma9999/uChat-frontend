import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons'; 
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import React, { useState, useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';

const Chat = ({ route, navigation }) => {
    const { SenderData } = route.params;
    const { _MyData } = route.params;
    const { _value } = route.params;
    const { newUser } = route.params

    const [NewUser, setNewUser] = useState([]);
    const [messages, setMessages] = useState([]);

    const uid = _MyData.email > SenderData.email ? _MyData.email + "_" + SenderData.email : SenderData.email + "_" + _MyData.email

    const socket = io("http://192.168.1.6:8000/");

    useEffect(() => {

        socket.emit("chats", {
            "MyEmail": _MyData.email,
            "OtherUserEmail": SenderData.email
        });

        socket.on("messages", ({ arr }) => {
            setMessages(arr);
        })
    })

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
          
            navigation.navigate('ChatRoom', { "NewUser": NewUser });
        });

    }, [])



    const onSend = async (messages) => {

        let d = await axios.post('http://192.168.1.6:8000/Router/search', { 'email': newUser });
        // console.log(d.data.message[0]);

        setNewUser(d.data.message[0]);

        let SendData = [...messages]
        SendData[0].user.uid = uid;
        SendData[0].user.OtherUserEmail = SenderData.email
        

        await axios.post('http://192.168.1.6:8000/Router/Chat', SendData);
     

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    };
    
    const renderBubble = props => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    left: {
                        color: '#8a2be2'
                    }
                }}
                wrapperStyle={{
                    right: {
                      backgroundColor: '#8a2be2',
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 15,
                      borderTopRightRadius: 15,
                      borderTopLeftRadius: 15,
        
                    },
                    left: {
                      backgroundColor: 'white',
                      borderBottomRightRadius: 15,
                      borderBottomLeftRadius: 15,
                      borderTopRightRadius: 15,
                      borderTopLeftRadius: 0,
                    }
                  }}
            />
        )
    }

    const renderSend = props => {
        return(
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons 
                        name="send-circle" 
                        size={46}
                        color="#8a2be2"
                        style={{
                            margin:0,
                            padding:0,
                            marginRight:5,
                        }}
                    />
                </View>
            </Send>
        )
    }

    const scrollToBottomComponent = () => {
        return(
            <FontAwesome 
                name="angle-double-down" 
                size={20}
                color="#8a2be2"
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <GiftedChat
                messages={messages} 
                onSend={messages => onSend(messages)} 

                renderBubble={props => renderBubble(props)} // custom  Bubble/message box
                alwaysShowSend      // always show send button even if message input is empty,But it will not work
                renderSend={props => renderSend(props)}     //costum Send button
                scrollToBottom         // button of scroll to bottom
                scrollToBottomComponent={scrollToBottomComponent} //costumize scroll to bottom buttom
                
                user={{
                    _id: _MyData.email,
                }}
            />
        </View>
    )
};

export default Chat;
