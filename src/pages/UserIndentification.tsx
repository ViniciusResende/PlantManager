import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import fonts from '../styles/fonts';
import { useTheme } from '../context/ThemeContext';

const UserIndentification= () => {
  const { colors } = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFocused(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if(!name)
      return Alert.alert('Me diz como chamar você 😥')

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate("Confirmation", {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      });
    } catch(err){
      Alert.alert('Não foi possível salvar o seu nome 😥')
    }    
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.formHeader}>
                <Text style={styles.emoji}>
                  { isFilled ? '😄' : '😃'}
                </Text>
                <Text style={[styles.title, { color: colors.heading }]}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>
              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                  { borderColor: colors.gray,  color: colors.heading }
                ]} 
                placeholder="Digite seu nome"
                placeholderTextColor={colors.black}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.formFooter}>
                <Button 
                  title="Confirmar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>       
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default UserIndentification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  formHeader: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    fontFamily: fonts.heading,
    marginTop: 20
  },
  formFooter: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  }
})