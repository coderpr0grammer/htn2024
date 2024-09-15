import yahooFinance from 'yahoo-finance2';

// Function to fetch the beta for a single stock
async function getStockBeta(stockSymbol: string): Promise<number | null> {
  try {
    const quoteSummary = await yahooFinance.quoteSummary(stockSymbol, { modules: ['summaryDetail'] });
    const beta = quoteSummary.summaryDetail?.beta;

    if (typeof beta === 'number') {
      return beta;
    } else {
      console.log(`Beta value not available for ${stockSymbol}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching stock beta:', error);
    return null;
  }
}

// Function to calculate the weighted average beta of a portfolio
async function calculateWeightedAverageBeta(portfolio: { symbol: string, value: number }[]): Promise<number | null> {
  const totalPortfolioValue = portfolio.reduce((total, stock) => total + stock.value, 0);

  if (totalPortfolioValue === 0) {
    console.log("The total portfolio value is zero.");
    return null;
  }

  let weightedBetaSum = 0;

  for (const stock of portfolio) {
    const beta = await getStockBeta(stock.symbol);

    if (beta !== null && typeof beta === 'number') {
      const weight = stock.value / totalPortfolioValue;

      if (typeof weight === 'number' && typeof beta === 'number') {
        weightedBetaSum += beta * weight;
      }
    } else {
      console.log(`Skipping ${stock.symbol} as beta is unavailable.`);
    }
  }

  return weightedBetaSum;
}

// Example usage:
const portfolio = [
  { symbol: 'AAPL', value: 10000 }, // $10,000 invested in Apple
  { symbol: 'GOOGL', value: 15000 }, // $15,000 invested in Alphabet
  { symbol: 'TSLA', value: 5000 },   // $5,000 invested in Tesla
  { symbol: 'MSFT', value: 20000 }   // $20,000 invested in Microsoft
];

calculateWeightedAverageBeta(portfolio).then((result) => {
  if (result !== null) {
    console.log('Weighted Average Beta of Portfolio:', result);
  } else {
    console.log('Could not calculate the weighted average beta.');
  }
});
