import { memo } from 'react';

import WeatherCardControl from '@/components/Cards/WeatherCardControl';
import WeatherCardItem from '@/components/Cards/WeatherCardItem';
import { WeatherData } from '@/types/weather';

type WeatherCardItemProps = {
  cityWeather: WeatherData;
  onRemoveFavorite: () => void;
};

const FavoriteCardItem: React.FC<WeatherCardItemProps> = memo(
  ({ cityWeather, onRemoveFavorite }) => {
    return (
      <WeatherCardItem className="w-100" weather={cityWeather}>
        <WeatherCardControl
          weather={cityWeather}
          onRemoveFavorite={onRemoveFavorite}
        />
      </WeatherCardItem>
    );
  },
);

FavoriteCardItem.displayName = 'FavoriteCardItem';

export default FavoriteCardItem;
