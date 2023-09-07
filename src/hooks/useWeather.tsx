import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WeatherContextType = {
  city: string;
  changeCity: (name: string) => void;
};
type WeatherProviderProps = {
  children: ReactNode;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<WeatherProviderProps> = ({children}) => {
  const [city, setCity] = useState('NOT_SET');

  useEffect(() => {
    AsyncStorage.getItem('cityName').then(name => {
      setCity(name ? name : '');
    });
  }, []);

  const changeCity = useCallback(async (name: string) => {
    setCity(name);

    try {
      await AsyncStorage.setItem('cityName', name);
    } catch (error) {
      console.error('Error', error);
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        city,
        changeCity,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather needs WeatherProvider');
  }
  return context;
};
