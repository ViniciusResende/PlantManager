import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { PlantProps, savePlant } from '../libs/storage';
import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import fonts from '../styles/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';

interface Params {
  plant: PlantProps
}

const PlantSave = () => {
  const { colors } = useTheme();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  const navigation = useNavigation();

  function handleChangeTime(_: Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePicker(prev => !prev)
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if(dateTime)
      setSelectedDateTime(dateTime);
  }

  const handleOpenDatePickerForAndroid = () => {
    setShowDatePicker(prev => !prev);
  }

  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate("Confirmation", {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito Obriagado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch {
      Alert.alert('Não foi possível salvar. 😥');
    }
  }

  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={[styles.plantInfo, { backgroundColor: colors.shape }]}>
          <SvgFromUri 
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={[styles.plantName, { color: colors.heading }]}>
            {plant.name}
          </Text>
          <Text style={[styles.plantAbout, { color: colors.heading }]}>
            {plant.about}
          </Text>
        </View>
        <View style={[styles.controllers, { backgroundColor: colors.white }]}>
          <View style={[styles.tipContainer, { backgroundColor: colors.blue_light }]}>
            <Image 
              source={waterdrop}
              style={styles.tipImage}
            />
            <Text style={[styles.tipText, { color: colors.blue }]}>
              {plant.water_tips}
            </Text>
          </View>
          <Text style={[styles.alertLabel, { color: colors.heading }]}>
            Escolha o melhor horário para ser lembrado: 
          </Text>

          {showDatePicker &&
            <DateTimePicker 
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          }

          {Platform.OS === 'android' && (
            <TouchableOpacity 
              style={styles.dateTimePickerButton}
              onPress={handleOpenDatePickerForAndroid}
            >
              <Text style={[styles.dateTimePickerText, {color: colors.heading}]}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>          
          )}

          <Button 
            title="Cadastrar planta"
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default PlantSave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controllers: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 17,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20, 
    borderRadius: 20,
    position: 'relative',
    bottom: 70
  },
  tipImage: {
    height: 56,
    width: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    fontSize: 12,
    marginBottom: 5
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    fontSize: 24,
    fontFamily: fonts.text
  }
})