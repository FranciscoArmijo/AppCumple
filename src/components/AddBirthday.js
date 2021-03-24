import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling : true});
const db = firebase.firestore(firebase);

export default function AddtBirthday(props){
    const {user, setShowList,setReloadData} = props;
    const[isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const[formDate, setFormDate] = useState({});
    const [formError, setFormError] = useState({});
    const hideDatePickerVisible = () =>{
        setIsDatePickerVisible(false);
    }

    const handlerConfirm=(data)=>{
        const dateBirth = data;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setFormDate({...formDate, dateBirth});

        hideDatePickerVisible();
    }

    const showDatePicker =()=>{
        setIsDatePickerVisible(true);
    }

    const onChange = (e, type) =>{
        setFormDate({...formDate, [type]:e.nativeEvent.text})
    }

    const onSubmit = () =>{
        let error = {};
        if(!formDate.name || !formDate.lastname || !formDate.dateBirth){
            if(!formDate.name)error.name = true;
            if(!formDate.lastname)error.lastname = true;
            if(!formDate.dateBirth)error.dateBirth = true;
        }else{
            const data = formDate;
            console.log(data);
            data.dateBirth.setYear(0);
            db.collection(user.uid)
                .add(data)
                .then(()=>{
                    setReloadData(true);
                    setShowList(true);
                })
                .catch(()=>{
                    setFormError({name: true, lastname:true, dateBirth:true})
                })
        }
        setFormError(error);
        
    }

    return(
        <>
          <View style={styles.container}>
                <TextInput 
                    style = {[styles.input, formError.name && {borderColor:'#940c0c'}]}
                    placeholder ='Nombre'
                    placeholderTextColor='#969696'
                    onChange={(e)=>onChange(e, 'name')}>
                   
                </TextInput>

                <TextInput 
                    style = {[styles.input, formError.lastname && {borderColor:'#940c0c'}]}
                    placeholder ='Apellido'
                    placeholderTextColor='#969696'
                    onChange={(e)=>onChange(e, 'lastname')}>
                    
                </TextInput>
                <View style={[styles.input,styles.datepicker, formError.dateBirth && {borderColor:'#940c0c'} ]}>
                    <Text
                        style={{color:formDate.dateBirth?'#fff':'#969696',
                        fontSize:18,}}
                        onPress={showDatePicker}>{formDate.dateBirth ?
                        moment(formDate.dateBirth).format('LL'):
                        'Fecha de Nacimiento'}
                    </Text>

                </View>
                <TouchableOpacity onPress={onSubmit} >
                    <Text style={styles.addButton}>Crear Cumpleaños</Text>
                </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handlerConfirm}
            onCancel={hideDatePickerVisible}
          ></DateTimePickerModal>
          
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        height:50,
        color:'#fff',
        width:'80%',
        marginBottom: 25,
        backgroundColor:'#1e3040',
        paddingHorizontal:20,
        borderRadius:50,
        fontSize:18,
        borderWidth:1,
        borderColor:'#1e3040'
    },
    datepicker:{
        justifyContent:'center',
    },
    addButton:{
        fontSize: 18,
        color:'#fff'
    }

    
})
