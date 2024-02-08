import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../../screens/Home";
import History from "../../screens/History";
import Favorites from "../../screens/Favorites";
import React, { useContext } from "react";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export const AppNavigation: React.FC = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        
        screenOptions={({ route }) => ({
          headerShown: false, // This line hides the header
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Favorites") {
              iconName = focused ? "heart" : "heart-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
