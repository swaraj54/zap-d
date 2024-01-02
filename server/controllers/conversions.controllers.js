import axios from "axios";

export const convert = async (req, res) => {
    const { sourceCrypto, amount, targetCurrency } = req.query;

    // Mandatory check for req.query parameters
    if (!sourceCrypto || !amount || !targetCurrency) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: sourceCrypto,
                vs_currencies: targetCurrency,
                'x_cg_demo_api_key': process.env.COINGECKO_API_KEY,
            }
        });

        const exchangeRate = response.data[sourceCrypto][targetCurrency];
        const convertedAmount = amount * exchangeRate;

        // Successful response with status code 200
        res.status(200).json({ sourceCrypto, amount, targetCurrency, convertedAmount });
    } catch (error) {
        console.error(error);
        // Internal Server Error with status code 500
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
