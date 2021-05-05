import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text, 
  View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';
import fonts from '../styles/fonts';
import { useTheme } from '../context/ThemeContext';

interface ConfirmationParams {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

function Confirmation(){
  const { colors } = useTheme();

  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as ConfirmationParams;

  const handleMoveOn = () => {
    navigation.navigate(nextScreen);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={[styles.title, { color: colors.heading}]}>
          {title}
        </Text>

        <Text style={[styles.subtitle, { color: colors.heading}]}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button 
            title={buttonTitle}
            onPress={handleMoveOn}
          />
        </View>
      </View>      
    </SafeAreaView>
  )
}

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    lineHeight: 38, 
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
  },
  emoji: {
    fontSize: 78,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})