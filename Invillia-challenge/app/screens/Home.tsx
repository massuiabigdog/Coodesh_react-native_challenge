import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Input, FormControl, Button, Spinner } from "native-base";
import { IWord, UserContext } from "../context";
import { GridText, MainHeader } from "../components";

import WordList from "../mockedData/wordList.json";

function Home() {
  const { loading, searchWord, addWord, newWords } = useContext(UserContext);

  const [word, setWord] = useState("");
  const [searchedWord, setSearchedWord] = useState<IWord>();
  const [errorAPI] = useState(null);
  const [list, setList] = useState<any>(WordList);
  useEffect(() => {
    setList([...WordList, ...newWords]);
  }, [newWords]);

  console.log(newWords, "newWords");
  const handleSearch = async (word: string) => {
    const response = await searchWord(word);
    if (response !== undefined && response !== searchedWord) {
      setSearchedWord(response);
    }
    setWord("");
  };

  return (
    <>
      <MainHeader label="Dictionary" />

      <Box flexDirection="row">
        <FormControl w="75%" maxW="300px">
          <Input
            onChangeText={setWord}
            value={word}
            editable={!loading}
            placeholder="Search word..."
          />
        </FormControl>
        <Button onPress={() => handleSearch(word)}>Search!</Button>
      </Box>

      {loading ? (
        <Spinner margin="auto" />
      ) : (
        <>
          {errorAPI ? (
            <Text>Error fetching data. Please try again later.</Text>
          ) : (
            <GridText selectedWord={searchedWord} providedList={list} />
          )}
        </>
      )}
    </>
  );
}

export default Home;
