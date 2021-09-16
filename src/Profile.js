import { TextInput, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

const Profile = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Profile</Text>
            <StatusBar style="auto" />
            <View style={styles.screen}>
                <Image 
                    style={styles.logo}
                    source={require('../assets/logo.png')}/>
                
                <TextInput
                    style={styles.input}
                    label="Phone Number"/>
                
                <TextInput
                    style={styles.input}
                    label="About"/>

            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        position: 'relative',
        justifyContent:'center',
        backgroundColor:'#8a2be2',
        paddingTop:"20%",
    },
    screen:{
        width:"100%",
        height:"100%",
        alignItems:'center',
        backgroundColor:'white',
        borderTopLeftRadius:100,
        borderTopRightRadius:100,
        paddingTop:50
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom:'8%'
    },
    input: {
        margin: '2%',
        width:"70%",
        backgroundColor:'white'
    },
    text: {
        fontSize: 25,
        color:'white',
        fontWeight: '400',
        paddingBottom: '10%',
    },
});

export default Profile;