import {Alert, StyleSheet, Text, View} from "react-native";
import Title from "../components/ui/Title";
import {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons"

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({pickedNumber, onGameOver}) => {
  const initialGuess = generateRandomBetween(1, 100, pickedNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      console.log(currentGuess)
      onGameOver()
    }
  }, [currentGuess, pickedNumber, onGameOver])

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < pickedNumber) ||
      (direction === 'higher' && currentGuess > pickedNumber)
    ) {
      Alert.alert("Come on!", "You're lying", [{text: 'Sorry', style: 'cancel'}])
      return
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }
    const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRandomNumber)

  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainers}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name={"md-remove"} size={24} color={"white"} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name={"md-add"} size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View></View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainers: {
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1
  }
})
