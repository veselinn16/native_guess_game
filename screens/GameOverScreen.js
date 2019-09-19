import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";

const GameOverScreen = ({ rounds, number, onRestart }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            // for web images
            // source={{
            //   uri:
            //     "https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg"
            // }}
            style={styles.image}
            resizeMode="cover"
            // for local images
            source={require("../assets/success.png")}
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed <Text style={styles.highlight}>{rounds}</Text>{" "}
            rounds to guess the number{" "}
            <Text style={styles.highlight}>{number}</Text>
          </BodyText>
        </View>
        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    // should be width, no matter that we're setting a height
    height: Dimensions.get("window").width * 0.7,
    marginVertical: Dimensions.get("window").height / 25,
    // should be half of dimensions -> 0.7 / 2 = 0.35
    borderRadius: Dimensions.get("window").width * 0.35,
    borderWidth: 3,
    borderColor: "#000",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 35
  },
  resultText: {
    textAlign: "center"
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold"
  }
});

export default GameOverScreen;
