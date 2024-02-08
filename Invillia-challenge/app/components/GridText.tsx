import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Modal, CloseIcon, Box, Button } from "native-base";
import { IWord, UserContext } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tts from "react-native-tts";
import { localStorageKeys } from "../utils";

const GridText = (props: {
  providedList: IWord[] | undefined;

}) => {
  const [data, setData] = useState<IWord[]>([]);
  const [favorites, setFavorites] = useState([] as any);

  const { addWord, removeWord, addFavorites } = useContext(UserContext);


  useContext(UserContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalWord, setModalWord] = useState([] as any);

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openModalWithParam = (word: any) => {
    setModalWord(word); // Define o título do modal com o parâmetro
    addWord(word);
    toggleModal(); // Abre o modal
  };

  const handleRemoveWord = (id: string, word: string) => {
    Alert.alert(word, "Deseja realmente excluir essa palavra", [
      {
        text: "Cancelar",
        onPress: () => {},
      },
      {
        text: "Excluir",
        onPress: () => removeWord(id),
      },
    ]);
  };

  return (
    <>
      <FlatList
        data={
          props.providedList ? [...props.providedList].reverse() : [...data].reverse()
        }
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => openModalWithParam(item)}
              onLongPress={() => handleRemoveWord(item.id, item.word)}
            >
              <Text style={styles.truncatedText}>{item.word}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Modal closeOnOverlayClick onClose={() => setModalVisible(false)} isOpen={isModalVisible}>
        <View style={styles.modalContent}>
          <Box marginLeft='auto'>
            <CloseIcon onPress={toggleModal} />
          </Box>
          <ScrollView style={styles.scrollView}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{modalWord.word}</Text>
              <Text style={styles.modalText}>
                {modalWord &&
                  modalWord.phonetics &&
                  modalWord.phonetics[0].text &&
                  modalWord.phonetics[0].text}
              </Text>
            </View>
            <View>
              <Text style={styles.meaningsTitle}>Meanings</Text>
              {modalWord &&
                modalWord.meanings &&
                modalWord.meanings[0].definitions.map((meaning: any) => (
                  <Text
                    style={styles.meaningsText}
                    key={`${modalWord.id}-${meaning.definition}`}
                  >
                    {meaning.definition}
                  </Text>
                ))}
              {/* <Button
                title="Reproduzir palavra"
                onPress={() => alert(modalWord.word)}
              /> */}
             <Button onPress={() => addFavorites(modalWord)}>Add to favorites</Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    margin: 0.5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  columnWrapper: {
    marginLeft: -5,
  },
  truncatedText: {
    fontSize: 18,
    maxWidth: "100%", // Define um tamanho máximo para o texto
    overflow: "hidden", // Esconde o texto que ultrapassar o tamanho máximo
  },
  scrollView: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    height: "70%",
  },
  modalContainer: {
    marginTop: 16,
    backgroundColor: "#efa8b4",
    padding: 16,
  },
  modalText: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 16,
  },

  meaningsTitle: {
    marginTop: 24,
    marginBottom: 16,
    fontSize: 30,
  },
  meaningsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  favorite: {
    marginTop: 16,
    backgroundColor: "#e3d925",
    fontSize: 18,
    textAlign: "center",
    color: "#902872",
    height: 30,
  },
});

export default GridText;
