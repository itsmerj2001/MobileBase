import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Alert } from 'react-native';
import React, { useState } from 'react'
import useForm from '../hooks/useForm';
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { ApiService } from '../services';
import formSchema from '../schemas/formSchema';

const ResetPassword = ({route,navigation}) => {

  const {values,handleChange,isFormValid,errors} = useForm({verified:false},formSchema.ResetPassword);
    const [secureEntry,setSecureEntry] = useState(true);
const handleSubmit = async()=>{
    console.log(route.params.userId);
    try {
        console.log(errors);
        if (await isFormValid()) {
                const result = await ApiService.resetPassword({...values,userId:route.params.userId});
                if(result.status)
                {
                  Alert.alert(
                    "Password Changed Successfully", 
                    "Your password has been changed successfully.", 
                    [
                      {
                        text: "OK", 
                        onPress: () => {
                          navigation.navigate('Login');
                        }
                      }
                    ],
                    { cancelable: false } 
                  );
                }
            }
      } catch (error) {
        console.log(error);
        alert(error.message || 'Something went wrong');
      }
}
  const handleGoBack = ()=>{
    navigation.goBack();
}
    console.log(route.params.userId);  
  return (
     <View style={styles.container}>
         <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
           <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25}/>
         </TouchableOpacity>
         <View style={styles.textContainer}>
           <Text style={styles.headingText}>Hey,</Text>
           <Text style={styles.headingText}>Welcome</Text>
           <Text style={styles.headingText}>Back</Text>
         </View>
         <View style={styles.formContainer}>
           <View style={styles.innerContainer}>
                      <Ionicons name={"key-outline"} size={25} color={colors.secondary}/>
                      <TextInput style={styles.textInput} placeholder='Enter Your Password' placeholderTextColor={colors.secondary} secureTextEntry={secureEntry} name="password" value={values.password} onChangeText={(text) => handleChange('password', text)} />
                      <TouchableOpacity onPress={()=>setSecureEntry((show)=>!show)}>
                      <Ionicons name={"eye-outline"} size={25} color={colors.secondary}/>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.innerContainer}>
                      <Ionicons name={"key-outline"} size={25} color={colors.secondary}/>
                      <TextInput style={styles.textInput} placeholder='Confirm Password' placeholderTextColor={colors.secondary} secureTextEntry={secureEntry} name="confirmPassword" value={values.confirmPassword} onChangeText={(text) => handleChange('confirmPassword', text)} />
                      <TouchableOpacity onPress={()=>setSecureEntry((show)=>!show)}>
                      <Ionicons name={"eye-outline"} size={25} color={colors.secondary}/>
                      </TouchableOpacity>
                  </View>
           <TouchableOpacity style={styles.loginButtonWrapper}>
               <Text style={styles.loginButtonText} onPress={handleSubmit}>Submit</Text>
           </TouchableOpacity>
   
           
         </View>
       </View>
  )
}

export default ResetPassword

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
      textInput:{
        flex:1,
        paddingHorizontal:10,
        fontFamily:fonts.Light
    },
     
})