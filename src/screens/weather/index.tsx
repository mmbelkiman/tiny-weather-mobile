import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTemperatureUnit} from '../../hooks/useTemperatureUnit';
import axios from 'axios';
import WindDirection from './WindDirection';

const WeatherScreen = () => {
  const {temperatureUnit} = useTemperatureUnit();
  const [weatherData, setWeatherData] = useState<{
    dayOfWeek: any;
    weatherDescription: any;
    currentTime: any;

    weather: {
      icon: any;
      description: any;
    };

    main: {
      humidity: any;
      temp: any;
      feels_like: any;
    };
    wind: {
      speed: any;
      deg: any;
    };
  } | null>(null);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            query GetWeather {
              getWeather(cityName: "Campinas") {
     name,
    timezone,
    
        weather {
      id,
      description,
      icon,
      main
    }
    
    wind {
  speed, deg
},
    
    main {
  temp,
  feels_like,
  temp_max,
  temp_min,
  pressure,
  humidity,grnd_level,
}
              }
            }
          `,
        });

        if (response.data.data) {
          setWeatherData(response.data.data.getWeather);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return <Text>NO DATA</Text>;
  }

  const today = new Date(Date.now());

  const convertWindDirectionToRotation = (degrees: number): number => {
    // Add 90 degrees to convert from meteorological to SVG coordinates.
    let rotatedDegrees = degrees + 180;

    // If the rotated degrees are negative, add 360 degrees to make them positive.
    if (rotatedDegrees < 0) {
      rotatedDegrees += 360;
    }

    return rotatedDegrees;
  };

  return (
    <View style={styles.container}>
      <Text>{`${today.toDateString()}`}</Text>
      <Text>Campinas, SP - BR</Text>

      <Text style={styles.temperature}>{`${Math.ceil(
        weatherData.main.temp,
      )} ${temperatureUnit}`}</Text>

      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{
          uri: `https://openweathermap.org/img/wn/${weatherData.weather.icon}.png`,
        }}
      />

      <Text>{t('rain')}</Text>
      <Text>{`${t('humidity')}:${weatherData.main.humidity}%`}</Text>
      <Text>{`${t('wind')}:${weatherData.wind.speed}m/s `}</Text>

      <WindDirection
        rotation={convertWindDirectionToRotation(weatherData.wind.deg)}
      />

      <Text>{weatherData.dayOfWeek}</Text>
      <Text>{weatherData.currentTime}</Text>
      <Text>{weatherData.weatherDescription}</Text>
      <Text>{`Feels like ${Math.ceil(weatherData.main.feels_like)}°C. ${
        weatherData.weather.description
      } `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WeatherScreen;
