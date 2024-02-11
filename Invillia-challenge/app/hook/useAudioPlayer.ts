import { useState, useEffect } from "react";
import { Audio } from "expo-av";

interface IWord {
  phonetics: { audio?: string }[];
}

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [loadingAudio, setLoadingAudio] = useState(false);

  async function playSound(modalWord: IWord) {
    let soundUrl = "";
    (modalWord.phonetics as { audio?: string }[]).forEach((element) => {
      if (element?.audio) {
        soundUrl = element.audio;
      }
    });

    setLoadingAudio(true);
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: soundUrl },
      { shouldPlay: true }
    );

    setLoadingAudio(false);
    setSound(newSound);
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return { playSound, loadingAudio };
};
