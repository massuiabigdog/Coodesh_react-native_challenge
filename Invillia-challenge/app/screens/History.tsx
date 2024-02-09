import React, { useContext, useEffect, useState } from "react";
import { IWord, UserContext } from "../context";
import { GridText, MainHeader } from "../components";

function History() {
  useContext(UserContext);
  const { historyData } = useContext(UserContext);
  const [historyList, setHistoryList] = useState<IWord[]>();

  useEffect(() => {
    setHistoryList(historyData);
   } ,[historyData]);

  return (
    <>
      <MainHeader label="Words history" />
      <GridText providedList={historyList} />
    </>
  );
}

export default History;
