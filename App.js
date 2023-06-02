import { StatusBar } from 'expo-status-bar';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import StartGameScreen from "./src/screens/StartGameScreen";
import {LinearGradient} from "expo-linear-gradient";
import {useCallback, useEffect, useState} from "react";
import GameScreen from "./src/screens/GameScreen";
import Colors from "./src/util/colors";
import GameOverScreen from "./src/screens/GameOverScreen";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';


export default function App() {
  const [userNumber, setUserNumber] = useState(0)
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  useEffect(() => {
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    }
    showSplashScreen();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  const gameOverHandler = (rounds) => {
    setGameIsOver(true)
    setGuessRounds(rounds)
  }

  const startNewGameHandler = () => {
    setUserNumber(0)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />
  if (userNumber) {
    screen = <GameScreen pickedNumber={userNumber} onGameOver={gameOverHandler} />
  }
  if (userNumber && gameIsOver) {
    screen = <GameOverScreen pickedNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
      <StatusBar style={"light"} />
      <LinearGradient style={styles.rootScreen} colors={[Colors.primary700,Colors.accent500]} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode={"cover"}
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
