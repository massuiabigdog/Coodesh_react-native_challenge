import { registerRootComponent } from "expo";

import { AppNavigation } from "./config/Navigation";
import { UserProvider } from './context';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { LogBox } from 'react-native';

import { NativeBaseProvider,  extendTheme } from "native-base";
import { useState } from "react";

function App() {
  LogBox.ignoreAllLogs();//Ignore all log notifications


  const theme = extendTheme({
    colors: {
      primary: {
        50: "#3629B7",
        100: "#3629B7",
        200: "#3629B7",
        300: "#3629B7",
        400: "#3629B7",
        500: "#3629B7",
        600: "#3629B7",
        700: "#3629B7",
        800: "#3629B7",
        900: "#3629B7",
      },
    },

  });


  return (
    <NativeBaseProvider theme={theme}>
        <UserProvider>
          <AppNavigation />
        </UserProvider>
    </NativeBaseProvider>
  );
}

export default registerRootComponent(App);