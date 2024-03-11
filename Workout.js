import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import PocketBase from "pocketbase";

const Item = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [workoutItems, setWorkoutItems] = useState([]);
  const [weights, setWeights] = useState({});

  useEffect(() => {
    async function fetchData() {
      const pb = new PocketBase("http://127.0.0.1:8090");

      try {
        //authenticate;
        await pb.admins.authWithPassword(
          "paulsenjohn00@gmail.com",
          "Shakeandbake25!"
        );
        // Fetch records
        const records = await pb.collection("workout").getList(1, 50, {
          filter: 'Group = "' + id + '"',
          sort: "Order",
        });

        setWorkoutItems(records.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  const handleWeightChange = (itemId, weight) => {
    setWeights((prevWeights) => ({
      ...prevWeights,
      [itemId]: weight,
    }));
  };

  const createRecords = async () => {
    const pb = new PocketBase("http://127.0.0.1:8090");

    const promises = workoutItems.map(async (item) => {
      await pb.collection("workout_log").create({
        Workout: item.id,
        WorkoutName: item.WorkoutName,
        Sets: Number(item.BaseSets),
        Reps: Number(item.BaseReps),
        Weight: weights[item.id] || "",
      });
    });

    await Promise.all(promises);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {workoutItems.map((item) => (
          <View style={styles.contentblock} key={item.id}>
            <Text style={styles.heading}>{item.WorkoutName}</Text>
            <Text>{"Sets:"}</Text>
            <TextInput
              style={styles.input}
              value={item.BaseSets.toString()}
              onChangeText={(text) => {
                setWorkoutItems((prevItems) =>
                  prevItems.map((prevItem) =>
                    prevItem.id === item.id
                      ? { ...prevItem, BaseSets: text }
                      : prevItem
                  )
                );
              }}
            />
            <Text>{"Reps:"}</Text>
            <TextInput
              style={styles.input}
              value={item.BaseReps.toString()}
              onChangeText={(text) => {
                setWorkoutItems((prevItems) =>
                  prevItems.map((prevItem) =>
                    prevItem.id === item.id
                      ? { ...prevItem, BaseReps: text }
                      : prevItem
                  )
                );
              }}
            />
            <Text>{"Weight(lbs):"}</Text>
            <TextInput
              style={styles.input}
              value={weights[item.id] || ""}
              onChangeText={(text) => handleWeightChange(item.id, text)}
              keyboardType="numeric"
            />
          </View>
        ))}
        <Pressable onPress={createRecords}>
          <Text>Press me</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  contentblock: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    boxShadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    padding: 15,
    marginVertical: 5,
    marginBottom: 10,
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
});

export default Item;
