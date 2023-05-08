import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParams} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Hitam} from '../utils/Colors';

type Navigation = NativeStackScreenProps<RootStackParams>;

const Splash = ({navigation}: Navigation) => {
  const [loading, setLoading] = useState<boolean>(false);
  setTimeout(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log(value);
      if (value !== null) {
        navigation.replace('HomePostman');
      } else {
        navigation.replace('login');
        setLoading(true);
      }
    });
  }, 3000);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/AppContact.png')}
        style={styles.Image}
      />
      <ActivityIndicator size="small" color="white" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    height: 100,
    width: 100,
  },
  Txt: {
    color: Hitam,
    fontSize: 15,
    fontWeight: '700',
  },
});
