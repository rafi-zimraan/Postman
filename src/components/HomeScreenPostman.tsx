import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Hitam} from '../utils/Colors';

type Navigation = NativeStackScreenProps<RootStackParams>;

interface ListData {
  id: number;
  name: string;
  address: string;
  photo: string;
}
const HomeScreenPostman = ({navigation}: Navigation) => {
  const [data, setData] = useState<ListData[]>([]);
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log('Ini adalah token', value);

      var requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      fetch(
        'https://frontendreq.pondokprogrammer.com/api/index',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result.data);
          setData(result.data);
        })
        .catch(error => console.log('error', error));
    });
  }, []);

  const Warning = () => {
    Alert.alert('Perhatian', 'Apakah Anda ingin Keluar', [
      {
        text: 'cancel',
      },
      {
        text: 'ok',
        onPress: () => Logout(),
      },
    ]);
  };

  const Logout = () => {
    AsyncStorage.getItem('token').then(value => {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };
      fetch(
        'https://frontendreq.pondokprogrammer.com/api/logout',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          AsyncStorage.removeItem('token');
          navigation.replace('login');
        })
        .catch(error => console.log('error', error));
    });
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={() => Warning()}>
        <Icon name="logout" size={45} color={Hitam} />
      </TouchableOpacity>
      <View style={styles.Content}>
        {data.map((value, index) => (
          <View key={index} style={styles.Content1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {no_id: value.id})}>
              <Image
                source={{uri: value.photo}}
                style={{width: 100, height: 100}}
              />
              <Text>{value.name}</Text>
              <Text>{value.address}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HomeScreenPostman;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    marginVertical: 40,
  },
  Content1: {
    backgroundColor: '#b9b4b4',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 18,
    width: '45%',
    margin: 5,
  },
});
