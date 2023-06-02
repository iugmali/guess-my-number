import {Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../util/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({roundsNumber, pickedNumber, onStartNewGame}) => {
  const {width, height} = useWindowDimensions()
  let imageSize = 300
  if (width < 380) {
    imageSize = 150
  }
  if (height < 500) {
    imageSize = 80
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.screen}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={require('../../assets/images/success.png')} />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlightedText}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlightedText}>{pickedNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  )
}

export default GameOverScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary700,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlightedText: {
    fontFamily: 'open-sans-bold'
  }
})
