import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [number, setNumber] = useState("");
  const [btnWidth, setBtnWidth] = useState(Dimensions.get("window").width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setBtnWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const inputHandler = inputText => {
    // delete non-number values
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    Keyboard.dismiss();
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    Keyboard.dismiss();
    setConfirmed(true);
    setNumber(chosenNumber);
    setEnteredValue("");
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <View>
          <NumberContainer>{number}</NumberContainer>
          <MainButton title="start game" onPress={() => onStartGame(number)}>
            START GAME
          </MainButton>
        </View>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText style={styles.text}>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                value={enteredValue}
                onChangeText={inputHandler}
                maxLength={2}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: btnWidth }}>
                  <Button
                    color={colors.secondary}
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: btnWidth }}>
                  <Button
                    color={colors.primary}
                    title="Confirm"
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    justifyContent: "space-between"
  },
  button: {
    // width: "40%"
    // width: Dimensions.get("window").width / 4
  },
  input: {
    textAlign: "center",
    width: 50
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  text: {
    fontFamily: "open-sans"
  }
});

export default StartGameScreen;
