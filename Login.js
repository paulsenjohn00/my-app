import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PocketBase from "pocketbase";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  async function handleLogin() {
    try {
      const pb = new PocketBase("http://127.0.0.1:8090");
      const authData = await pb
        .collection("users")
        .authWithPassword(username, password);
      setIsLoggedIn(true);
      navigation.navigate("Home");
    } catch (error) {
      alert("Incorrect username or password");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={""} style={styles.button2}>
        <Text style={styles.buttonText}>Create an Account</Text>
      </Pressable>
      {/* <Button title="CreateAccount" onPress={handleLogin} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FF6347",
  },
  label: {
    fontSize: 18, // Larger font size
    marginBottom: 10, // More spacing below labels
    color: "#fff", // White text color
    fontWeight: "bold", // Bold text
  },
  input: {
    width: "80%", // Narrower input field
    height: 50, // Taller input field
    borderWidth: 2, // Thicker border
    borderColor: "#fff", // White border color
    borderRadius: 10, // Rounder corners
    paddingHorizontal: 15, // More padding inside input field
    marginBottom: 20, // More spacing below input field
    color: "#333", // Dark text color
    backgroundColor: "#fff", // White background color
  },
  button: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#4169E1",
    borderRadius: 10,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  button2: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#00A36C",
    borderRadius: 10,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Login;
