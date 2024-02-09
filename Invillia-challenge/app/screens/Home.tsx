import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Input, FormControl, Button, Spinner } from "native-base";
import { IWord, UserContext } from "../context";
import { GridText, MainHeader } from "../components";

import WordList from "../mockedData/wordList.json";

function Home() {
  const { loading, searchWord, newWords } = useContext(UserContext);

  const [word, setWord] = useState("");
  const [searchedWord, setSearchedWord] = useState<IWord>();
  const [errorAPI] = useState(null);
  const [list, setList] = useState<any>(WordList);
  useEffect(() => {
    setList([ ...newWords, ...WordList]);
  }, [newWords]);

  const handleSearch = async (word: string) => {
    const response = await searchWord(word);
    if (response !== undefined && response !== searchedWord) {
      setSearchedWord(response);
      setWord("");
    }
    return 
  };

  return (
    <>
      <MainHeader label="Dictionary" />

      <Box bg='blue.200' padding={3} marginBottom={4} flexDirection="row" >
        <FormControl marginRight={2} maxW="300px" >
          <Input
          marginTop='2px'
          bgColor={'white'}
          size='lg'
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
            <GridText clearSearch={() => setSearchedWord(undefined)} selectedWord={searchedWord} providedList={list} />
          )}
        </>
      )}
    </>
  );
}

export default Home;
