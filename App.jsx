import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import ForgotPassword from './src/screen/ForgotPassword';
import ResetPassword from './src/screen/ResetPassword';
import UserList from './src/screen/UserList';
import UserDetails from './src/screen/UserDetails';
import UserProfile from './src/screen/UserProfile';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';



const Stack = createNativeStackNavigator();

const App = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("authorization Status", authStatus);
      getFcmToken();
    }

  };

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log("fcm Token:", token)
  }

  const showLocalNotification = (remoteMessage) => {
    Notifications.postLocalNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      id: remoteMessage.messageId, // You can use a unique ID for each notification
    });
  };

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Notification received in foreground", remoteMessage);
      showLocalNotification(remoteMessage);
    })
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });
    return unsubscribe;
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})