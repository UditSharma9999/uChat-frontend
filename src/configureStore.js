// // import {createStore,CombinedState} from 'redux';

// // export default configureStore({
// //     reducer: {}
// // })


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     View,
//     Text,
//     Image,
//     FlatList,
//     StatusBar,
//     StyleSheet,
//     BackHandler,
//     TouchableOpacity,
//     ActivityIndicator,
// } from 'react-native';


// const ChatRoom = ({ navigation }) => {
//     const [OtherUserEmailId,setOtherUserEmailId] = useState([]);
//     const [MyData, setMyData] = useState({
//         __v: 0,
//         _id: "",
//         email: "",
//         lname: "",
//         name: "",
//         password: "",
//         token: "",
//     });
//     const [DATA,setDATA] = useState([]);
//     const [_DATA,_setDATA] = useState([]);
//     const [Variable, setVariable] = useState(true);
//     const [OtherUserEmail, setOtherUserEmail] = useState([]);

//     const [FetchUserData, setFetchUserData] = useState(async () => {
//         let x = await AsyncStorage.getItem('Jwt');
//         let Response = await axios.post('http://192.168.42.223:8000/isSignUp', { 'token': x });

//         console.log('Response.data.message[0]', Response.data.message[0])
//         return Response.data.message[0];
//     });
//     const [UserData, setUserData] = useState(async () => {
//         let value = await FetchUserData;
//         console.log('value', value);


//         setMyData(() => ({
//             ...value
//         }));

//         let x = await axios.post('http://192.168.42.223:8000/chatroom', { 'user': value.email });
//         console.log('x.data', x.data);
//         setUserData(x.data);
//         return x.data
//     });



//     const Id = async () => {

//         console.log('UserData', UserData);

//         const y = await UserData;
//         console.log('y ===>', y);

//         // console.log("length", y.find1.length);

//         if (y.find1[0] != undefined ) {
//             if(MyData.email != y.find1[0].user2){
//                 console.log(y.find1[0].user2);
//                 setOtherUserEmail(() => ([y.find1[0]]));
//                 console.log('OtherUserEmail 1', OtherUserEmail)
                
//                 for (var i = 0; i <= (y.find1.length - 1); i++) {
//                     console.log('y.find1[0].user2 //==>', y.find1[i].user2)
//                     OtherUserEmail.push(y.find1[i].user2);
//                     console.log(i)
//                     // setOtherUserEmail(() => ([
//                     //     `${arr[i]}`
//                     // ]))
//                     // break;
//                 }            
//             }
//             console.log('OtherUserEmail', OtherUserEmail);
//             // console.log('OtherUserEmailId', OtherUserEmailId);
//         }

//         if (y.find2[0] != undefined) {
//             if(MyData.email != y.find2[0].user1){
                    
//                 console.log(y.find2[0].user1);
//                 setOtherUserEmail(() => ([y.find2[0]]));
//                 console.log('OtherUserEmail 1', OtherUserEmail)

//                 for (var i = 0; i <= (y.find2.length - 1); i++) {
//                     console.log('y.find2[0].user1 //==>', y.find2[i].user1)
//                     OtherUserEmail.push(y.find2[i].user1);
//                     console.log(i)
//                     // setOtherUserEmail(() => ([
//                     //     `${arr[i]}`
//                     // ]))
//                     // break;
//                 }            
//             }
//             console.log('OtherUserEmail', OtherUserEmail);
//             // console.log('OtherUserEmailId', OtherUserEmailId);
//         }


//         console.log('OtherUserEmail', OtherUserEmail);
//         // console.log('OtherUserEmailId', OtherUserEmailId);


//         console.log('OtherUserEmailId.length =>', OtherUserEmailId.length);

//         if(OtherUserEmailId.length == 0){
//             let uniqueChars = [...new Set(OtherUserEmail)];
    
//             for (let i = 0; i < uniqueChars.length; i++) {
//                 OtherUserEmailId.push(uniqueChars[i]);
//             }
//             console.log('uniqueChars',uniqueChars);
//         }

//         console.log('OtherUserEmail real value', OtherUserEmail);
//         console.log('OtherUserEmailId real value', OtherUserEmailId);

//         return OtherUserEmailId;
//     }

//     const FetchOtherUserData = async ()=>{
//         let y = await Id();
//         console.log("Value of y is ",y);
//         console.log('_DATA',_DATA);
//         console.log("y.length",y.length);

//         if(_DATA.length <= (y.length-1)){
//             for (let i = 0; i < y.length; i++) {
//                 let x = await axios.post('http://192.168.42.223:8000/users', { 'email': `${y[i]}` });
//                 _DATA.push(x.data.message);
//             }
//             let uniqueChars = [...new Set(_DATA)];
        
