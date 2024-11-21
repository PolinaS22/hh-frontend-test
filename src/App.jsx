import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CertificateList } from './components/CertificateList';
import { PaymentPlaceholder } from './components/PaymentPlaceholder';
import { ContactForm } from './components/ContactForm';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<CertificateList/>}/>
        <Route exact path='/form' element={<ContactForm/>}/>
        <Route exact path='/payment' element={<PaymentPlaceholder/>}/>
      </Routes>
    </Router>
  )
}

export default App
