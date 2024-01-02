import axios from "axios";

export const getCryptos = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
            },
            headers: {
                'Content-Type': 'application/json',
                'X-CoinGecko-API-Key': process.env.COINGECKO_API_KEY,
            },
        });

        const cryptoList = response.data.map((crypto) => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            image: crypto.image
        }));

        // Successful response with status code 200
        res.status(200).json(cryptoList);
    } catch (error) {
        // Internal Server Error with status code 500
        res.status(500).json({ error: error?.response?.statusText });
    }
}