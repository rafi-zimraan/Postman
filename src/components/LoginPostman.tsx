// MENGUNAKAN API BACKEND
import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Biru, biruTua, Hitam, Putih} from '../utils/Colors';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Postman = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const Reg = () => {
    if (email === '') {
      Alert.alert(
        'Perhatian !',
        'Akun anda belum terdaftar, Mohon daftar terlebih dahulu',
        [
          {
            text: 'cancel',
          },
          {
            text: 'ok',
          },
        ],
      );
    } else if (
      email.split('@')[1] !== 'gmail.com' &&
      email.split('@')[1] !== 'email.com'
    ) {
      Alert.alert('Perhatikan !', 'Email harus mengunakan "gmail.com" ', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (password === '') {
      Alert.alert(
        'Perhatian !',
        'Password anda belum ada, mohon isi terlebih dahulu',
        [
          {
            text: 'cancel',
          },
          {
            text: 'ok',
          },
        ],
      );
    } else if (password.length < 8) {
      Alert.alert('Perhatian !', 'Password harus 8 karakter ', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    }
    setLoading(true);
    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://frontendreq.pondokprogrammer.com/api/login', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.error_message) {
          Alert.alert(
            'Perhatian !',
            'Akun anda belum terdaftar, silahkan register terlebih dahulu ',
            [
              {
                text: 'cancel',
              },
              {
                text: 'ok',
              },
            ],
          );
        } else {
          console.log(result.token);
          AsyncStorage.setItem('token', result.token);
          navigation.replace('HomePostman');
        }
      })
      .catch(error => {
        console.log('error', error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'white'}
        translucent
      />
      <View style={styles.Container}>
        <Text style={styles.txtNavbar}>Login</Text>
      </View>
      <View style={styles.conterInput}>
        <Text style={styles.name}>Email</Text>
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={(nm: string) => setEmail(nm)}
        />
      </View>
      <View style={styles.conterInput}>
        <Text style={styles.name}>Password</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(nm: string) => setPassword(nm)}
        />
      </View>
      <TouchableOpacity onPress={() => Reg()} style={styles.Button}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.ButtonTxt}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.RegisterTxt}>
        <Text style={styles.txt}>Belum punya Accoun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.txt2}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Postman;

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    backgroundColor: Putih,
    marginVertical: 37,
  },
  txtNavbar: {
    fontSize: 27,
    color: Hitam,
    fontWeight: '900',
    top: 20,
  },
  NameTxt: {
    fontSize: 19,
    color: Hitam,
    top: 52,
    left: 20,
  },
  conterInput: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderColor: 'gray',
    marginTop: 5,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: biruTua,
    marginRight: 22,
    marginLeft: 22,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    height: 49,
    top: 60,
  },
  ButtonTxt: {
    color: Putih,
  },
  RegisterTxt: {
    top: 73,
    flexDirection: 'row',
    marginHorizontal: 103,
  },
  txt: {
    color: Hitam,
  },
  txt2: {
    color: Biru,
    left: 6,
    fontWeight: '700',
  },
});
