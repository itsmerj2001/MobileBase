import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import useForm from '../hooks/useForm';
import formSchema from '../schemas/formSchema';
import { ApiService } from '../services';

const SignupScreen = ({navigation}) => {
     const {values, handleChange, isFormValid ,errors} = useForm({},formSchema.register);
     const [secureEntry,setSecureEntry] = useState(true);
    
        const Navigator = useNavigation();

        const handleSubmit = async ()=>{
            console.log(values);
        try{
            if(await isFormValid())
            {
                console.log(values);
                const result = await ApiService.register(values);
                if(result && result.status ==="success")
                {
                    Alert.alert(
                        "Account Pending Approval", 
                        "You can use the app once the admin approves your account.", 
                        [{ text: "OK" ,
                            onPress:()=>{
                                navigation.navigate("Login");
                            }
                        }] 
                    );
                }
                else{
                    Alert.alert("Registration Failed", "Something went wrong. Please try again.");
                }
            }

        }
        catch(err){
            console.log(err);
            alert(err.message || 'Something went wrong');
        }

        }
    
        const handleGoBack = ()=>{
            Navigator.goBack();
        }
        const handleLogin = ()=>{
            Navigator.navigate("Login");
        }
        const handleForgotPassword = ()=>{
            Navigator.navigate("ForgotPassword")
        }

  return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
            <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25}/>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.headingText}>Let's get ,</Text>
            <Text style={styles.headingText}>Started</Text>
          </View>
          <View style={styles.formContainer}>
          <View style={styles.innerContainer}>
                <EvilIcons name={"user"} size={30} color={colors.secondary} style={{marginTop:-10}}/>
                <TextInput style={styles.textInput} placeholder='Enter Your Name' placeholderTextColor={colors.secondary} value={values.name} onChangeText={(text)=>handleChange("name",text)} keyboardType='email-address' />
            </View>
            <View style={styles.innerContainer}>
                <Ionicons name={"mail-outline"} size={25} color={colors.secondary} style={{marginTop:-5}}/>
                <TextInput style={styles.textInput} placeholder='Enter Your Email' placeholderTextColor={colors.secondary} keyboardType='email-address' value={values.email} onChangeText={(text)=>handleChange("email",text)} />
            </View>
            <View style={styles.innerContainer}>
                <Ionicons name={"key-outline"} size={25} color={colors.secondary} style={{marginTop:-5}}/>
                <TextInput style={styles.textInput} placeholder='Enter Your Password' placeholderTextColor={colors.secondary} secureTextEntry={secureEntry} value={values.password} onChangeText={(text)=>handleChange("password",text)}/>
                <TouchableOpacity onPress={()=>setSecureEntry((show)=>!show)}>
                <Ionicons name={"eye-outline"} size={25} color={colors.secondary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
                <Ionicons name={"key-outline"} size={25} color={colors.secondary} style={{marginTop:-5}}/>
                <TextInput style={styles.textInput} placeholder='Confirm Password' placeholderTextColor={colors.secondary} secureTextEntry={secureEntry} value={values.passwordConfirm} onChangeText={(text)=>handleChange("passwordConfirm",text)}/>
                <TouchableOpacity onPress={()=>setSecureEntry((show)=>!show)}>
                <Ionicons name={"eye-outline"} size={25} color={colors.secondary}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotPasswordWrapper} onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword} color={colors.gray}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Signup</Text>
            </TouchableOpacity>
            <Text style={styles.continueText}>or continue with</Text>
            <TouchableOpacity style={styles.googleButtonWrapper}>
                <Ionicons name={"logo-google"} size={25} style={{marginTop:-3}}/>
                <Text style={styles.googleText}>Google</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
                <Text style={styles.accountText}> ALready have an account !</Text>
               <TouchableOpacity>
               <Text style={styles.signupText} onPress={handleLogin}>Login </Text>
                </TouchableOpacity> 
            </View>
    
          </View>
        </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        padding:20
    },
    backButtonWrapper:{
        height:40,
        width:40,
        backgroundColor:colors.gray,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    textContainer:{
        marginVertical:20,
    },
    headingText:{
        fontSize:32,
        color:colors.primary,
        fontFamily:fonts.SemiBold
    },
    formContainer:{
        marginTop:20,
    },
    innerContainer:{
        borderWidth:1,
        borderRadius:100,
        borderColor:colors.primary,
        paddingHorizontal:20,
        alignItems:"center",
        flexDirection:"row",
        padding:3,
        marginVertical:15

    },
    textInput:{
        flex:1,
        paddingHorizontal:10,
        fontFamily:fonts.Light
    },
    forgotPasswordWrapper:{
       
    },
    forgotPassword:{
        textAlign:"right",
        color:colors.primary,
        fontFamily:fonts.SemiBold,
        marginVertical:10,
    },
    loginButtonWrapper:{
        backgroundColor:colors.primary,
        borderRadius:100,
        marginTop:20
    },
    loginButtonText:{
        color:colors.white,
        fontFamily:fonts.SemiBold,
        fontSize:20,
        textAlign:"center",
        padding:10
    },
    continueText:{
        fontFamily:fonts.Regular,
        textAlign:"center",
        marginVertical:20,
        fontSize:14,
        color:colors.primary
    },
    googleButtonWrapper:{
        borderWidth:2,
        borderRadius:100,
        borderColor:colors.primary,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        padding:10
    },
    googleText:{
        marginHorizontal:5,
        fontFamily:fonts.SemiBold,
        fontSize:20,
       
    },
    footerContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:20,
        gap:2,

    },
    accountText:{
        fontFamily:fonts.Regular,
        color:colors.primary,
    },
    signupText:{
        fontFamily:fonts.Bold,
        color:colors.primary,
    }

    
})