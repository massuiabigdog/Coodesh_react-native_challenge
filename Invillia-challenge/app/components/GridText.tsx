import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Modal, CloseIcon, Box, Button, Text } from "native-base";
import { IWord, UserContext } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tts from "react-native-tts";
import { localStorageKeys } from "../utils";

const GridText = (props: {
  providedList: IWord[] | undefined;
  selectedWord?: IWord | undefined;
  clearSearch?: () => void;
}) => {

  const { addWord, removeWord, addFavorites, favoritesWords } =
    useContext(UserContext);

  useContext(UserContext);

  const [modalWord, setModalWord] = useState(false as any);
  const [showModal, setShowModal] = useState(false as any);
  const [isFav, setIsFav] = useState(false);

  console.log(modalWord, "modalWord")

  useEffect(() => {
    if (!!props.selectedWord && props.selectedWord !== modalWord) {
      setModalWord(props.selectedWord);
      setShowModal(true);
    }
  }, [props.selectedWord]);

  // useEffect(() => {
  //   setIsFav(selectedWorkIsFavorite(props.selectedWord));
  // }, [favoritesWords]);

  // useEffect(() => {
  //   async function loadWords() {
  //     const providedList = await AsyncStorage.getItem(localStorageKeys.storeWord);
  //     const favoritWords = await AsyncStorage.getItem(
  //       localStorageKeys.favoriteWords
  //     );

  //     if (providedList) {
  //       setData(JSON.parse(providedList));
  //     }
  //     if (favoritWords) {
  //       setFavorites(JSON.parse(favoritWords));
  //     }
  //   }
  //   Tts.setDefaultRate(0.5); // Velocidade da fala (0.5 é metade da velocidade normal)
  //   Tts.setDefaultPitch(1.0); // Tom da voz (1.0 é o tom padrão)
  //   loadWords();
  // }, [words, favorites]);

  const openModalWithParam = (word: any) => {
    addWord(word);
    setModalWord(word);
    setShowModal(true);
  };

  const closeModal = () => { 
    setShowModal(false);
    props.clearSearch && props.clearSearch()
  }


  return (
    <>
      <FlatList
        data={props.providedList}
        numColumns={3}
        renderItem={({ item }) => (
          <Box
            textAlign="center"
            margin={2}
            flex={1}
            justifyContent="space-around"
          >
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => openModalWithParam(item)}
            >
              <Box textAlign="center">
                <Text textAlign="center">{item.word}</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        )}
        keyExtractor={(item, index) => `${item.id}_${item.word}_${index}`}
        onEndReachedThreshold={0.1}
      />
      <Modal
        closeOnOverlayClick
        onClose={() => closeModal()}
        isOpen={showModal}
        size="lg"
      >
        <Modal.Content>
          <Modal.Body>
            <Modal.CloseButton />
            <Modal.Header />
            <ScrollView style={{ flex: 1 }}>
              <Box backgroundColor="blue.300" marginTop={4} padding={2}>
                <Text fontSize="lg" textAlign="center" bold>
                  {modalWord.word}
                </Text>
                <Text fontSize="sm" textAlign="center">
                  {modalWord &&
                    modalWord.phonetics &&
                    modalWord.phonetics[0].text &&
                    modalWord.phonetics[0].text}
                </Text>
              </Box>
              <View>
                <Text bold fontSize="lg" marginBottom={1} marginTop={4}>
                  Meanings
                </Text>
                {modalWord &&
                  modalWord.meanings &&
                  modalWord.meanings[0].definitions.map((meaning: any) => (
                    <Text
                      fontSize="sm"
                      marginBottom={4}
                      key={`${modalWord.id}-${meaning.definition}`}
                    >
                      {meaning.definition}
                    </Text>
                  ))}
                <Button onPress={() => addFavorites(modalWord)}>
                  {isFav ? "remove from" : "Add to"}
                  favorites
                </Button>
              </View>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default GridText;
