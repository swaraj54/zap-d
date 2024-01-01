import React from 'react';

const CryptoList = ({ cryptoList, selectCrypto, closeCryptoList }) => {
    return (
        <div >
            <div className="crypto-list-container">
                {cryptoList.map((crypto) => (
                    <div className="crypto-item" key={crypto.id} onClick={(e) => { e.preventDefault(); selectCrypto(crypto.id, crypto.name, crypto.image); }}>
                        <img src={crypto.image} alt={crypto.name} />
                        <span>{crypto.name}</span>
                        <span>({crypto.symbol})</span>
                    </div>
                ))}
            </div>
            <br />
            <button onClick={(e) => { e.preventDefault(); closeCryptoList(); }}>Close</button>
        </div >
    );
};

export default CryptoList;
