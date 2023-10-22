import { StyleSheet, View, Button, TextInput, FlatList, Text } from "react-native"
import { useState } from "react"

//imports firebase
import { app, database } from '../firebase'
import { collection, addDoc } from "firebase/firestore"


const HomePage = ({navigation}) => {

    const [text, setText] = useState('')

  
    async function buttonHandler() {
        try {
        await addDoc(collection(database, 'notes'), {
            text: text
        })
        } catch(err){
            console.log('fejl i DB: ' + err)
        }
    }



    return (
        <View >

            <Button title='Press Me' onPress={buttonHandler}/>
            <TextInput style={styles.inputField} onChangeText={(txt) => setText(txt)}/>
            <Text>This is the AboutMe section</Text>
            <Text>Some about me textt</Text>
            


            <Button style={styles.buttons}
            title='Go to Notes page'
            onPress={() =>
            navigation.navigate('Notes')}
            />

            
        </View>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        backgroundColor: '#1A43BF',
        color: 'white'
    }
})