import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Putih} from '../utils/Colors';

const Option = () => {
  return (
    <View style={styles.Conatiner}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Putih}
        translucent
      />
      <Text>Option</Text>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
