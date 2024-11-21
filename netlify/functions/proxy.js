const fetch = require("node-fetch");

exports.handler = async (event) => {
  const apiUrl = "https://sycret.ru/service/api/api";

  try {
    // Пробрасываем тело и заголовки запроса к внешнему API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: event.body, // Передаем тело запроса из клиента
    });

    const data = await response.json();

    // Возвращаем результат клиенту
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Обработка ошибок
    console.error("Ошибка прокси-сервера:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Ошибка на стороне прокси-сервера" }),
    };
  }
};
