import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import {AntDesign , SimpleLineIcons} from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {
    const [chats,setChats] = useState([])
    const signOutUser = () => {
        auth.signOut().then(() =>{
            navigation.replace('Login')
        })
    }
    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => setChats(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data() 
            }))
        ))
        return unsubscribe;
    },[])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
          <View style={{
              flexDirection:'row',
              marginRight: 20,
              width: 80,
              justifyContent:'space-between'
          }}>
              <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name="camerao" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
              <SimpleLineIcons name="pencil" size={24} color="black" />
              </TouchableOpacity>
          </View>
      )
    });
  }, [navigation]);


    const enterChat = (id, chatName) => {
      navigation.navigate('Chat', {
        id,
        chatName
      })
    }


  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {chats.map(({id, data: {chatName}}) =>(
              <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />

          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
});
