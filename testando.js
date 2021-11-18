const expense = {
  id: 1,
  value: 10,
  description: 'a',
  currency: 'b',
  method: 'c',
  tag: 'd',
};

const currency = [{
  "code":"USD",
  "codein":"BRL",
  "name":"Dólar Comercial",
  "high":"5.6689",
  "low":"5.6071",
  "varBid":"-0.0166",
  "pctChange":"-0.29",
  "bid":"5.6173",
  "ask":"5.6183",
  "timestamp":"1601476370",
  "create_date":"2020-09-30 11:32:53"
  },
  {
    "code":"USD",
    "codein":"BRL",
    "name":"Dólar Comercial",
    "high":"5.6689",
    "low":"5.6071",
    "varBid":"-0.0166",
    "pctChange":"-0.29",
    "bid":"5.6173",
    "ask":"5.6183",
    "timestamp":"1601476370",
    "create_date":"2020-09-30 11:32:53"
    }
];

  const newObj = {
    ...expense, exchangeRates: currency
  }

  console.log(newObj)

