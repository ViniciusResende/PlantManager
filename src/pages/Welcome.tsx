import React from 'react';
import { 
  SafeAreaView, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions, 
  View
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Constants from 'expo-constants';

import wateringImg from '../assets/watering.png';
import fonts from '../styles/fonts';
import { useTheme } from '../context/ThemeContext';

const Welcome = () => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIndentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: colors.heading }]}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          source={wateringImg} 
          style={styles.image}
          resizeMode='contain'
        />

        <Text style={[styles.subtitle, { color: colors.heading }]}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você 
          sempre que precisar.
        </Text>

        <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.green }]} 
        activeOpacity={0.7}
        onPress={handleStart}
        >
          <Entypo name="chevron-thin-right" style={[styles.buttonIcon, { color: colors.white }]}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
  },
  image : {
    height: Dimensions.get('window').width * 0.7,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    fontSize: 18,
  }
});