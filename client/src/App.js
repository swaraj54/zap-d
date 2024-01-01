import './App.css';
import React, { useState, useEffect } from 'react';
import api from './AxiosConfig';
import CryptoList from './Components/CryptoList';
import toast from 'react-hot-toast';

const App = () => {
  const [cryptoData, setCryptoData] = useState({
    list: [],
    sourceCrypto: '',
    amount: 1,
    targetCurrency: 'usd',
    convertedAmount: null,
    showCryptoList: false,
    selectedCrypto: {
      name: '',
      image: '',
    },
  });

  const fetchCryptoList = async () => {
    try {
      const response = await api.get('/cryptos/get-cryptos');
      setCryptoData((prev) => ({ ...prev, list: response.data }));
    } catch (error) {
      console.error(error);
      toast.error(`${error?.response?.data?.error}, Please try again after 1 min.`);
    }
  };

  useEffect(() => {
    fetchCryptoList();
  }, []);

  const handleConvert = async () => {
    try {
      const { sourceCrypto, amount, targetCurrency } = cryptoData;
      const response = await api.get('/conversions/convert', {
        params: { sourceCrypto, amount, targetCurrency },
      });
      toast.success(`Converted Amount is ${response.data.convertedAmount}`);
      setCryptoData((prev) => ({ ...prev, convertedAmount: response.data.convertedAmount }));
    } catch (error) {
      console.error(error);
    }
  };

  const openCryptoList = () => {
    if (cryptoData.list.length) {
      setCryptoData((prev) => ({ ...prev, showCryptoList: true }));
    } else {
      fetchCryptoList();
    }
  };

  const closeCryptoList = () => {
    setCryptoData((prev) => ({ ...prev, showCryptoList: false }));
  };

  const selectCrypto = (cryptoId, cryptoName, cryptoImage) => {
    setCryptoData((prev) => ({
      ...prev,
      sourceCrypto: cryptoId,
      selectedCrypto: { name: cryptoName, image: cryptoImage },
      showCryptoList: false,
    }));
  };

  return (
    <div className="crypto-converter">
      <h1>Crypto Converter</h1>
      <form className="converter-form">
        <label>Source Cryptocurrency:</label>
        <>
          <button type="button" onClick={openCryptoList}>
            Select Crypto
          </button>
          {cryptoData.showCryptoList && (
            <CryptoList cryptoList={cryptoData.list} selectCrypto={selectCrypto} closeCryptoList={closeCryptoList} />
          )}
        </>
        {cryptoData.sourceCrypto && (
          <div className='selected'>
            <img src={cryptoData.selectedCrypto.image} alt={cryptoData.selectedCrypto.name} />
            <h1>{cryptoData.selectedCrypto.name}</h1>
          </div>
        )}
        <br />
        <br />
        <label>
          Amount:<br />
          <input type="number" required value={cryptoData.amount} onChange={(e) => setCryptoData((prev) => ({ ...prev, amount: e.target.value }))} />
        </label>
        <br />
        <label>
          Target Currency:<br />
          <input
            required
            type="text"
            value={cryptoData.targetCurrency}
            onChange={(e) => setCryptoData((prev) => ({ ...prev, targetCurrency: e.target.value }))}
          />
        </label>
        <br />
        <button disabled={!cryptoData.sourceCrypto} type="button" onClick={handleConvert}>
          Convert
        </button>
      </form>
      {cryptoData.convertedAmount !== null && (
        <div className="converted-amount">
          <h2>Converted Amount:</h2>
          <h1>
            {cryptoData.convertedAmount} {cryptoData.targetCurrency}
          </h1>
        </div>
      )}
    </div>
  );
};

export default App;
