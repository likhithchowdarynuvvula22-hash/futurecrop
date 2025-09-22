import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.open-meteo.com/v1/forecast', ({ request }) => {
    const url = new URL(request.url);
    const lat = url.searchParams.get('latitude');
    const lon = url.searchParams.get('longitude');

    if (lat === '0' && lon === '0') {
      return HttpResponse.json({ reason: 'Invalid coordinates' }, { status: 400 });
    }

    return HttpResponse.json({
      current: {
        temperature_2m: 25,
        relative_humidity_2m: 80,
        wind_speed_10m: 15,
        weather_code: 3,
      },
      hourly: {
        time: [new Date().toISOString()],
        temperature_2m: [25],
        relative_humidity_2m: [80],
      },
    });
  }),
];
