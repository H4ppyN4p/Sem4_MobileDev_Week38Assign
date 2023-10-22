import { StyleSheet, View, Button, Text, FlatList, TextInput } from 'react-native'
import { useState } from 'react'

//Firebase Imports
import { useCollection} from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { database } from '../firebase'


const NotesPage = () => {

    const [text, setText] = useState('')
    const [editDocument, setEditDocument] = useState(null);

    const [values, loading, error] = useCollection(collection(database, 'notes'))
    const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))

    async function deleteDocument(id){
        await deleteDoc(doc(database, 'notes', id))
    }

    function viewUpdateDialogue(item){
        setEditDocument(item)
    }

    async function saveUpdate(){
        await updateDoc(doc(database, 'notes', editDocument.id), {
            text: text
        })
        setText('')
        setEditDocument(null)
    }

    return (
        <View style={styles.container}>

            {editDocument && 

            <View style={styles.editView}> 

                <Text>
                    This is the "updating notes" section
                </Text>

                <TextInput style={styles.editField} 
                multiline={true}
                defaultValue={editDocument.text}
                onChangeText={(txt) => setText(txt)}
                />

                <Button title='Submit' onPress={saveUpdate}/>

            </View>
            }

            
            <FlatList 
            data={data}
            renderItem={
                (note) => 
                    <View> 
                        <Text style={styles.item}>{note.item.text}</Text>
                        <Button 
                        title='Delete note'
                        onPress={() => deleteDocument(note.item.id)} />
                        <Button 
                        title='Edit note'
                        onPress={() => viewUpdateDialogue(note.item)}
                        />
                    </View>
                }
            />
        </View>
    )
}

export default NotesPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }, 
    item: {
        paddingTop: 5
    },
    editView: {
        paddingBottom: 10,
        backgroundColor: 'gray'
    },
    editField: {
        backgroundColor: '#1A43BF',
        color: 'white',

    }
})