import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ContactForm = () => {
const location = useLocation();
const navigate = useNavigate();
const { certificate } = location.state || {}; 
const [error, setError] = useState(""); 
const [isSubmitting, setIsSubmitting] = useState(false); 
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
});

useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
}, []);

const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData((prevData) => {
      const updatedFormData = { ...prevData, [name]: value };
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
  
      return updatedFormData;
    });
  };


const validateForm = () => {
  const { name, phone, email } = formData;
  if (!name || !phone || !email) {
    setError("Все поля обязательны для заполнения!");
    return false;
  }
  setError(""); 
  return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }
  setIsSubmitting(true);

try {
    const response = await fetch("http://localhost:8080/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
        MethodName: "OSSale",
        Id: certificate.ID,
        TableName: certificate.TableName,
        PrimaryKey: certificate.Generic_key,
        Price: certificate.PRICE,
        Summa: certificate.SUMMA || certificate.PRICE, 
        ClientName: formData.name,
        Phone: (() => {
            let digitsOnly = formData.phone.replace(/\D/g, ""); 
            if (digitsOnly.startsWith("8") || digitsOnly.startsWith("7")) {
              digitsOnly = digitsOnly.slice(1); 
            } 
            return digitsOnly.slice(0, 10); 
          })(),
        Email: formData.email,
        PaymentTypeId: 2, 
        UseDelivery: 0, 
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }

    const result = await response.json();
    console.log(result)
    if (result.result !== 0) {
      throw new Error(result.resultdescription || "Ошибка при сохранении данных");
    }

    alert("Данные успешно отправлены!");
    navigate("/payment"); 
  } catch (err) {
    console.error("Ошибка при сохранении данных:", err);
    setError("Ошибка при отправке данных. Попробуйте ещё раз.");
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <div>
    <h1>Заполнение данных для оформления</h1>
    {certificate && (
      <div className="selected-certificate">
        <h2>Выбранный сертификат:</h2>
        <p><strong>Название:</strong> {certificate.NAME}</p>
        <p><strong>Цена:</strong> {certificate.PRICE} руб.</p>
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Имя:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Телефон:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Почта:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button type="button" 
        onClick={() => navigate("/")}
        style={{ background: "rgb(187, 180, 180)" }}
        >
          Назад
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Оплатить"}
        </button>
      </div>
    </form>
  </div>
);
};

