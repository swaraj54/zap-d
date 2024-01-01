import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCryptos } from './../controllers/cryptos.controllers.js';

const mock = new MockAdapter(axios);

describe('getCryptos Controller', () => {
    beforeEach(() => {
        // Reset the axios mock adapter before each test
        mock.reset();
    });

    it('should return crypto list with status code 200 on successful request', async () => {
        // Mock a successful response from the external API
        const mockApiResponse = [
            {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                image: 'bitcoin-image-url',
            },
            // Add more mock data as needed
        ];
        mock.onGet('https://api.coingecko.com/api/v3/coins/markets').reply(200, mockApiResponse);

        // Mock Express request and response objects
        const req = {};
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Call the controller function
        await getCryptos(req, res);

        // Verify that the response was sent with status code 200 and the correct crypto list
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockApiResponse);
    });

    it('should return an error response with status code 500 on API request failure', async () => {
        // Mock an error response from the external API
        mock.onGet('https://api.coingecko.com/api/v3/coins/markets').reply(500, { error: 'Internal Server Error' });

        // Mock Express request and response objects
        const req = {};
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Call the controller function
        await getCryptos(req, res);

        // Verify that the response was sent with status code 500 and the correct error message
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
