import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'

const Homescreen = () => {
  const Navigator = useNavigation();

  const handleLogin = ()=>{
    Navigator.navigate("Login");
  }
  const handleSignup = ()=>{
    Navigator.navigate("Signup");
  }
  return (
    <View style= {styles.container}>
      <Image source={require("../assets/ppts-mobile-logo.png")} style={styles.logo}/> 
      <Image source={require("../assets/login-Img.png")} style={styles.BannerImg}/>
      <Text style={styles.title}>Lorem ipsum dolar</Text>
      <Text style={styles.subTitle}>Lorem ipsum dolor sit amet. Qui tempora omnis ut pariatur eius sed galisum nemo ut dolores animi.Non consequatur veniam sed dolor harum </Text>      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButtonWrapper,{backgroundColor:colors.primary}]} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        alignItems:"center"
    },
    logo:{
        width:80,
        height:90,
        resizeMode:"contain",
        marginVertical:20,
    },
    BannerImg:{
        width:390,
        height:260,
        resizeMode:"contain",
        marginTop:15,
    },
    title:{
        fontSize:40,
        lineHeight:50,
        fontFamily:fonts.SemiBold,
        textAlign:"center",
        paddingHorizontal:20,
        color:colors.primary,
        marginTop:20,
    },
    subTitle:{
      fontSize:18,
      textAlign:"center",
      fontFamily:fonts.Medium,
      paddingHorizontal:20,
      marginVertical:20,
      color:colors.secondary
    },
    buttonContainer:{
      flexDirection:"row",
      marginTop:20,
      borderWidth:1,
      borderRadius:100,
      borderColor:colors.primary,
      width:"80%",
      height:60
    },
    loginButtonWrapper:{
      alignItems:"center",
      justifyContent:"center",
      borderRadius:100,
      width:"50%",
    },
    loginButtonText:{
      color:colors.white,
      fontFamily:fonts.SemiBold,
      fontSize:18,
    },
    signupButtonText:{
      fontSize:18,
      fontFamily:fonts.SemiBold,

    }





})