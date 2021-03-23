import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import ActionBar from './ActionBar'
import AddtBirthday from './AddBirthday'

export default function ListBirthday(props){
    const {user} = props;
    const [showList, setShowList] = useState(true);
    return(
        <View style ={styles.container}>
            {showList ? 
                (
                    <>
                        <Text>Lista</Text>
                        <Text>Lista</Text>
                        <Text>Lista</Text>
                        <Text>Lista</Text>
                    </>
                )
                :
                (
                    <AddtBirthday user={user}></AddtBirthday>
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
})