import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Navigation = NativeStackScreenProps<RootStackParams, 'Detail'>;

interface ListData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  photo: string;
}

const DetailProduck = ({navigation, route}: Navigation) => {
  const [data, setData] = useState<ListData[]>([]);
  useEffect(() => {
    console.log(route.params.no_id);
    AsyncStorage.getItem('token').then(value => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      fetch(
        `https://frontendreq.pondokprogrammer.com/api/show/${route.params.no_id}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setData(result.data);
        })
        .catch(error => console.log('error', error));
    });
  }, []);
  return (
    <View style={styles.Container}>
      {data.map((value, index) => (
        <View key={index} style={styles.Content}>
          <Image
            source={{uri: value.photo}}
            style={{height: 100, width: 100}}
          />
          <Text>{value.name}</Text>
          <Text>{value.city}</Text>
          <Text>{value.email}</Text>
          <Text>{value.phone}</Text>
          <Text>{value.address}</Text>
        </View>
      ))}
    </View>
  );
};

export default DetailProduck;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Content: {
    top: 20,
    width: '40%',
    marginLeft: 20,
  },
});
