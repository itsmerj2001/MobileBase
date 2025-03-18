import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { ApiService } from '../services'

const UserDetails = ({ route }) => {

  const [details, setDetails] = useState([]);

  const handleAction = async (status) => {

    const UpdateId = details._id;
    const payload = {
      status,
    };
    const UpdatedUser = await ApiService.updateUser(UpdateId, payload);
    console.log(UpdatedUser);
    Alert.alert("Success", `User has been ${status} successfully.`);
    setDetails({ ...details, status })
  }

  const { userId } = route.params;
  const fetchData = async () => {
    try {
      const result = await ApiService.getUser(userId);
      const { user } = result.data;
      setDetails(user);
      console.log(details);
    }
    catch (err) {
      Alert.alert("Error",
        "There was an issue fetching the data. Please try again later.",);
    }
  }


  useEffect(() => {
    fetchData();
    console.log("fetched");
  }, [])
  console.log(details._id);
  return (
    <View style={styles.container}>
      {details && details.status === "Pending" ? (
        <View style={styles.arButtonsContainer}>
          <TouchableOpacity style={[styles.buttons, { backgroundColor: colors.green }]} onPress={() => handleAction("Approved")}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, { backgroundColor: colors.red }]} onPress={() => handleAction("Rejected")}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>) : ""
        //  <View style={styles.arButtonContainer}>
        //  <TouchableOpacity style={[styles.buttons,{backgroundColor:colors.green} ]}>
        //    <Text style={styles.buttonText}>{details.status}</Text>
        //    </TouchableOpacity></View>
      }
      <View style={styles.profileContainer}>
        <Image source={require("../assets/userProfile.png")} style={styles.profileView} />
      </View>
      <ScrollView>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.fieldTitle}>UserName</Text>
          <Text style={styles.userDetailText}>{details.name}</Text>
          <Text style={styles.fieldTitle} >Email</Text>
          <Text style={styles.userDetailText}> {details.email}</Text>
          <Text style={styles.fieldTitle} >Status</Text>
          <Text style={styles.userDetailText}>{details.status}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserDetails

const styles = StyleSheet.create({
  arButtonsContainer: {
    flexDirection: "row",
    gap: 10
  },
  buttons: {
    borderColor: colors.gray,
    borderWidth: 2,
    padding: 10,
    width: "50%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: fonts.SemiBold,
    color: colors.white,
    fontSize: 15
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20
  },
  profileContainer: {
    marginVertical: 50,
    justifyContent: "center",
    flexDirection: "row"
  },
  profileView: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: colors.primary,
  },
  profileDetailsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    elevation: 15,
  },
  userDetailText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.Regular,
    marginBottom: 8,
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 6,
    marginBottom: 15,
  },
  fieldTitle: {
    fontFamily: fonts.SemiBold,
  },
  arButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  }
})