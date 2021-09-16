import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StatusBar,
    StyleSheet,
    BackHandler,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';


const SearchScreen = ({ route, navigation }) => {
    const { _MyData } = route.params;

    const [Emails, setEmails] = useState([])
    const [Email, setEmail] = useState([]);
    const [Variable, setVariable] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const flatlistRef = useRef();

    const [Search, setSearch] = useState(async () => {

        console.log('_MyData', _MyData);

        let x = await axios.post('http://192.168.1.5:8000/Router/search');
        console.log(x.data.message);

        const email = []
        for (let i = 0; i < x.data.message.length; i++) {
            email.push(x.data.message[i].email);
        }

        let uniqueChars = [...new Set(email.sort())];

        for (let i = 0; i < uniqueChars.length; i++) {
            Email.push(uniqueChars[i]);
        }

    });

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            navigation.navigate('ChatRoom');
        })
    })

    const startLoading = () => {
        setTimeout(() => {
            setVariable(false);
        }, 1500);
    }

    const Item = ({ email }) => (
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
                <Text style={{ fontSize: 20 }}>{email}</Text>
            </View>
            {console.log('email ==>', email)}
            <TouchableOpacity
                style={{
                    height: 30,
                    width: "18%",
                    marginTop: "1%",
                    borderRadius: 90,
                    alignSelf: 'center',
                    alignItems:'center',
                    paddingLeft: "1.5%",
                    justifyContent: 'center',
                    backgroundColor: '#8a2be2',
                }}
                onPress={() => {
                    navigation.navigate('Chat', {
                        SenderData: { "email": email },
                        _MyData: _MyData,
                        _value: false,
                        newUser:email
                    });
                }}>
                <Text>message</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <View>
            {_MyData.email != item ?
                `${item}`.includes(searchQuery) ?
                    <Item email={item} /> :
                    <View /> :
                <View />}
        </View>
    );
    if (Email.length != 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#8a2be2" />
                {console.log("SearchQuery", searchQuery)}
                {console.log('_MyData', _MyData)}
                <View style={{
                    marginTop: 8,
                    marginLeft: 8,
                    height: "10%",
                    width: "100%",
                    marginRight: 8,
                    justifyContent: 'center',
                    position: 'relative',
                }}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{
                            width: "100%",
                            height: "100%",
                            position: 'absolute',
                        }}
                    />
                </View>
                <FlatList
                    // inverted
                    // ref={flatlistRef}
                    data={Email}
                    renderItem={renderItem}
                    style={styles.list}
                />
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator
                    visible={true}
                    size="large"
                    color="#8a2be2"
                />
                {startLoading()}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    item: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 2,
        marginVertical: 1,
        flexDirection: 'row',
    },
    dp: {
        width: "15%",
        height: "100%",
        borderRadius: 60,
    },
});

export default SearchScreen;