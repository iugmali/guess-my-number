import {Alert, FlatList, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Title from "../components/ui/Title";
import {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons"
import GuessLogItem from "../components/game/GuessLogItem";

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
  const [guessRounds, setGuessRounds] = useState([initialGuess])

  const guessRoundsListLenght = guessRounds.length
  const {height} = useWindowDimensions()

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      onGameOver(guessRoundsListLenght)
    }
  }, [currentGuess, pickedNumber, onGameOver])

  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])

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
    setGuessRounds((prevState) => [newRandomNumber, ...prevState])
  }

  let content = (
    <>
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
    </>
  )

  if (height < 500) {
    content = (
      <View style={styles.buttonsContainerWide}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name={"md-remove"} size={24} color={"white"} />
          </PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
            <Ionicons name={"md-add"} size={24} color={"white"} />
          </PrimaryButton>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({item, index}) => <GuessLogItem roundNumber={guessRoundsListLenght - index} guess={item} />}
          keyExtractor={(item) => item}
          />
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center"
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainers: {
    flexDirection: "row"
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
})
