// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// // import axios from 'axios';

// export const CertificateList = () => {
//     const [certificates, setCertificates] = useState([]);
//     const [selectedCertId, setSelectedCertId] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedPrice, setSelectedPrice] = useState(null);

//     // const navigate = useNavigate()

//     // const fetchCertificates = async () => {
//     //     try {
//     //       const response = await fetch('/api', {
//     //         method: 'POST',
//     //         headers: {
//     //           'Accept': 'application/json',
//     //           'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({
//     //           ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
//     //           MethodName: 'OSGetGoodList',
//     //         }),
//     //       });

//     //       if (!response.ok) {
//     //         throw new Error(`Ошибка HTTP: ${response.status}`);
//     //       }
      
      
//     //       const data = await response.json();
//     //       console.log(data);
      
//     //       if (data.result === 0) {
//     //         setCertificates(data.data);
//     //       } else {
//     //         throw new Error(data.resultdescription || 'Ошибка загрузки данных');
//     //       }
//     //     } catch (error) {
//     //       console.error('Ошибка:', error);
//     //     }
//     //   };
//     //   useEffect(() => {
//     //     fetchCertificates();
//     //   }, []);



// // const fetchCertificates = async () => {
// //   try {
// //     const response = await axios.post('http://localhost:4000/proxy', {
// //       ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
// //       MethodName: 'OSGetGoodList',
// //     });

// //     console.log('Ответ от сервера:', response.data);
// //     // Обработайте данные как нужно
// //   } catch (error) {
// //     console.error('Ошибка запроса:', error);
// //   }
// // };

// // // Вызов функции
// // fetchCertificates();



// const fetchCertificates = async () => {
//     try {
//       const response = await fetch('/api', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
//           MethodName: 'OSGetGoodList',
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Ошибка HTTP: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log(data); // Для отладки, чтобы увидеть данные в консоли
  
//       if (data.result === 0) {
//         return setCertificates(data.data); // Возвращаем массив сертификатов
//       } else {
//         throw new Error(data.resultdescription || 'Ошибка загрузки данных');
//       }
//     } catch (error) {
//       console.error('Ошибка:', error);
//       return [];
//     }
//   };
  
//   useEffect(() => {
//     fetchCertificates()
//   }, [])

//   const handleSelection = (e) => {
//     const selectedId = e.target.value;
//     setSelectedCertId(selectedId);

//     // Найдем цену выбранного сертификата
//     const selectedCert = certificates.find((cert) => cert.Id === selectedId);
//     setSelectedPrice(selectedCert ? selectedCert.Price : null);
//   };

//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>Ошибка: {error}</div>;

//     return (
//         <div>
//             <h1>Choose the Certificate</h1>

//             <label htmlFor='certificate-dropdown'>Pick</label>
//             <select id="certificate-dropdown" onChange={handleSelection} defaultValue="">
//                 <option value="" disabled>Выберите...</option>
//                 {certificates.map((element) => (
//                     <option key={element.Id} value={element.Id}>
//                         {element.Name}
//                     </option>
//                 ))}
//             </select>

//             {selectedCertId && (
//                 <div>

//                     <div style={{ marginTop: '20px' }}>
//                         <h2>Цена выбранного сертификата: {selectedPrice} руб.</h2>
//                     </div>

//                     <button
//                     style={{ marginTop: '10px' }}
//                     onClick={() =>
//                         navigate('/contact', { state: { certId: selectedCertId } })
//                     }
//                     >
//                         Оформить
//                     </button>

//                 </div>
//             )}
           
//         </div>
//     )

// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const CertificateList = () => {
  const [certificates, setCertificates] = useState([]); // Список сертификатов
  const [selectedCertificate, setSelectedCertificate] = useState(null); // Выбранный сертификат
  const [error, setError] = useState(null); // Ошибки
  const [loading, setLoading] = useState(true); // Состояние загрузки

  const navigate = useNavigate()

  const baseUrl = 'https://sycret.ru/service/api/api';

  // Функция для загрузки данных
  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ApiKey: "011ba11bdcad4fa396660c2ec447ef14", // Ваш API Key
          MethidName: "OSGetGoodList", // Название метода
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.result === 0) {
        setCertificates(data.data); // Устанавливаем список сертификатов
      } else {
        setError(data.resultdescription || "Ошибка загрузки данных");
      }
    } catch (err) {
      setError("Ошибка при подключении к серверу");
    } finally {
      setLoading(false);
    }
  };

  // Используем useEffect для вызова fetchCertificates при загрузке компонента
  useEffect(() => {
    fetchCertificates();
  }, []);

  // Обработчик выбора сертификата
  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const certificate = certificates.find((cert) => cert.ID === selectedId);
    setSelectedCertificate(certificate);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Выберите сертификат</h1>
      {/* Dropdown для выбора сертификата */}
      <select onChange={handleSelect} defaultValue="">
        <option value="" disabled>
          -- Выберите сертификат --
        </option>
        {certificates.map((cert) => (
          <option key={cert.ID} value={cert.ID}>
            {cert.NAME}
          </option>
        ))}
      </select>

      {/* Отображение цены выбранного сертификата */}
      {selectedCertificate && (

        <div style={{ marginTop: "20px" }}>
            <div>
                <h2>Информация о сертификате</h2>
                <p><strong>Название:</strong> {selectedCertificate.NAME}</p>
                <p><strong>Цена:</strong> {selectedCertificate.PRICE} руб.</p>
                <p><strong>Сумма со скидкой:</strong> {selectedCertificate.SUMMA} руб.</p>
                <p><strong>Скидка:</strong> {selectedCertificate.DISCOUNT}%</p>
            </div>
            <button
                style={{ marginTop: '10px' }}
                onClick={() =>
                    navigate('/contact', { state: { certId: selectedCertificate.ID } })
                }
                >
                    Оформить
            </button>
        </div>
      )}
    </div>
  );
};

