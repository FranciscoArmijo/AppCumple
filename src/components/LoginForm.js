import React from 'react';
import { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput,Alert} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props){

    const {changeForm} = props;
    const [formError, setFormError] = useState({});

    const login = () =>{
        let errors = {};
        if (!formData.email || !formData.password ) {
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            Alert.alert('OOPS!','Todos los campos son obligatorios', [{text:'Entendido'}]);
        }else if(!validateEmail(formData.email)){
            errors.email = true;
            Alert.alert('MAIL INVALIDO!','Debe agregar un correo valido', [{text:'Entendido'}]);
        }else{
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .then()
            .catch(()=>{
                setFormError({
                    email: true,
                    password: true
                });
            });
        }
        setFormError(errors);
    }

    const [formData, setFormData] = useState(defaultValue())

    const onChange = (e, type)=>{
        setFormData({...formData, [type]: e.nativeEvent.text});
    }

    

    return(
        <>
            <TextInput 
            placeholder="Correo Electronio"
            placeholderTextColor="#969696"
            style ={[styles.input, formError.email && styles.error]}
            onChange ={(e)=>onChange(e,'email')}
            >
            </TextInput>

            <TextInput 
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            style ={[styles.input, formError.password && styles.error]}
            secureTextEntry={true}
            onChange ={(e)=>onChange(e,'password')}
            >
            </TextInput>

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText} >Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style = {styles.registrate}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText} >Registrate</Text>
                </TouchableOpacity>
            </View>
          
        </>
    )
}


const styles = StyleSheet.create({
    btnText :{
        color: '#fff',
        fontSize: 20,
    },
    input:{
        height:50,
        color:'#fff',
        width:'80%',
        marginBottom:25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#133040',
    },
    registrate:{
        flex: 1,
        justifyContent:'flex-end',
        marginBottom: 20,
    },
    error:{
        borderColor:'#940c0c'
    }
});

function defaultValue() {
    return{
            email:'',
            password:''
        }
}