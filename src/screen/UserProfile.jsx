import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { ApiService } from '../services';
import DatePicker from 'react-native-date-picker';
import useForm from '../hooks/useForm';
import formSchema from '../schemas/formSchema';

const UserProfile = () => {
    const { values, handleChange, errors, updateField, isFormValid } = useForm({}, formSchema.UpdateProfile);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const handleSubmit = async () => {
        console.log(errors);
        if (await isFormValid()) {
            console.log("valid");
            const result = await ApiService.updateProfile(values);
            console.log(result);
        }
    }
    const fetchData = async () => {
        try {
            const result = await ApiService.getUserDetails();
            console.log(result);
            const { user } = result.data;
            updateField(user);
            console.log(user);
        }
        catch (err) {
            Alert.alert("Error",
                "There was an issue fetching the data. Please try again later.",);
        }
    }
    const handleCalendar = () => {
        setOpen((prev) => !prev);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={require("../assets/userProfile.png")} style={styles.profileView} />
            </View>
            <ScrollView>
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.fieldTitle}>UserName</Text>
                    <View style={styles.FieldContainer} >
                        <Ionicons name={"person"} color={colors.primary} size={20} />
                        <TextInput style={styles.textInput} value={values.name} onChangeText={(text) => handleChange("name", text)} />
                    </View>
                    <Text style={styles.fieldTitle} >Email</Text>
                    <View style={styles.FieldContainer} >
                        <Ionicons name={"mail"} color={colors.primary} size={20} />
                        <TextInput style={styles.textInput} value={values.email} editable={false} />
                    </View>
                    <Text style={styles.fieldTitle} >Status</Text>
                    <View style={styles.FieldContainer}>
                        <Ionicons name={"shield"} color={colors.primary} size={20} />
                        <TextInput style={styles.textInput} value={values.status} editable={false} />
                    </View>
                    <Text style={styles.fieldTitle} >DOB</Text>
                    <TouchableOpacity style={styles.FieldContainer} onPress={() => setOpen(true)}>
                        <Ionicons name={"calendar"} color={colors.primary} size={20} />
                        <TextInput style={styles.textInput} value={values.dob ? values.dob.toLocaleDateString : ""} editable={false} />
                    </TouchableOpacity>
                    <View style={styles.updateBC}>
                        <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
                            <Text style={styles.upText}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        modal
                        mode="date"
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            console.log(date.toLocaleDateString())
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    FieldContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 10,
        borderColor: colors.primary,
        marginVertical: 20
    },
    updateButton: {
        borderWidth: 1,
        borderColor: colors.primary,
        width: 150,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        backgroundColor: colors.primary
    },
    updateBC: {
        alignItems: "center",
        paddingVertical: 15,
    },
    upText: {
        textAlign: "center",
        color: colors.white,

    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: fonts.Light,
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
        //     paddingVertical: 20,
        paddingHorizontal: 20,
        //     backgroundColor: colors.white,
        //     borderRadius: 10,
        //     borderWidth: 1,
        //     borderColor: colors.gray,
        //     elevation: 15,
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
        paddingHorizontal: 10,
        color: colors.secondary
    },

    textInput: {
        flex: 1,
    }
})