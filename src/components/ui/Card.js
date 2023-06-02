import {Dimensions, StyleSheet, View} from "react-native";
import Colors from "../../util/colors";

const Card = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: "center",
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: deviceWidth < 380 ? 18 : 36,
    backgroundColor: Colors.primary700,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25
  }
})
