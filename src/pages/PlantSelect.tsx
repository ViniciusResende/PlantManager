import React, { useEffect, useState } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';

import Header from '../components/Header';
import EnviromentButton from '../components/EnviromentButton';
import PlantCardPrimary from '../components/PlantCartPrimary';
import Load from '../components/Load';

import { PlantProps } from '../libs/storage';
import fonts from '../styles/fonts';
import api from '../services/api';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '../context/ThemeContext';

interface EnviromentProps {
  key: string;
  title: string;
}

const PlantSelect = () => {
  const { colors } = useTheme();

  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  const handleEnviromentSelected = (enviroment: string) => {
    setEnviromentSelected(enviroment);

    if(enviroment == 'all')
      return setFilteredPlants(plants);
    
    const filtered = plants.filter(plant => 
      plant.environments.includes(enviroment) 
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api
      .get('plants', {
        params: {
          _sort: 'name',
          _order: 'asc',
          _page: `${page}`,
          _limit: '8'
        }
      });
    if(!data)
      return setIsLoading(true);

    if(page > 1){
      setPlants(prev => [...prev, ...data]);
      setFilteredPlants(prev => [...prev, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }

  const handleFetchMore = (distance: number) =>{
    if(distance < 1)
      return;

    setLoadingMore(true);
    setPage(prev => prev + 1);
    fetchPlants();
  }

  const handlePlantSelect = (plant: PlantProps) => {
    navigation.navigate('PlantSave', { plant });
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api
        .get('plants_environments', {
          params: {
            _sort: 'title',
            _order: 'asc'
          }
        });
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
    }

    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    handleEnviromentSelected('all');
  },[plants])

  if(isLoading){
    return <Load />
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <Header />

        <Text style={[styles.title, {color: colors.heading}]}>
          Em qual ambiente
        </Text>
        <Text style={[styles.subtitle, {color: colors.heading}]}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          keyExtractor={(item) => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          data={enviroments}
          renderItem={({ item }) => (
            <EnviromentButton 
              key={item.key}
              title={item.title} 
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList 
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary 
              key={item.id}
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          ListFooterComponent={
            loadingMore ?
            <ActivityIndicator 
              color={colors.green}
            /> : <></>
          }
        />
      </View>
      
    </View>
  )
}

export default PlantSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
    paddingRight: 62
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
})