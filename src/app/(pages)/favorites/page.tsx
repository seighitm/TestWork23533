'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import FavoriteCardItem from '@/components/Cards/FavoriteCardItem';
import Loader from '@/components/Loader/Loader';
import { apFetchWeather } from '@/lib/weatherAPI';
import { useWeatherStore } from '@/store/useWeatherStore';
import { WeatherData } from '@/types/weather';

const Favorites: React.FC = () => {
  const { favorites } = useWeatherStore();
  const [favoriteCitiesWeather, setFavoriteCitiesWeather] = useState<
    WeatherData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isInitialMount = useRef(true);

  const fetchFavoriteCitiesWeather = async () => {
    if (!favorites || favorites.length === 0) {
      setFavoriteCitiesWeather([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const requests = favorites.map((city) =>
        apFetchWeather(city.name, city.country),
      );
      const responses = await Promise.all(requests);
      setFavoriteCitiesWeather(responses);
      isInitialMount.current = false;
    } catch (err) {
      console.log(err);
      setError('Error fetching weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current && favorites) {
      fetchFavoriteCitiesWeather();
    }
  }, [favorites]);

  const removeCityFromFavorites = (city: WeatherData) => {
    setFavoriteCitiesWeather(
      favoriteCitiesWeather.filter(
        (c) => !(c.name === city.name && c.sys.country === city.sys.country),
      ),
    );
  };

  return (
    <div className="container">
      <h2 className="text-center fw-bolder mb-4">Favorite Cities</h2>
      {loading && (
        <div className="d-flex w-100 justify-content-center">
          <Loader />
        </div>
      )}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && favorites.length === 0 && (
        <div className="d-flex justify-content-center">
          <div className="card p-1 bg-danger" style={{ width: 'max-content' }}>
            <div className="text-center fw-bold text-light ">
              <p>You have no favorite cities yet.</p>
            </div>
            <Link href={'/'} className={'btn btn-secondary'}>
              Add new
            </Link>
          </div>
        </div>
      )}

      {!loading && favoriteCitiesWeather.length !== 0 && (
        <div className="row">
          {favoriteCitiesWeather.map((cityWeather) => (
            <div key={cityWeather.id} className="col-md-4 mb-3">
              <FavoriteCardItem
                key={cityWeather.id}
                cityWeather={cityWeather}
                onRemoveFavorite={() => removeCityFromFavorites(cityWeather)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
