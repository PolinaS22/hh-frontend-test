import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const CertificateList = () => {
  const [certificates, setCertificates] = useState([]); 
  const [selectedCertificate, setSelectedCertificate] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const fetchCertificates = async () => {
    try {
      const response = await fetch("https://hh-backend-test-1.onrender.com/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
          MethodName: "OSGetGoodList",
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.result === 0) {
        setCertificates(data.data); 
      } else {
        setError(data.resultdescription || "Ошибка загрузки данных");
      }
    } catch (err) {
      setError("Ошибка при подключении к серверу");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const certificate = certificates.find((item) => item.ID === selectedId);
    setSelectedCertificate(certificate);
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
  return (
    <div className="container">
      <h1>Выберите сертификат</h1>
      <select onChange={handleSelect} defaultValue="">
        <option value="" disabled>
          Выберите сертификат
        </option>
        {certificates.map((item) => (
          <option key={item.ID} value={item.ID}>
            {item.NAME}
          </option>
        ))}
      </select>

      {selectedCertificate && (
        <div className="card">
            <h2>Информация о сертификате</h2>
            <p><strong>Название:</strong> {selectedCertificate.NAME}</p>
            <p><strong>Цена:</strong> {selectedCertificate.PRICE} руб.</p>
            <p><strong>Сумма со скидкой:</strong> {selectedCertificate.SUMMA} руб.</p>
            <p><strong>Скидка:</strong> {selectedCertificate.DISCOUNT}%</p>
            <button
            style={{ marginTop: "10px" }}
            onClick={() =>
              navigate("/form", { state: { certificate: selectedCertificate } })
            }
            >
              Оформить
            </button>
          </div>         
      )}
    </div>
  );
};

