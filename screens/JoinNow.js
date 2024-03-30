// JoinNow.js

import React, { useState } from "react";

import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import Section from "../components/sectionHeader";
import GreenText from "../components/greenPressable";
import GreenButton from "../components/greenButton";
import IconSwitch from "../components/switchingIcons";
import CheckBox from "../components/checkbox";
import FirstNameInput from "../components/fNameInput";
import LastNameInput from "../components/lNameInput";
import EmailInput from "../components/emailInput";
import PasswordInput from "../components/passwordInput";


import config from "../config";

export default function JoinNow() {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isFasterSelected, setIsFasterSelected] = useState(false);
  const [isTermsSelected, setIsTermsSelected] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await fetch(`${config.apiEndpoint}/users/create`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed in JoinNow.java file');
      }

      const responseData = await response.json();
      console.log("User created successfully:", responseData);

      // Navigate to main page or show success message
      navigation.navigate('Main');
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (show error message)
    }
  };

  return (
  <View style={styles.background}>
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.headerContainer}> */}
        <AntDesign
          name="close"
          size={25}
          color="grey"
          style={styles.iconButton}
          onPress={() => navigation.navigate("Landing")}
        />
        <Text style={styles.header}>Sign up</Text>
        {/* </View> */}

        {/* PERSONAL INFO SECTION BEGINS */}
        <Section title={"Personal info"} style={styles.sections} />

        <View style={styles.inputContainer}>
          <FirstNameInput
            control={control}
            name="given_name"
            title="First name"
          />
          <LastNameInput
            control={control}
            name="family_name"
            title="Last name"
          />
        </View>

        <View style={styles.giftcardContainer}>
          <GreenText
            title="Have a Starbucks gift card? (optional)"
            style={styles.greenLines}
          />
          <IconSwitch primaryIcon="down" secondaryIcon="up" />
        </View>
        {/* PERSONAL INFO SECTION ENDS */}

        {/* SECURITY SECTION BEGINS */}
        <Section title={"Security"} style={styles.sections} />

        <View style={styles.inputContainer}>
          <EmailInput control={control} name="email" title="Email" />
          <PasswordInput
            control={control}
            name="password"
            title="Password"
            mainIcon={"visibility-off"}
            secondaryIcon={"visibility"}
          />
        </View>

        {/* SECURITY SECTION ENDS */}

        {/* TERMS SECTION BEGINS */}
        <View style={styles.termsContainer}>
          <Section title={"Terms"} style={styles.sections} />

          {/* CHECKBOXES BEGIN */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              text="Yes, I'd like emails from Starbucks (optional)"
              caption="Know about product offers, 
                        announcements, and initiatives."
              isChecked={isEmailSelected}
              onPress={() => setIsEmailSelected(!isEmailSelected)}
              style={styles.checkbox}
            />
            <CheckBox
              text="I'd like to sign in faster (optional)"
              caption="Use Face ID and iCloud Keychain to sign in, authorize 
                        purchases, preloads, and more."
              isChecked={isFasterSelected}
              onPress={() => setIsFasterSelected(!isFasterSelected)}
              style={styles.checkbox}
            />
            <CheckBox
              text="I accept the Terms of Use"
              caption="By joining, I agree to Starbucks Rewards Terms, 
                        Starbucks Card Terms, the Aplication Terms, and have 
                        read the iOS Privacy Statement"
              isChecked={isTermsSelected}
              onPress={() => setIsTermsSelected(!isTermsSelected)}
              style={styles.checkbox}
            />
          </View>
          {/* CHECKBOXES END */}

          {/* GREEN LINES BEGIN */}
          <View style={styles.greenContainer}>
            <GreenText title="Rewards Terms" style={styles.greenLines} />
            <GreenText title="Application Terms" style={styles.greenLines} />
            <GreenText title="Card Terms" style={styles.greenLines} />
            <GreenText title="Privacy Statement" style={styles.greenLines} />
          </View>
          {/* GREEN LINES END */}
        </View>

        {/* GREEN SUBMISSION BUTTON BEGINS */}
        <View style={styles.greenButtonContainer}>
          <GreenButton
            title="Create Account"
            functionHandler={handleSubmit(onSubmit)}
          />
        </View>
        {/* GREEN SUBMISSION BUTTON ENDS */}

        {/* TERMS SECTION ENDS */}
      </View>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
  },
  container: {
    width: "100%",
    height: "100%",
    marginTop: 75,
    padding: 20,
  },
  headerContainer: {
    width: "100%",
    paddingBottom: 10,

    borderBottomColor: "hsla(0, 0%, 50%, 0.5)",
    borderBottomWidth: 1.5,
  },
  iconButton: {
    position: "absolute",
    top: 0,
    right: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "600",
    paddingBottom: 10,
  },
  sections: {
    paddingTop: 0,
  },
  inputContainer: {
    paddingVertical: 15,
    justifyContent: "space-between",
    height: 140,
  },
  inputLine: {
    paddingVertical: 10,
    paddingBottom: 15,
  },
  giftcardContainer: {
    flexDirection: "row",
    paddingBottom: 30,
  },
  termsContainer: {
    paddingTop: 15,
  },
  checkboxContainer: {
    paddingTop: 20,
    justifyContent: "space-between",
    height: 300,
    paddingBottom: 30,
  },
  checkbox: {},
  greenContainer: {
    paddingHorizontal: 40,
    justifyContent: "space-between",
    height: 160,
    marginBottom: 100,
  },
  greenLines: {},
  greenButtonContainer: {
    position: "absolute",
    bottom: 100,
    width: 200,
    right: 20,
  },
  greenButton: {},
});
