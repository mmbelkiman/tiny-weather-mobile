import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTemperatureUnit} from '../../hooks/useTemperatureUnit';

const WeatherScreen = () => {
  const {temperatureUnit} = useTemperatureUnit();
  const [temperature, setTemperature] = useState(20);
  const [rain, setRain] = useState(20);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/weather');
      const data = await response.json();

      setTemperature(data.temperature);
      setRain(data.rain);
      setHumidity(data.humidity);
      setWind(data.wind);
      setDayOfWeek(data.dayOfWeek);
      setCurrentTime(data.currentTime);
      setWeatherDescription(data.weatherDescription);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={styles.temperature}>{`${temperature} ${temperatureUnit}`}</Text>

      <Text>{t('rain')}</Text>
      <Text>{t('humidity')}</Text>
      <Text>{t('wind')}</Text>

      <Text>{dayOfWeek}</Text>
      <Text>{currentTime}</Text>
      <Text>{weatherDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WeatherScreen;
