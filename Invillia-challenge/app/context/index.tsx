import { Box, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorageKeys } from "../utils";

export const UserContext = React.createContext({} as IWordsContext);

export interface IWord {
  id: string;
  word: string;
  phonetics: [];
  meanings: [];
}

export interface IWordsContext {
  addWord(word: IWord): void;
  newWords: IWord[];
  historyData: IWord[];
  removeWord(id: string): void;
  removeAllWords(): void;
  searchWord(word: string): void;
  addFavorites(favoriteItem: any): void;
  loading: boolean;
  favoritesWords: IWord[];
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  const [data, setData] = useState<IWord[]>([]);
  const [storeData, setStoreData] = useState<IWord[]>([]);
  const [historyData, setHistoryData] = useState<IWord[]>([]);

  const favoritesFromStorage = async () => {
    const favList = await AsyncStorage.getItem(localStorageKeys.favoriteWords);
    const storeList = await AsyncStorage.getItem(localStorageKeys.storeWord);
    const historyList = await AsyncStorage.getItem(localStorageKeys.historyWords);
    if (favList) {
      setFavorites(JSON.parse(favList));
    }
    if (storeList) {
      setData(JSON.parse(storeList));
    }
    if (historyList) {
      setHistoryData(JSON.parse(historyList));
    }
  };

  useEffect(() => {
    favoritesFromStorage();
  }, []);

  const [favorites, setFavorites] = useState<IWord[]>([]);
  const [loading, setLoading] = useState(false);

  const triggerToast = (message: string, isFail?: boolean) =>
    toast.show({
      render: () => {
        return (
          <Box
            zIndex={2}
            bg={`${isFail ? "red" : "green"}.500`}
            px="2"
            py="1"
            rounded="sm"
            mb={5}
          >
            {message}
          </Box>
        );
      },
    });

  const userContextValue: IWordsContext = {
    historyData,
    loading,
    favoritesWords: favorites,
    newWords: storeData,
    addWord: async (word: IWord) => {
      try {
        const checkRepeatedWord = historyData?.filter(
          (wordRepeated: IWord) =>
            wordRepeated.word.toLowerCase() === word.word.toLowerCase()
        );
        if (checkRepeatedWord?.length > 0) return;
        const newWord = [...historyData, word];
        setHistoryData(newWord);
        await AsyncStorage.setItem(
          localStorageKeys.historyWords,
          JSON.stringify(newWord)
        );
      } catch (error) {
        throw new Error("An error occurred while saving word");
      }
    },
    removeWord: async (id: string) => {
      try {
        const wordList = data.filter((word: any) => word.id !== id);
        setData(wordList);
        await AsyncStorage.setItem(
          localStorageKeys.storeWord,
          JSON.stringify(wordList)
        );
        triggerToast("Word removed!");
      } catch (error) {
        console.log("Error removing word", error);
      }
    },
    removeAllWords: async () => {
      try {
        await AsyncStorage.setItem(
          localStorageKeys.storeWord,
          JSON.stringify([])
        );
        setData([]);
        triggerToast("All words removed!");
      } catch (error) {
        console.log("Error removing all list", error);
      }
    },
    searchWord: async (word: string) => {
      try {
        const itemsInCache = await AsyncStorage.getItem(
          localStorageKeys.storeWord
        ).then((res: any) => JSON.parse(res));

        const checkRepeatedWord = itemsInCache?.filter(
          (wordRepeated: IWord) =>
            wordRepeated?.word?.toLowerCase() === word?.toLowerCase()
        );
        if (checkRepeatedWord?.length > 0) return checkRepeatedWord[0];
        setLoading(true);
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
        );
        setLoading(false);
        if (!response.ok) {
          throw new Error("Word not found");
        }
        const data = await response.json();
        if (data?.length) {
          const newWord = [...data, word];
          setStoreData([...storeData, newWord[0]]);
          await AsyncStorage.setItem(
            localStorageKeys.storeWord,
            JSON.stringify([...storeData, newWord[0]])
          );
        }
        return data[0];
      } catch (error: any) {
        console.log(error.message);
        triggerToast("Definition not found", true);
      }
    },
    addFavorites: async (favoriteItem: any) => {
      try {
        const checkRepeatedWord = favorites?.filter(
          (wordRepeated: IWord) =>
            wordRepeated.word.toLowerCase() === favoriteItem.word.toLowerCase()
        );
        if (checkRepeatedWord?.length > 0) {
          const wordList = data?.filter(
            (word: any) => word.id !== favoriteItem.id
          );
          setData(wordList);
          await AsyncStorage.setItem(
            localStorageKeys.storeWord,
            JSON.stringify(wordList)
          );
          triggerToast("Word removed!");
          return;
        }
        const newWord = [...favorites, favoriteItem];
        setFavorites(newWord);
        await AsyncStorage.setItem(
          localStorageKeys.favoriteWords,
          JSON.stringify(newWord)
        );
        triggerToast("Word added to favorites!");
      } catch (error) {
        console.log("error saving word", error as string);
        throw new Error("An error occurred while saving word");
      }
    },
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
