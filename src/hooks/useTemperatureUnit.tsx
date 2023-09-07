import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TemperatureUnitContextType = {
  temperatureUnit: string;
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
};
type TemperatureUnitProviderProps = {
  children: ReactNode;
};

const TemperatureUnitContext = createContext<
  TemperatureUnitContextType | undefined
>(undefined);

export const TemperatureUnitProvider: React.FC<
  TemperatureUnitProviderProps
> = ({children}) => {
  const CELSIUS = '°C';
  const FAHRENHEIT = '°F';

  const [temperatureUnit, setTemperatureUnit] = useState(CELSIUS);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const usingCelsius = temperatureUnit === CELSIUS;
    setIsCelsius(usingCelsius);
  }, [temperatureUnit]);

  useEffect(() => {
    AsyncStorage.getItem('temperatureUnit').then(unit => {
      setTemperatureUnit(unit ? unit : CELSIUS);
    });
  }, []);

  const toggleTemperatureUnit = useCallback(async () => {
    const newUnit = temperatureUnit === CELSIUS ? FAHRENHEIT : CELSIUS;
    setTemperatureUnit(newUnit);

    try {
      await AsyncStorage.setItem('temperatureUnit', newUnit);
    } catch (error) {
      console.error('Error', error);
    }
  }, [temperatureUnit]);

  return (
    <TemperatureUnitContext.Provider
      value={{
        temperatureUnit,
        toggleTemperatureUnit,
        isCelsius,
      }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
};

export const useTemperatureUnit = (): TemperatureUnitContextType => {
  const context = useContext(TemperatureUnitContext);
  if (context === undefined) {
    throw new Error('useTemperatureUnit needs TemperatureUnitProvider');
  }
  return context;
};
