import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useTheme } from '../context/ThemeContext';

import userImg from '../assets/ViniciusFoto.png'
import fonts from '../styles/fonts';

const Header = () => {
  const [userName, setUserName] = useState<string>();

  const {handleThemeToggling, theme, colors} = useTheme();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }

    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={[styles.greeting, {color: colors.heading}]}>Olá,</Text>
          <Text style={[styles.userName, {color: colors.heading}]}>{userName}</Text>
        </View>

        <Image source={userImg} style={styles.userImage}/>
      </View>
      <Switch
        trackColor={{ true: "#00103d", false: "#81b0ff" }}
        thumbColor={theme === 'dark' ? "#666b00" : "#eefa00"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => handleThemeToggling()}
        value={theme === 'dark'}
      />
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
});