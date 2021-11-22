import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

import { db} from '../firebase'

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState('')
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add new Chat',
            headerBackTitle : 'Chats',

        })
    })

    const createChat =  async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() =>{
            navigation.goBack();
        }).catch(error => alert(error))
    }
    return (
        <View style={styles.container}>
            <Input placeholder='type chat ... '
            leftIcon={
                <Ionicons name="ios-chatbox-outline" size={24} color="black" />
            }
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat} />
            <Button disabled={!input} title='Create new Chat' onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
        padding: 30
    }
})
