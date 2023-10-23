import { StyleSheet, View, Button, Text, FlatList, TextInput, Image } from 'react-native'
import { useState } from 'react'

//Firebase Imports
import { useCollection} from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { database, storage } from '../firebase'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'


const NotesPage = () => {

    //setting the text for the notes
    const [text, setText] = useState('')
    //figuring out which note to edit
    const [editDocument, setEditDocument] = useState(null);
    //Image paths
    const [imagePath, setImagePath] = useState(null)
    //Image name for Firebase
    const [imageName, setImageName] = useState(null)
    //View the image
    const [viewImage, setViewImage] = useState(null)

    //Getting and showing all the notes
    //
    const [values, loading, error] = useCollection(collection(database, 'notes'))
    const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))

    //Deleting a single note
    //
    async function deleteDocument(id){
        await deleteDoc(doc(database, 'notes', id))
    }

    //Updating the notes
    //
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

    //Image functions
    //
    async function launchImagePicker(id){
        setImageName(id)
        let result = ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        })
        if(!(await result).canceled){
            setImagePath((await result).assets[0].uri)
        }
    }

    async function uploadImage(){
        const result = await fetch(imagePath)
        const blob = await result.blob()
        const storageRef = ref(storage, `${imageName}.jpg`)
        uploadBytes(storageRef, blob).then((snapShot => {
            alert('image uploaded')
        }))
        setImagePath(null)
    }

    async function downloadImage(id){
        imageId = String(id)
        //alert(typeof(imageId))
        getDownloadURL(ref(storage, `${imageId}.jpg`))
        .then((url) => {
            setViewImage(url)
        })
    }

    function finishViewing(){
        setViewImage(null)
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

            {imagePath && 
            
            <View style={styles.editViewImage}>
                <Image style={{width: 200, height: 200}} source={{uri:imagePath}}/>
                <Button title='Submit' onPress={uploadImage}/>
            </View>}

            {viewImage && 
            
            <View style={styles.editViewImage}>
                <Image style={{width: 200, height: 200}} source={{uri:viewImage}}/>
                <Button title='Finished viewing' onPress={finishViewing}/>

            </View>}


            
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
                        <View style={styles.imageButtons}> 
                            <Button 
                            style={styles.imageButton}
                            title='Pick Image'
                            onPress={() =>launchImagePicker(note.item.id)}
                            />
                             <Button
                            style={styles.imageButton}
                            title='Show Image'
                            onPress={() =>downloadImage(note.item.id)}
                            />
                        </View>
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
    editViewImage: {
        paddingBottom: 10,
        backgroundColor: 'gray',
    
    },
    editViewImage: {
        paddingBottom: 10,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editField: {
        backgroundColor: '#1A43BF',
        color: 'white',

    }, 
    imageButtons: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageButton: {
        
    }
})