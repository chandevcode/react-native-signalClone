import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  DatePickerIOSBase,
} from "react-native";
import { Avatar, Input } from "react-native-elements";
import firebase from "firebase";
import { auth, db } from "../firebase";

const ChatScreen = ({ navigation, route,  }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL,
            }}
          />
          <Text style={{ color: "white", fontWeight: "700", marginLeft: 10 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="videocam-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="md-call-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendChat = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerView}
        keyboardVerticalOffset={10}
      >
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <ScrollView style={{paddingTop: 5}}>
                {messages.map(({ id, data }) =>
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.receiver}>
                      <Avatar
                        rounded
                        size={30}
                        //Web
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        source={{ uri: data.photoURL }}
                      />
                      <Text style={styles.receiverText}>{data.message}</Text>
                    
                    </View>
                  ) : (
                    <View key={id} style={styles.sender}>
                      <Avatar
                        rounded
                        size={30}
                        //Web
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          left: -5,
                        }}
                        position="absolute"
                        bottom={-15}
                        left={-5}
                        source={{ uri: data.photoURL }}
                      />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  )
                )}
              </ScrollView>
              <View style={styles.footer}>
                <TextInput
                  placeholder="signal message"
                  style={styles.textInput}
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  onSubmitEditing={sendChat}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={sendChat}>
                  <Ionicons name="md-send" size={24} color="#168aad" />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    margin: 15,
  },
  senderName: {
      left : 10,
      paddingRight : 10,
      fontSize: 10,
      color: 'white'
  },
  sender: {
    padding: 15,
    backgroundColor: "#4895ef",
    alignSelf: "flex-start",
    margin: 15,
    borderRadius: 20,
    maxWidth: "80%",

    position: "relative",
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    marginBottom: 15,
    marginLeft: 10,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  containerView: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textInput: {
    flex: 1,
    borderRadius: 30,

    backgroundColor: "#ECECEC",

    bottom: 0,
    color: "gray",
    height: 40,
    marginRight: 15,
    padding: 10,
  },
});
