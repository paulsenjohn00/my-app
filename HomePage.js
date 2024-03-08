import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PocketBase from "pocketbase";

const HomePage = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const pb = new PocketBase("http://127.0.0.1:8090");

      // Authenticate
      await pb.admins.authWithPassword(
        "paulsenjohn00@gmail.com",
        "Shakeandbake25!"
      );

      // Fetch records
      const records = await pb.collection("workout_group").getFullList({
        sort: "GroupName",
      });

      setWorkouts(records);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Workout</Text>
      {workouts.map((workout) => (
        <Pressable
          key={workout.id}
          style={styles.button}
          onPress={() =>
            navigation.navigate("Workout", {
              title: workout.GroupName,
              id: workout.id,
            })
          }>
          <Text style={styles.buttonText}>{workout.GroupName}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
  },
  button: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FF6347",
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
});

export default HomePage;
