import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from'expo-contacts';

export default function App() {

  const [contact, setContact] = useState({})
  const [data, setData] = useState([]);


  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] });
    
      if (data.length > 0) {
        setContact(data[0]);
        setData(data);
    }
  }
  }




  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={data}
        keyExtractor={item => item.id.toString()} 
        renderItem={({ item }) => <View style={styles.listcontainer}>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
          <Text style={{ fontSize: 18 }}>   {item.phoneNumbers && item.phoneNumbers[0].number}</Text>
        </View>} 
        extraData={data}
      />
      <Button title="Get Contact" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 40
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 2
   }
});
