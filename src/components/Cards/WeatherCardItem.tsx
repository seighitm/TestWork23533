import clsx from 'clsx';

import { WeatherData } from '@/types/weather';

type WeatherCardItemProps = {
  weather: WeatherData;
  children: React.ReactNode;
  className?: string;
};

const WeatherCardItem: React.FC<WeatherCardItemProps> = ({
  weather,
  children,
  className,
}) => {
  const { name, sys, weather: weatherArray, main } = weather;
  const { country } = sys;
  const { description } = weatherArray[0];
  const { temp, humidity } = main;

  return (
    <div className={clsx('card p-3 mt-3 d-flex align-items-center', className)}>
      <div className="d-flex align-items-center flex-column">
        <h2 className="mb-0">{name}</h2>
        <span className="badge text-bg-light mt-1">{country}</span>
      </div>

      <div className="d-flex justify-content-center flex-column align-items-center">
        <p className={clsx('fs-6 badge text-bg-warning mt-1')}>{description}</p>
      </div>

      <div className="card p-2 d-flex flex-column align-items-center">
        <p className="mb-0">
          <span className="fw-bolder text-info">Temperature: </span>
          <span>{temp}°C</span>
        </p>
        <p className="mb-0">
          <span className="fw-bolder text-info">Humidity: </span>
          <span>{humidity}%</span>
        </p>
      </div>

      {children}
    </div>
  );
};

export default WeatherCardItem;
