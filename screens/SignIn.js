// SignIn.js
import React from "react";
import { useForm } from 'react-hook-form';

import { ScrollView, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/header";
import EmailInput from "../components/emailInput";
import PasswordInput from "../components/passwordInput";
import Forgettable from "../components/greenPressable";
import StickyButton from "../components/greenButton";

export default function SignIn() {
    const { control, handleSubmit } = useForm();
    const navigation = useNavigation();

    const onSubmit = data => {
        console.log('Form Data:', data);
        // Sign-in logic goes here
    };

  return (
    <>
            <ScrollView>
                <Header title="Sign in to Rewards" iconName="close" functionHandler={() => navigation.goBack()} />
                <View style={styles.inputContainer}>
                    <EmailInput control={control} name="email" title="Email" />
                    <PasswordInput control={control} name="password" title="Password" mainIcon="visibility-off" secondaryIcon="visibility" />
                </View>
                <View style={styles.forgettableContainer}>
                    <Forgettable title="Forgot password?" />
                    <Forgettable title="Forgot username?" />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <StickyButton title={"Sign in"} onPress={handleSubmit(onSubmit)} />
            </View>
        </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "hsl(0, 0%, 97.5%)",
      alignItems: "center",
    },
    inputContainer: {
      padding: 25,
    },
    inputLine: {},
    forgettableContainer: {
      padding: 25,
      paddingTop: 30,
  
      alignItems: "flex-start",
      justifyContent: "space-between",
      width: 200,
      height: 120,
    },
    forgettableLines: {
      marginBottom: 10,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 50,
      right: 15,
    },
  });
  