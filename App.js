import { StatusBar } from 'expo-status-bar';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import StartGameScreen from "./screens/StartGameScreen";
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./util/colors";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

export default function App() {
  const [userNumber, setUserNumber] = useState(0)

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>
  if (userNumber) {
    screen = <GameScreen pickedNumber={userNumber} />
  }

  return (
    <LinearGradient style={styles.rootScreen} colors={[Colors.primary700,Colors.accent500]}>
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
