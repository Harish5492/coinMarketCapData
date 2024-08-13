import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const apikey = '2ad9f937-58a4-458b-8613-72a2dc7350ef'; // Replace with your CoinMarketCap API key

// Enable CORS for all origins
app.use(cors());

const getListing = async (filter) => {
  let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apikey}`;
  let url_ = filter ? `${url}&sort=${filter}` : url;
  const response = await fetch(url_);
  return await response.json();
};

app.get('/api/listing', async (req, res) => {
  try {
    const { sort } = req.query;
    const getCoinMarketData = await getListing(sort);
    res.status(200).json({
      status: 'success',
      message: 'Service is healthy',
      data: getCoinMarketData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
