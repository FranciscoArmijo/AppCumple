import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native'
import moment from 'moment';
import ActionBar from './ActionBar'
import AddtBirthday from './AddBirthday'
import firebase from '../utils/firebase';
import 'firebase/firestore';
import Birthday from './Birthday';


firebase.firestore().settings({experimentalForceLongPolling : true});
const db = firebase.firestore(firebase);

export default function ListBirthday(props){
    const {user} = props;
    const [showList, setShowList] = useState(true);
    const [birtday, setBirthday] = useState([]);
    const [pasatBirtday, setPasatBirthday] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(()=>{
        setBirthday([]);
        setPasatBirthday([]);
        db.collection(user.uid)
            .orderBy('dateBirth', 'asc')
            .get()
            .then((response)=>{
                const itemsArray = [];
                response.forEach((doc)=>{
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                });
                FormData(itemsArray);
            });
            setReloadData(false);
    },[reloadData]);

    const FormData = (items)=>{
        const currentDate = moment().set({
            hour:0,
            minute:0,
            second:0,
            millisecond:0
        });
        const birthdayTempArray = [];
        const pasatBirthdayTempArray = [];

        items.forEach((item) =>{
            const dateBirth = new Date(item.dateBirth.seconds*1000);
            const dateBirthday = moment(dateBirth);
            const currentYear = moment().get('year');
            dateBirthday.set({year: currentYear});
            const diffDate = currentDate.diff(dateBirthday, 'days');
            const itemTemp = item;
            itemTemp.dateBirth = dateBirthday;
            itemTemp.days = diffDate;

            if(diffDate <= 0){
                birthdayTempArray.push(itemTemp);
            }else{
                pasatBirthdayTempArray.push(itemTemp);
            };
        });
            setBirthday(birthdayTempArray);
            setPasatBirthday(pasatBirthdayTempArray);
    }

    return(
        <View style ={styles.container}>
            {showList ? 
                (
                    <ScrollView style={styles.scrollview}>
                        {birtday.map((item, index)=>(
                            <Birthday key={index} birthday={item}></Birthday>
                        ))}
                        {pasatBirtday.map((item, index)=>(
                            <Birthday key={index} birthday={item}></Birthday>
                        ))
                        }
                        
                    </ScrollView>
                )
                :
                (
                    <AddtBirthday user={user} setShowList={setShowList} setReloadData={setReloadData}></AddtBirthday>
                )
            }
            <ActionBar showList ={showList} setShowList={setShowList} ></ActionBar>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        height:'100%',
    },
    scrollview:{
        marginBottom: 50,
        width:'100%'
    }
})