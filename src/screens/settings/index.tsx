import React, {useCallback, useState} from 'react';
import {Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTemperatureUnit} from '../../hooks/useTemperatureUnit';
import {useWeather} from '../../hooks/useWeather';

const SettingsScreen = () => {
  const {i18n, t} = useTranslation();
  const {isCelsius, temperatureUnit, toggleTemperatureUnit} =
    useTemperatureUnit();
  const {city, changeCity} = useWeather();
  const [autoRetrieveLocation, setAutoRetrieveLocation] = useState(false);

  const toggleLanguage = useCallback(async () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    try {
      await AsyncStorage.setItem('selectedLanguage', newLanguage);

      i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [i18n]);

  return (
    <View style={styles.container}>
      <Text>{t('temperature')}</Text>
      <Button title={temperatureUnit} onPress={toggleTemperatureUnit} />

      <Text>{t('language')}</Text>
      <Button
        title={i18n.language === 'pt' ? 'Português' : 'English'}
        onPress={toggleLanguage}
      />

      <Text>{t('city')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enterCity')}
        onChangeText={text => changeCity(text)}
        value={city}
      />

      <Text>{t('autoRetrieveLocation')}</Text>
      <Switch
        value={autoRetrieveLocation}
        onValueChange={value => setAutoRetrieveLocation(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
  },
});

export default SettingsScreen;
