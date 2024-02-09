import React, { useState, useEffect, useContext } from "react";
import { FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Modal, Box, Button, Text, Spinner, Badge } from "native-base";
import { IWord, UserContext } from "../context";
import { useAudioPlayer } from "../hook/useAudioPlayer";

const GridText = (props: {
  providedList: IWord[] | undefined;
  selectedWord?: IWord | undefined;
  clearSearch?: () => void;
}) => {
  const { addWord, handleFavorites, favoritesWords } = useContext(UserContext);

  const { playSound, loadingAudio } = useAudioPlayer();

  const [modalWord, setModalWord] = useState(false as any);
  const [showModal, setShowModal] = useState(false as any);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!!props.selectedWord && props.selectedWord !== modalWord) {
      setModalWord(props.selectedWord);
      setShowModal(true);
    }
  }, [props.selectedWord]);

  useEffect(() => {
    const isFav = favoritesWords.find((word) => word.word === modalWord?.word);
    setIsFav(isFav?.word === modalWord?.word);
  }, [favoritesWords]);

  const openModalWithParam = (word: any) => {
    addWord(word);
    setModalWord(word);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    props.clearSearch && props.clearSearch();
  };

  return (
    <>
      {props.providedList?.length === 0 && (
        <Box height='100%'>
          <Text textAlign="center" margin="auto">
            No words here yet!
          </Text>
        </Box>
      )}
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
                <Badge
                  colorScheme="info"
                  size="lg"
                  w="100%"
                  variant="outline"
                  alignSelf="center"
                >
                  {item.word.charAt(0).toUpperCase() + item.word.slice(1)}
                </Badge>
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
          <Modal.CloseButton />
          <Modal.Header>{modalWord?.word?.toUpperCase()}</Modal.Header>
          <Modal.Body>
            <ScrollView style={{ flex: 1 }}>
              <Box backgroundColor="blue.300" padding={2}>
                <Text fontSize="lg" bold textAlign="center">
                  {modalWord &&
                    modalWord.phonetics &&
                    modalWord.phonetics[0].text &&
                    modalWord.phonetics[0].text}
                </Text>
              </Box>
              <Box>
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
                <Button onPress={() => handleFavorites(modalWord)}>
                  {`${isFav ? "Remove from" : "Add to"} favorites`}
                </Button>
                <Button
                  marginTop={4}
                  variant="outline"
                  onPress={() => playSound(modalWord)}
                >
                  {loadingAudio ? <Spinner /> : "Play the word"}
                </Button>
              </Box>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default GridText;
