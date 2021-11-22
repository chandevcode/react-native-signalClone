import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(mail, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: fullName,
          photoURL:
            imageUrl ||
            "https://i.pinimg.com/originals/0e/51/88/0e51888aa8722c45dd597a6d3fbc7e36.jpg",
        });
      }).catch((error) => alert(error.message))
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <Text h4 style={styles.inputText}>
          Register an Account
        </Text>
        <Input
          style={styles.input}
          placeholder="Full Name"
          autoFocus
          type='text'
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <Input
          style={styles.input}
          placeholder="@mail"
          type='email'
          value={mail}
          onChangeText={(text) => setMail(text)}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          type='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          style={styles.input}
          placeholder="Image Url (Optional)"
          onSubmitEditing={register}
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
      </View>
      <Button buttonStyle={styles.button} title="Register" onPress={register} />
      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  inputText: {
    marginBottom: 40,

    alignSelf: "center",
  },
  inputContainer: {
    width: 300,
  },
  input: {},
  button: {
    width: 200,
  },
});
