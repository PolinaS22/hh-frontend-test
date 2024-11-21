// netlify/functions/proxy.js
const fetch = await import('node-fetch');

exports.handler = async (event, context) => {
  const apiUrl = 'https://sycret.ru/service/api/api';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ApiKey: "011ba11bdcad4fa396660c2ec447ef14", 
        MethidName: "OSGetGoodList", 
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }),
    };
  }
};
