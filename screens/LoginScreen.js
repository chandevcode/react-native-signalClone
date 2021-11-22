import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input, Image, Button } from "react-native-elements";
import {auth}  from '../firebase'

const LoginScreen = ({navigation}) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
   const unsubscribe= auth.onAuthStateChanged((authUser) => {
    console.log(authUser)
      if(authUser) {
        navigation.replace('Home')
      }
    })
    return unsubscribe;
  }, [])

  const signIn = () => {
    auth.signInWithEmailAndPassword(mail, password).catch((error) => alert(error))
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png",
        }}
        style={styles.img}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="@mail" type='email' value={mail} onChangeText={(text) => setMail(text)} />
        <Input
          placeholder="Password"
          type='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button buttonStyle={styles.button} title="Login" onPress={signIn} />
      <Button buttonStyle={styles.button} title="Register" type="outline" 
      onPress={()=> navigation.navigate('Register')}
      />
      <View style={{height: 50}} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  inputContainer: {
    width: 300,
    marginVertical: 15,
  },
  button: {
    marginTop: 10,
    width: 200,
    borderWidth: 0,
  },
});
