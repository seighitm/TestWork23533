'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import WeatherCardControl from '@/components/Cards/WeatherCardControl';
import WeatherCardItem from '@/components/Cards/WeatherCardItem';
import Loader from '@/components/Loader/Loader';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { apFetchWeather, apiFetchCoordinates } from '@/lib/weatherAPI';
import { useWeatherStore } from '@/store/useWeatherStore';
import { City, DetailedCity } from '@/types/city';
import { WeatherData } from '@/types/weather';

type HomePageProps = {
  searchParams: { city: string; country: string };
};

const Home: React.FC<HomePageProps> = ({ searchParams }) => {
  const router = useRouter();
  const [cityInput, setCityInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFetchCoordinates, setIsLoadingFetchCoordinates] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [debouncedCity] = useDebouncedValue(cityInput, 500);
  const [suggestedCities, setSuggestedCities] = useState<DetailedCity[]>([]);
  const userTypingRef = useRef(false);
  const { selectedCity, setSelectedCity } = useWeatherStore();

  const [currentCity, setCurrentCity] = useState<WeatherData | null>(null);

  const initialLoad = useRef(false);

  const cityQuery = searchParams.city ?? null;
  const countryQuery = searchParams.country ?? null;

  const fetchCityCoordinates = async () => {
    if (!cityInput.trim()) {
      setErrorMessage('City is required');
      return;
    }
    setIsLoadingFetchCoordinates(true);
    setErrorMessage('');
    try {
      const cities = await apiFetchCoordinates(cityInput);
      const filteredCities = cities.filter((city) => city.local_names);
      setSuggestedCities(filteredCities);

      if (filteredCities.length === 0) setErrorMessage('City not found!');
    } catch (err) {
      console.log(err);
      setErrorMessage('Error fetching coordinates');
    } finally {
      setIsLoadingFetchCoordinates(false);
    }
  };

  const fetchWeather = async (city: City) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const weatherData = await apFetchWeather(
        city.name ?? selectedCity?.name,
        city.country ?? selectedCity?.country,
      );

      if (weatherData) {
        setCurrentCity(weatherData);
        setSelectedCity({
          name: weatherData.name,
          country: weatherData.sys.country,
        });

        setSuggestedCities([]);

        if (!initialLoad.current) {
          userTypingRef.current = false;
          // setCityInput(weatherData.name);
        }
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('City not found');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadWeatherData = async (city: City) => {
      initialLoad.current = true;
      setCityInput(city.name);
      fetchWeather(city);
    };

    if (!initialLoad.current && !cityInput) {
      if (cityQuery !== null && countryQuery !== null) {
        loadWeatherData({ name: cityQuery, country: countryQuery });
      } else if (selectedCity) {
        loadWeatherData(selectedCity);
      } else {
        setIsLoading(false);
      }
    }
  }, [selectedCity, cityQuery, countryQuery, cityInput]);

  useEffect(() => {
    if (debouncedCity && userTypingRef.current) {
      fetchCityCoordinates();
      userTypingRef.current = false;
    } else {
      setSuggestedCities([]);
    }
  }, [debouncedCity, currentCity]);

  const handleSearchSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      await fetchCityCoordinates();
    },
    [fetchCityCoordinates],
  );

  const handleCityInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      userTypingRef.current = true;
      setIsLoadingFetchCoordinates(true);
      setCityInput(e.target.value);
    },
    [],
  );

  const handleCitySelection = useCallback(
    async (city: City) => {
      await fetchWeather(city);
      router.push(`/?city=${city.name}&country=${city.country}`);
      setSuggestedCities([]);
    },
    [fetchWeather, router],
  );

  return (
    <>
      <div className="container">
        <div className="d-flex shadow-md p-2 rounded bg-body-tertiary flex-column w-100">
          <form className="w-100 d-flex gap-2" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter city"
              value={cityInput}
              onChange={handleCityInputChange}
            />
            {currentCity && isLoadingFetchCoordinates && (
              <div className="d-flex justify-content-center mt-2">
                <Loader size="sm" />
              </div>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>
          </form>
          {errorMessage && (
            <span className="badge text-bg-danger mt-1">{errorMessage}</span>
          )}
        </div>

        {suggestedCities.length > 0 && (
          <div className="card p-2 d-flex flex-column gap-1 mt-3">
            <span className="badge bg-secondary ps-2 fs-6">Cities:</span>
            {suggestedCities.map((city) => (
              <button
                key={city.lat}
                onClick={() => handleCitySelection(city)}
                className="btn btn-light d-flex gap-1"
              >
                <div>{city.country}</div>
                <div>{city.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center mt-2">
          <Loader />
        </div>
      )}

      {!isLoading && currentCity && (
        <div className={'d-flex justify-content-center'}>
          <WeatherCardItem weather={currentCity}>
            <WeatherCardControl weather={currentCity} />
          </WeatherCardItem>
        </div>
      )}
    </>
  );
};

export default Home;
