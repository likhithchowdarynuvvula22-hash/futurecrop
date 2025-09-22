import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { fetchWeather } from './api';

describe('fetchWeather', () => {
  it('should return weather data on a successful API call', async () => {
    const weatherData = await fetchWeather(35.6895, 139.6917); // Tokyo coordinates
    expect(weatherData).toHaveProperty('current');
    expect(weatherData.current.temperature_2m).toBe(25);
  });

  it('should return mock weather data when the API call fails', async () => {
    // Override the default handler to simulate an error
    server.use(
      http.get('https://api.open-meteo.com/v1/forecast', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const weatherData = await fetchWeather(35.6895, 139.6917);
    expect(weatherData).toHaveProperty('current');
    // Check for a value from the mockWeatherData function
    expect(weatherData.current.temperature_2m).toBe(28.5);
  });
});
