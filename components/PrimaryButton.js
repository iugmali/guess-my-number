import {Pressable, StyleSheet, Text, View} from "react-native";

const PrimaryButton = ({children, onPress}) => {
  return (
    <View style={styles.buttonOutercontainer}>
      <Pressable
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer}
        onPress={onPress}
        android_ripple={{color: '#73163b'}}
      >
          <Text style={styles.buttonText}>
            {children}
          </Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOutercontainer: {
    borderRadius: 28,
    margin: 4,
    elevation: 2,
    overflow: "hidden"
  },
  buttonInnerContainer: {
    backgroundColor: '#91204d',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
})
