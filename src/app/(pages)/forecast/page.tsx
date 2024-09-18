'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import Loader from '@/components/Loader/Loader';
import ForecastTable from '@/components/Tables/ForecastTable';
import { useWeatherStore } from '@/store/useWeatherStore';
import { ForecastGroupedByDate, groupForecastByDate } from '@/utils/weather';

type ForecastPageProps = {
  searchParams: { city: string; country: string };
};

const Forecast: React.FC<ForecastPageProps> = ({ searchParams }) => {
  const { selectedCity } = useWeatherStore();

  const [forecastByDate, setForecastByDate] = useState<ForecastGroupedByDate>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isInitialMount = useRef(false);

  const city = searchParams?.city;
  const country = searchParams?.country;

  const fetchCityForecast = async () => {
    setError('');
    try {
      const response = await axios.get(
        `/api/forecast?city=${city}&country=${country}`,
      );
      const data = response.data;

      setForecastByDate(groupForecastByDate(data.list));
    } catch (err) {
      console.log(err);
      setError('Error fetching weather');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      ((country && city) || selectedCity) &&
      isInitialMount.current === false
    ) {
      setLoading(true);
      fetchCityForecast();
      isInitialMount.current = true;
      setLoading(false);
    }
  }, [selectedCity, country, city]);

  return (
    <div className={`container d-flex flex-column align-items-center`}>
      <div className="d-flex align-items-center align-content-center align-middle gap-3 mb-3">
        <h2 className={'text-center mb-0 fw-bolder'}>{city}</h2>
        <span className="fs-5 badge text-bg-light">{country}</span>
      </div>

      {loading && <Loader />}
      {error && (
        <div className="d-flex justify-content-center">
          <div className="card p-1 bg-danger" style={{ width: 'max-content' }}>
            <div className="text-center fw-bold text-light">{error}</div>
          </div>
        </div>
      )}

      <div style={{ width: '100%' }}>
        {forecastByDate &&
          Object.entries(forecastByDate).map(([key, dailyForecasts]) => (
            <ForecastTable key={key} dailyForecasts={dailyForecasts} />
          ))}
      </div>
    </div>
  );
};

export default Forecast;
