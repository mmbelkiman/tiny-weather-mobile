import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TemperatureUnitProvider} from './src/hooks/useTemperatureUnit';
import {WeatherProvider} from './src/hooks/useWeather';

const App = () => {
  useEffect(() => {
    const loadSelectedLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          i18n.changeLanguage(selectedLanguage);
        }
      } catch (error) {
        console.error('Erro ao carregar o idioma selecionado:', error);
      }
    };

    loadSelectedLanguage();
  }, []);

  return (
    <TemperatureUnitProvider>
      <WeatherProvider>
        <Navigation />
      </WeatherProvider>
    </TemperatureUnitProvider>
  );
};

export default App;
