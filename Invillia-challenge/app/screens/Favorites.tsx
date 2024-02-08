import React, { useContext, useState } from "react";
import { Dimensions } from "react-native";
import { Box, ScrollView } from "native-base";
import { UserContext } from "../context";
import { GridText, MainHeader } from "../components";

function Favorites({ navigation }: { navigation: any }) {
  useContext(UserContext);
  const { favoritesWords } = useContext(UserContext);

  return (
    <>
      <MainHeader label="Favorite words" />
      <GridText providedList={favoritesWords} />
    </>
  );
}

export default Favorites;
