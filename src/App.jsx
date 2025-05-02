import { useState, useEffect, useRef } from 'react'
import Converter from 'currency-exchanger-js';
import { currencyFormatters } from "./data/currencies.js";
import './App.css'
import Dropdown from './components/Dropdown'

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('RUB');
  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }
  // dropdown functionality
  const [dropdownOne, setDropdownOne] = useState(false);
  const [dropdownTwo, setDropdownTwo] = useState(false);
  useEffect(() => {
    const handleCLickOutside = (e) => {
      if (!e.target.closest('.form__field-inputs')) {
        setDropdownOne(false);
        setDropdownTwo(false);
      } 
    }
    document.addEventListener('click', handleCLickOutside)
    return () => {
      document.removeEventListener('click', handleCLickOutside)
    }
  }, [])
  
  const toggleDropdownOne = () => {
    setDropdownOne(!dropdownOne);
    setDropdownTwo(false);
  }
  const toggleDropdownTwo = () => {
    setDropdownTwo(!dropdownTwo);
    setDropdownOne(false);
  }



  // convertation process
  const [exchangeRate, setExchangeRate] = useState(0);
  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const result = await Converter.convert(1, fromCurrency.toLowerCase(), toCurrency.toLowerCase());
        setExchangeRate(result);
      } catch (error) {
        console.error(error);
      }
    };
    
    let inputFrom = document.getElementById("currency-from");
    let inputTo = document.getElementById("currency-to");
    inputTo.value = '';
    inputFrom.value = ''; 

    setDropdownOne(false);
    setDropdownTwo(false);

    convertCurrency();
  }, [fromCurrency, toCurrency]);

  const labelFrom = useRef(null);
  const labelTo = useRef(null);
  // output of converter
  const convertMoney = (e) => {
    let inputFrom = document.getElementById("currency-from");
    let inputTo = document.getElementById("currency-to");
    let amount = parseInt(e.target.value);
  

    // check if empty   
    if (e.target.value.trim() !== '') {
      labelFrom.current.style.transform = 'translate(-5px, -15px)';
      labelFrom.current.style.fontSize = '0.8rem';
      labelFrom.current.style.backgroundColor = '#fff';
      labelTo.current.style.transform = 'translate(-5px, -15px)';
      labelTo.current.style.fontSize = '0.8rem';
      labelTo.current.style.backgroundColor = '#fff';
    }
    

    if (e.target.id === 'currency-from') {
      inputTo.value = currencyFormatters[toCurrency](exchangeRate * amount); 
      // in here i should use .RUB but instead i use variable useState [fromCurrency]
    } else if (e.target.id === 'currency-to') {
      inputFrom.value = currencyFormatters[fromCurrency](1 / exchangeRate * amount);
    }
  }

  return (
    <main className='main container'>
      <section className='converter'>
        <h1 className='title'>Конвертер валют</h1>
        <form className='form' action="" method="get">
          <div className='form__field'>
            <label className='form__field-label' htmlFor="currency-from" ref={labelFrom}>1 {fromCurrency} = {exchangeRate.toFixed(4)}</label>
            <div className="form__field-inputs">
              <input className='form__field-input' type="text" name="currency-from" id="currency-from" onChange={convertMoney} autoComplete="off"/>
              <button className='form__field-button' type='button' onClick={toggleDropdownOne} aria-label="открыть меню чтобы выбрать валюту с которой выполнить перевод">
                <svg className={dropdownOne ? 'rotate-svg' : ''} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentcolor"><path d="M8 12a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L8 9.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 8 12z"></path></svg>
              </button>
              {dropdownOne ? < Dropdown currency={fromCurrency} setCurrency={setFromCurrency} /> : ''}
            </div>
          </div>
          <button className='change-currency' type='button' aria-label='switch currencies' onClick={switchCurrencies}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentcolor"><path d="M2 7h17.148l-2.773 2.219a1 1 0 1 0 1.25 1.562c5.494-4.396 5.156-4.156 5.156-4.156.305-.382.285-1.053-.156-1.406l-5-4a1 1 0 1 0-1.25 1.562L19.148 5H2C.677 5 .679 7 2 7zM22 17H4.852l2.773-2.219c1.031-.827-.216-2.389-1.25-1.562-.141.112-5.044 4.016-5.156 4.156l-.112.195c-.085.171-.106.461-.106.43 0 .249.146.599.375.781l5 4A1 1 0 0 0 7 23c.942 0 1.361-1.191.626-1.781L4.852 19H22a1 1 0 1 0 0-2z"></path></svg>
          </button>
          <div className='form__field'>
            <label className='form__field-label' htmlFor="currency-to" ref={labelTo}>1 {toCurrency} = {(1 / exchangeRate).toFixed(4)}</label>
            <div className="form__field-inputs">
              <input className='form__field-input' type="text" name="currency-to" id="currency-to" onChange={convertMoney} autoComplete="off"/>
              <button className='form__field-button' type='button' onClick={toggleDropdownTwo} aria-label="открыть меню чтобы выбрать валюту в которую перевести валюту">
                <svg className={dropdownTwo ? 'rotate-svg' : ''} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentcolor"><path d="M8 12a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L8 9.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 8 12z"></path></svg>
              </button>
              {dropdownTwo ? < Dropdown currency={toCurrency} setCurrency={setToCurrency} /> : ''}
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default App