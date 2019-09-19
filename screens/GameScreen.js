import React, { useState, useRef, useEffect } from "react";
import { View, Dimensions, StyleSheet, ScrollView, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";

import { Octicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

const renderListItem = (guess, numOfRound) => (
  <View key={guess} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{guess}</BodyText>
  </View>
);

const generateNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateNumber(1, 100, userChoice);
  const [guess, setGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  useEffect(() => {
    if (guess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [guess, userChoice, onGameOver]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const triggerGuess = direction => {
    if (
      (direction === "lower" && guess < userChoice) ||
      (direction === "greater" && guess > userChoice)
    ) {
      Alert.alert(`Please, don't cheat!`, "Hint provided is false!", [
        { text: "Shame on me", style: "cancel" }
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = guess;
    } else {
      currentLow.current = guess + 1;
    }

    const nextGuess = generateNumber(
      currentLow.current,
      currentHigh.current,
      guess
    );
    setGuess(nextGuess);
    // console.log("Setting guess with these previous guesses: ", pastGuesses);
    setPastGuesses(prevGuesses => [nextGuess, ...prevGuesses]);
  };

  return (
    <View style={styles.screen}>
      <TitleText>Phone's guess</TitleText>
      <NumberContainer>{guess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={triggerGuess.bind(this, "lower")}>
          <Octicons
            name="arrow-down"
            size={Dimensions.get("window").height > 600 ? 30 : 20}
            color="#fff"
          />
        </MainButton>
        <MainButton onPress={triggerGuess.bind(this, "greater")}>
          <Octicons
            name="arrow-up"
            size={Dimensions.get("window").height > 600 ? 30 : 15}
            color="#fff"
          />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) =>
            renderListItem(guess, pastGuesses.length - i)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "90%"
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "60%" : "70%"
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  listItem: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    width: "60%",
    backgroundColor: "#fff"
  }
});

export default GameScreen;
