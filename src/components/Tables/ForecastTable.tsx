import ScrollAreaCustom from '@/components/ScrollAreaCustom/ScrollAreaCustom';
import { ForecastItem } from '@/types/forecast';

type ForecastTableProps = {
  dailyForecasts: ForecastItem[];
};

const ForecastTable: React.FC<ForecastTableProps> = ({ dailyForecasts }) => {
  return (
    <div className={'card w-100 p-2 mb-3'}>
      <div className={'badge text-bg-secondary mb-2 fs-5'}>
        DATE: {new Date(dailyForecasts[0].dt * 1000).toLocaleDateString()}
      </div>

      <ScrollAreaCustom>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className={'text-center'} scope="col">
                Hour
              </th>
              <th className={'text-center'} scope="col">
                Temperature
              </th>
              <th className={'text-center'} scope="col">
                Humidity
              </th>
              <th className={'text-center'} scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {dailyForecasts.map((day) => (
              <tr key={day.dt}>
                <td className={'align-middle text-center'}>
                  {new Date(day.dt * 1000).getHours()}:
                  {new Date(day.dt * 1000).getMinutes()}
                </td>
                <td className={'align-middle text-center'}>
                  {day.main.temp}°C
                </td>
                <td className={'align-middle text-center'}>
                  {day.main.humidity}%
                </td>
                <td className={'align-middle'}>
                  <div
                    className={
                      'd-flex justify-content-center align-content-center align-items-center'
                    }
                  >
                    <div
                      style={{
                        textTransform: 'uppercase',
                        width: 'max-content',
                      }}
                      className={'fs-10 badge text-bg-warning'}
                    >
                      {day.weather[0].description}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollAreaCustom>
    </div>
  );
};

export default ForecastTable;
