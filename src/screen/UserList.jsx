import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../utils/colors'
import { ApiService } from '../services'
import { fonts } from '../utils/fonts'
import { useFocusEffect } from '@react-navigation/native'

const UserList = ({ navigation }) => {


  const [datas, setDatas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log(datas);

  const fetchData = async () => {
    try {
      const result = await ApiService.getAllUsers();
      console.log(result);
      setDatas(result.data.users)
    }
    catch (err) {

      Alert.alert("Error",
        "There was an issue fetching the data. Please try again later.",);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []))
  const handleUserDetails = (id) => {
    navigation.navigate("UserDetails", { userId: id });
  }

  const userData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleUserDetails(item._id)} activeOpacity={0.8} >
        <View style={styles.itemContainer}>
          <Image source={require("../assets/userProfile.png")} style={styles.profile} />
          <View>
            <Text style={styles.nameField}>{item.name}</Text>
            <Text style={styles.emailField}>{item.email}</Text>
          </View>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </TouchableOpacity>

    );
  };

  const headerComponent = () => {
    return <Text style={styles.headerText}>Users List</Text>;
  };

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={headerComponent}
        ListHeaderComponentStyle={styles.listHeader}
        data={datas}
        renderItem={userData}
        ListEmptyComponent={<Text style={styles.emptyText}>There is no Data to show...</Text>}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={itemSeparator}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
}

export default UserList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listHeader: {
    height: 55,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
    elevation: 13,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    position: "relative",
  },
  nameField: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
    color: colors.primary
  },
  emailField: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: colors.secondary
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  profile: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  status: {
    position: "absolute",
    top: 10,
    right: 15,
    color: colors.primary,
    fontFamily: fonts.Bold
  }
});