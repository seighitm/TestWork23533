import Link from 'next/link';
import { useCallback } from 'react';

import { useWeatherStore } from '@/store/useWeatherStore';
import { WeatherData } from '@/types/weather';

type WeatherCardControlProps = {
  weather: WeatherData;
  onRemoveFavorite?: () => void;
};

const WeatherCardControl: React.FC<WeatherCardControlProps> = ({
  weather,
  onRemoveFavorite,
}) => {
  const { favorites, addFavorite, removeFavorite } = useWeatherStore();

  const isFavorite = !favorites.some(
    (city) =>
      city.name === weather.name && city.country === weather.sys.country,
  );

  const handleAddFavorite = useCallback(() => {
    addFavorite({
      name: weather.name,
      country: weather.sys.country,
    });
  }, [addFavorite, weather.name, weather.sys.country]);

  const handleRemoveFavorite = useCallback(() => {
    removeFavorite({
      name: weather.name,
      country: weather.sys.country,
    });
    if (onRemoveFavorite) onRemoveFavorite();
  }, [removeFavorite, weather.name, weather.sys.country, onRemoveFavorite]);

  return (
    <div className="mt-2 d-flex gap-1 align-items-center justify-content-center flex-wrap">
      {isFavorite ? (
        <button
          className="btn btn-secondary d-flex gap-2 align-items-center justify-content-center"
          onClick={handleAddFavorite}
        >
          On
        </button>
      ) : (
        <button
          className="btn btn-danger d-flex gap-2 align-items-center justify-content-center"
          onClick={handleRemoveFavorite}
        >
          Off
        </button>
      )}

      <Link
        href={`/forecast?city=${weather.name}&country=${weather.sys.country}`}
        className="btn btn-info d-flex gap-2 align-items-center justify-content-center"
      >
        Forecast
      </Link>
    </div>
  );
};

export default WeatherCardControl;
