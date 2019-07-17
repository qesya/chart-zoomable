export default function getData () {
  return Promise.resolve([{
    date: new Date().toISOString(),
    volume: 11274968.896017049,
    price_usd: 0.35,
    volume_usd: 3893580.3
  },
  {
    date: new Date().toISOString(),
    volume: 6752469.044198098,
    price_usd: 0.35,
    volume_usd: 2255476.74
  }])
};
