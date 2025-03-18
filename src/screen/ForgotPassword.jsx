import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { ApiService } from '../services';
import useForm from '../hooks/useForm';
import formSchema from '../schemas/formSchema';
import ResetPassword from './ResetPassword';

const ForgotPassword = ({ navigation }) => {
    console.log(navigation)
    const { values, handleChange, updateField, isFormValid, errors } = useForm({ verified: false }, formSchema.ForgotPassword);
    const [otpMessage, setOtpMessage] = useState('');
    const handleSubmit = async () => {
        console.log(values);
        try {
            console.log(errors);
            if (await isFormValid()) {
                if (!values.verified) {
                    setOtpMessage('Please wait, the OTP is being sent to your email...');
                    const result = await ApiService.forgotPassword(values);
                    console.log(result);
                    updateField({ verified: true });
                    setTimeout(() => setOtpMessage(''), 3000);
                }
                if (values.verified && values.otp) {
                    const result = await ApiService.forgotPassword(values);
                    console.log(result.user);
                    if (result.status) {
                        navigation.navigate('ResetPassword', { userId: result.user });
                    }
                }

            }
        } catch (error) {
            console.log(error);
            alert(error.message || 'Something went wrong');
        }
    }

    const handleGoBack = () => {
        navigation.goBack();
    }
    const handleSignup = () => {
        navigation.navigate("Signup");
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
                {values.verified && (
                    <View style={styles.innerContainer}>
                        <Ionicons name={"key"} size={25} color={colors.secondary} />
                        <TextInput style={styles.textInput} placeholder='Enter OTP' placeholderTextColor={colors.secondary} name="otp" value={values.otp} onChangeText={(text) => handleChange('otp', text)} />
                    </View>)}
                <TouchableOpacity style={styles.loginButtonWrapper}>
                    <Text style={styles.loginButtonText} onPress={handleSubmit}>Submit</Text>
                </TouchableOpacity>

                {otpMessage ? (
                    <Text style={styles.otpMessage}>{otpMessage}</Text>
                ) : null}
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

export default ForgotPassword

const styles = StyleSheet.create({
    otpMessage: {
        color: '#007BFF',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
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