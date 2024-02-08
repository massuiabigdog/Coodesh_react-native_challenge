import React, { useContext, useState } from "react";
import { Dimensions } from "react-native";
import { Box, ScrollView } from "native-base";
import { UserContext } from "../context";
import { GridText, MainHeader } from "../components";

function History({ navigation }: { navigation: any }) {
  useContext(UserContext);
  const { wordsHistory } = useContext(UserContext);

  return (
    <>
      <MainHeader label="Words history" />
      <GridText providedList={wordsHistory} />
    </>
  );
}

export default History;
