import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { ApiService } from '../services';
import useForm from '../hooks/useForm';
import formSchema from '../schemas/formSchema';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
    const { values, handleChange, isFormValid, errors } = useForm({}, formSchema.login);
    const [secureEntry, setSecureEntry] = useState(true);
    const handleSubmit = async () => {
        console.log(errors)
        try {
            if (await isFormValid()) {
                const result = await ApiService.login(values);

                if (result && result.token) {
                    console.log(result);
                    await AsyncStorage.setItem('token', result.token);
                    console.log("token stored successfully");
                    if (result.userRole === "admin") {
                        Navigator.navigate("UserList");
                    } else {
                        Navigator.navigate("UserProfile");
                    }
                }

            }
        } catch (error) {
            console.log(error);
            alert(error.message || 'Something went wrong');
        }
    }

    const Navigator = useNavigation();

    const handleGoBack = () => {
        Navigator.goBack();
    }
    const handleSignup = () => {
        Navigator.navigate("Signup");
    }
    const handleForgotPassword = () => {
        Navigator.navigate("ForgotPassword")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
                <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Hey,</Text>
                <Text style={styles.headingText}>Welcome</Text>
                <Text style={styles.headingText}>Back</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.innerContainer}>
                    <Ionicons name={"mail-outline"} size={25} color={colors.secondary} />
                    <TextInput style={styles.textInput} placeholder='Enter Your Email' placeholderTextColor={colors.secondary} keyboardType='email-address' name="email" value={values.email} onChangeText={(text) => handleChange('email', text)} />
                </View>
                <View style={styles.innerContainer}>
                    <Ionicons name={"key-outline"} size={25} color={colors.secondary} />
                    <TextInput style={styles.textInput} placeholder='Enter Your Password' placeholderTextColor={colors.secondary} secureTextEntry={secureEntry} name="password" value={values.password} onChangeText={(text) => handleChange('password', text)} />
                    <TouchableOpacity onPress={() => setSecureEntry((show) => !show)}>
                        <Ionicons name={"eye-outline"} size={25} color={colors.secondary} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.forgotPasswordWrapper} onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword} color={colors.gray}>Forgot Password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButtonWrapper}>
                    <Text style={styles.loginButtonText} onPress={handleSubmit}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.continueText}>or continue with</Text>
                <TouchableOpacity style={styles.googleButtonWrapper}>
                    <Ionicons name={"logo-google"} size={25} style={{ marginTop: -3 }} />
                    <Text style={styles.googleText}>Google</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}> Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signupText} onPress={handleSignup}>Signup</Text>

                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20
    },
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: colors.gray,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        marginVertical: 20,
    },
    headingText: {
        fontSize: 32,
        color: colors.primary,
        fontFamily: fonts.SemiBold
    },
    formContainer: {
        marginTop: 20,
    },
    innerContainer: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: colors.primary,
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        padding: 3,
        marginVertical: 15

    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: fonts.Light
    },
    forgotPasswordWrapper: {

    },
    forgotPassword: {
        textAlign: "right",
        color: colors.primary,
        fontFamily: fonts.SemiBold,
        marginVertical: 10,
    },
    loginButtonWrapper: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        marginTop: 20
    },
    loginButtonText: {
        color: colors.white,
        fontFamily: fonts.SemiBold,
        fontSize: 20,
        textAlign: "center",
        padding: 10
    },
    continueText: {
        fontFamily: fonts.Regular,
        textAlign: "center",
        marginVertical: 20,
        fontSize: 14,
        color: colors.primary
    },
    googleButtonWrapper: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    googleText: {
        marginHorizontal: 5,
        fontFamily: fonts.SemiBold,
        fontSize: 20,

    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 2,

    },
    accountText: {
        fontFamily: fonts.Regular,
        color: colors.primary,
    },
    signupText: {
        fontFamily: fonts.Bold,
        color: colors.primary,
    }


})