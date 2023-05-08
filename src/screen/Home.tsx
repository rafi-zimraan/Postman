// MENGUNAKAN API BACKEND
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {biruTua, Hitam, Putih} from '../utils/Colors';
import {ActivityIndicator} from 'react-native';

const Home = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password_Confirmation, setPassword_Confirmation] =
    useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const Reg = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('password_confirmation', password_Confirmation);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://frontendreq.pondokprogrammer.com/api/register',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  };
  return (
    <View>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparents'}
        translucent
      />
      <View style={styles.Container}>
        <Text style={styles.txtNavbar}>Register</Text>
      </View>
      <View style={styles.conterInput}>
        <Text style={styles.name}>Name</Text>
        <TextInput
          placeholder="name"
          style={styles.input}
          onChangeText={(nm: string) => setName(nm)}
        />
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
      <View style={styles.conterInput}>
        <Text style={styles.name}>Password-confirmation</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(nm: string) => setPassword_Confirmation(nm)}
        />
      </View>
      <TouchableOpacity onPress={() => Reg()} style={styles.Button}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.ButtonTxt}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    marginVertical: 18,
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
});
