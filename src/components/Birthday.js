import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Touchable} from 'react-native';


export default function Birthday(props){
    const {birthday} = props;
    const past = birthday.days > 0 ? true:false;
    return(
        <TouchableOpacity style={[styles.card, past?styles.past: birthday.days===0?styles.actual: styles.curren ]}>
            <Text>{birthday.name} {birthday.lastname}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        margin:10,
        borderRadius:15,
    },
    past:{
        backgroundColor:'#820000',
    },
    curren:{
        backgroundColor:'#1ae1f2',
    },
    actual:{
        backgroundColor:'#559204',
    }

})