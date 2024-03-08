import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import HomePage from "./HomePage";
import Workout from "./Workout";

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="Workout"
              component={Workout}
              options={({ route }) => ({
                title: route.params.title,
                id: route.params.id,
              })}
            />
          </>
        ) : (
          <Stack.Screen name="Login" options={{ title: "Login" }}>
            {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
