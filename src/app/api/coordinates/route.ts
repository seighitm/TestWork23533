import axios from 'axios';
import {OPENWEATHERMAP_BASE_URL} from "@/config/constnts";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get('city');

  if (typeof city !== 'string') {
    return new Response(JSON.stringify({ error: `Invalid city parameter` }), {
      status: 400,
      statusText: 'Invalid city parameter',
    });
  }

  try {
    const encodedCity = encodeURIComponent(city);
    const geoResponse = await axios.get(
      `${OPENWEATHERMAP_BASE_URL}geo/1.0/direct?q=${encodedCity}&appid=${process.env.OPENWEATHERMAP_API_KEY}&limit=5`,
    );
    return new Response(JSON.stringify(geoResponse.data), {
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
