import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(1);
  const [coinInfo, setCoinInfo] = useState([]);
  const saveCoinInfo = (source) => {
    setCoinInfo([
      source.name,
      source.symbol,
      source.quotes.USD.price,
      source.last_updated,
    ]);
  };
  const onChange = (e) => {
    setAmount(e.target.value);
  };
  const onSelect = (e) => {
    saveCoinInfo(JSON.parse(e.target.value));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        saveCoinInfo(json[0]);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <>
          <h2>Dollor to {coinInfo[0]}</h2>
          <div>LastUpdated at : {coinInfo[3]}</div>
          <hr />
          <div>
            <label htmlFor="money">
              How much Dollar do you want exchange to {coinInfo[0]}?
            </label>
          </div>
          <input
            id="money"
            type="number"
            placeholder="input your Dollar amount"
            value={amount}
            onChange={onChange}
          />
          <div>
            <select onChange={onSelect}>
              {coins.map((coin) => (
                <option key={coin.id} value={JSON.stringify(coin)}>
                  {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
            <hr />
            <div>
              <strong>
                ${amount} = {amount / coinInfo[2]} {coinInfo[1]}
              </strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
