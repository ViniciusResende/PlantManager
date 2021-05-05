import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import fonts from '../styles/fonts';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import Header from '../components/Header';
import waterdrop from '../assets/waterdrop.png';
import { deletePlant, loadPlant, PlantProps } from '../libs/storage';
import PlantCardSecondary from '../components/PlantCartSecondary';
import Load from '../components/Load';
import { useTheme } from '../context/ThemeContext';


const MyPlants = () => {
  const { colors } = useTheme();

  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextWatering, setNextWatering] = useState<string>();

  const handleRemove = (plant: PlantProps) => {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await deletePlant(plant.id);
            setMyPlants((prev) => (
              prev.filter((item) => item.id !== plant.id)
            ))
          } catch (error) {
            Alert.alert('Não foi possível remover! 😢');
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStoragedData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatering(
        `Não esqueça de regar a ${plantsStoraged[0].name} em aproximadamente ${nextTime}.`
      );

      setMyPlants(plantsStoraged);
      setIsLoading(false);
    }

    loadStoragedData();
  }, [])

  if(isLoading){
    return <Load />
  }

  return(
    <View style={[styles.container, { backgroundColor: colors.background}]}>
      <Header />

      <View style={[styles.spotlight, { backgroundColor: colors.blue_light }]}>
        <Image 
          source={waterdrop}
          style={styles.spotlightImage} 
        />
        <Text style={[styles.spotlightText, { color: colors.blue }]}>
          {nextWatering}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={[styles.plantsTitle, { color: colors.heading }]}>
          Próximas regadas
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlantCardSecondary 
              data={item}
              handleRemove={() => {handleRemove(item)}}
            />
          )}
        />
      </View>
    </View>
  );
}

export default MyPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  spotlight: {
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    paddingVertical: 20
  }
})