//             for (let i = 0; i < uniqueChars.length; i++) {
//                 DATA.push(uniqueChars[i]);
//             }
//         }
        
//         console.log('Data',DATA);
//         console.log('Data',DATA.length);

//         console.log('_Data',_DATA);
//         console.log('_Data',_DATA.length);
//     }

//     FetchOtherUserData();
//     console.log('OtherUserEmail ||', OtherUserEmail);



//     useEffect(() => {
//         BackHandler.addEventListener("hardwareBackPress", () => { return true })
//     })



//     console.log('MyData', MyData);

//     const Item = ({ name, lname }) => (
//         <View style={styles.item}>
//             <Image
//                 style={styles.dp}
//                 source={require('../assets/logo.png')} />
//             <View style={{
//                 flexDirection: 'column',
//                 marginLeft: "5%",
//                 height: '100%',
//                 width: "60%",
//                 paddingBottom: 10,
//             }}>
//                 <Text style={{ fontSize: 20 }}>{`${name}` + " " + `${lname == undefined ? "" : lname}`}</Text>
//                 {/* <Text style={{
//                     height: 16
//                 }}>msg  sknlshdasjkchdjjjcjceeddeqwwww.google.com</Text> */}
//             </View>
//             {/* <Text>{date}</Text> */}
//         </View>
//     );

//     // console.log('UserData //=>', UserData);

//     const renderItem = ({ item }) => (
//         <TouchableOpacity
//             onPress={() => {
//                 // console.log('item', item);
//                 navigation.navigate('Chat',{
//                     SenderData:item,
//                     _MyData:MyData,
//                     _value:true
//                 });
//             }}>
//             <Item
//                 name={item.message[0].name}
//                 // date={item.date} 
//                 lname={item.message[0].lname}
//             />
//         </TouchableOpacity>
//     );


//     if (DATA != undefined && DATA.length != 0) {
//         return (
//             <View style={styles.container}>
//                 <StatusBar backgroundColor="#8a2be2" />
//                 {console.log('UserData //========//', UserData)}
//                 <View style={{
//                     width: "100%",
//                     height: "20%"
//                 }}>
//                     <Text style={styles.text}>Chat with your friends</Text>
//                 </View>
//                 <View style={styles.screen}>
//                     <FlatList
//                         data={DATA}
//                         renderItem={renderItem}
//                         style={styles.list}
//                     />
//                     <TouchableOpacity 
//                         style={styles.search}
//                         onPress={()=>{
//                             navigation.navigate('SearchScreen',{
//                                 SenderData:DATA,
//                                 _MyData:MyData
//                             });
//                         }}>
//                         <Image
//                             source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
//                             style={styles.FloatingButtonStyle} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         )
//     } else {
//         return (
//             <View style={styles.container}>
//                 <StatusBar backgroundColor="#8a2be2" />
//                 {console.log('UserData', UserData)}
//                 <View style={{
//                     width: "100%",
//                     height: "20%"
//                 }}>
//                     <Text style={styles.text}>Chat with your friends</Text>
//                 </View>
//                 <View style={styles.screen}>
//                     <TouchableOpacity 
//                         style={styles.search}
//                         onPress={()=>{
//                             navigation.navigate('SearchScreen',{
//                                 SenderData:DATA,//empty array []
//                                 _MyData:MyData
//                             });
//                         }}>
//                         <Image
//                             source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
//                             style={styles.FloatingButtonStyle} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#8a2be2',
//     },
//     text: {
//         width: "40%",
//         fontSize: 25,
//         color: 'white',
//         fontWeight: '400',
//         paddingTop: "8%",
//         paddingLeft: "5%"
//     },
//     screen: {
//         width: "100%",
//         height: "80%",
//         paddingTop: 30,
//         borderTopLeftRadius: 30,
//         justifyContent:'center',
//         borderTopRightRadius: 30,
//         backgroundColor: 'white',
//     },
//     item: {
//         padding: 10,
//         marginVertical: 1,
//         flexDirection: 'row',
//         // backgroundColor: '#f9c2ff',

//     },
//     dp: {
//         width: "15%",
//         height: "100%",
//         borderRadius: 60,
//     },
//     // msg: {},
//     search: {
//         right: 10,
//         width: 50,
//         height: 50,
//         bottom: 10,
//         alignItems: 'center',
//         position: 'absolute',
//         justifyContent: 'center',
//     },
//     FloatingButtonStyle: {
//         resizeMode: 'contain',
//         width: 50,
//         height: 50,
//     },
// });

// export default ChatRoom;