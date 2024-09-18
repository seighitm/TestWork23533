import axios from 'axios';
import {OPENWEATHERMAP_BASE_URL} from "@/config/constnts";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get('city');
  const country = searchParams.get('country');

  if (typeof city !== 'string') {
    return new Response(JSON.stringify({ error: `Invalid city parameter` }), {
      status: 400,
      statusText: 'Invalid city parameter',
    });
  }

  if (typeof country !== 'string') {
    return new Response(JSON.stringify({ error: `Invalid country parameter` }), {
      status: 400,
      statusText: 'Invalid country parameter',
    });
  }

  try {
    const forecastResponse = await axios.get(
      `${OPENWEATHERMAP_BASE_URL}data/2.5/forecast?q=${city},${country}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`,
    );

    return new Response(JSON.stringify(forecastResponse.data), {
      status: 200,
      statusText: 'OK',
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: `${err}` }), {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
