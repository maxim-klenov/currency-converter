import { useState, useEffect, useRef } from 'react'
import Converter from 'currency-exchanger-js';
import { currencyFormatters } from "./data/currencies.js";
// import './App.css'
// TODO: change type of connection of css
import "./styles/common/fonts.css";
import "./styles/common/normalize.css";
import "./styles/common/variables.css";
import "./styles/common/global.css";
import "./styles/pages/converter.css";
import Dropdown from './components/Dropdown/Dropdown.jsx'

const App = () => {
  const [fromCurrency, setFromCurrency] = useState(localStorage.getItem('fromCurrency') || 'EUR');
  const [toCurrency, setToCurrency] = useState(localStorage.getItem('toCurrency') || 'RUB');
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

    localStorage.setItem("fromCurrency", fromCurrency);
    localStorage.setItem("toCurrency", toCurrency);

    convertCurrency();
  }, [fromCurrency, toCurrency]);

  
  let inputFrom = document.getElementById("currency-from");
  let inputTo = document.getElementById("currency-to");
  const labelFrom = useRef(null);
  const labelTo = useRef(null);
  // output of converter
  const convertMoney = (e) => {
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
      inputFrom.removeAttribute("aria-invalid");
      inputTo.removeAttribute("aria-invalid");
      // in here i should use .RUB but instead i use variable useState [fromCurrency]
    } else if (e.target.id === 'currency-to') {
      inputFrom.value = currencyFormatters[fromCurrency](1 / exchangeRate * amount);
      inputFrom.removeAttribute("aria-invalid");
      inputTo.removeAttribute("aria-invalid");
    }
    if (inputFrom.value === '') {
      return inputTo.value = '';
    } else if (inputTo.value === '') {
      return inputFrom.value = '';
    } else if (inputTo.value.includes('NaN')) {
      inputFrom.setAttribute("aria-invalid", "true");
      return inputTo.value = '?'
    } else if (inputFrom.value.includes('NaN')) {
      inputTo.setAttribute("aria-invalid", "true");
      return inputFrom.value = '?'
    }
  }

  return (
    <article>
      <main className='main container'>
        <section className='converter'>
          <h1 className='title'>Конвертер валют</h1>
          <form className="form" method="get">
            <div className='form__field'>
              <label className='form__field-label' htmlFor="currency-from" ref={labelFrom}>1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</label>
              <div className="form__field-inputs">
                <input className='form__field-input' type="text" name="currency-from" id="currency-from" onChange={convertMoney} autoComplete="off" aria-describedby="input-from-description"/>
                <span className="visually-hidden" id="input-from-description">Введите в поле ввода колличество сколько хотите перевести в {toCurrency}</span>
                <button className='form__field-button' type='button' onClick={toggleDropdownOne} aria-label="открыть меню чтобы выбрать валюту с которой выполнить перевод">
                  <svg className={dropdownOne ? 'rotate-svg' : ''} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentcolor"><path d="M8 12a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L8 9.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 8 12z"></path></svg>
                </button>
                {dropdownOne ? < Dropdown currency={fromCurrency} setCurrency={setFromCurrency} /> : ''}
              </div>
            </div>
            <button className='change-currency' type='button' aria-label='переключать валюты' onClick={switchCurrencies}>
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentcolor"><path d="M2 7h17.148l-2.773 2.219a1 1 0 1 0 1.25 1.562c5.494-4.396 5.156-4.156 5.156-4.156.305-.382.285-1.053-.156-1.406l-5-4a1 1 0 1 0-1.25 1.562L19.148 5H2C.677 5 .679 7 2 7zM22 17H4.852l2.773-2.219c1.031-.827-.216-2.389-1.25-1.562-.141.112-5.044 4.016-5.156 4.156l-.112.195c-.085.171-.106.461-.106.43 0 .249.146.599.375.781l5 4A1 1 0 0 0 7 23c.942 0 1.361-1.191.626-1.781L4.852 19H22a1 1 0 1 0 0-2z"></path></svg>
            </button>
            <div className='form__field'>
              <label className='form__field-label' htmlFor="currency-to" ref={labelTo}>1 {toCurrency} = {(1 / exchangeRate).toFixed(4)} {fromCurrency}</label>
              <div className="form__field-inputs">
                <input className='form__field-input' type="text" name="currency-to" id="currency-to" onChange={convertMoney} autoComplete="off" aria-describedby="input-to-description"/>
                <span className="visually-hidden" id="input-to-description">Введите в поле ввода колличество сколько хотите перевести из {fromCurrency}</span>
                <button className='form__field-button' type='button' onClick={toggleDropdownTwo} aria-label="открыть меню чтобы выбрать валюту в которую перевести валюту">
                  <svg className={dropdownTwo ? 'rotate-svg' : ''} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentcolor"><path d="M8 12a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L8 9.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 8 12z"></path></svg>
                </button>
                {dropdownTwo ? < Dropdown currency={toCurrency} setCurrency={setToCurrency} /> : ''}
              </div>
            </div>
          </form>
        </section>
      </main>
      <aside className="github">
        <a className="github__link" href="https://github.com/maxim-klenov/currency-converter" target="_blank" rel="noopener noreferrer" tabIndex="1" aria-label="открыть github страницу конвертера">
          <svg aria-hidden="true" xmlns="//www.w3.org/2000/svg" viewBox="0 0 250 250" fill="#fff"><path d="M0 0l115 115h15l12 27 108 108V0z" fill="#000"></path><path className="github__link-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16"></path><path className="github__link-body" d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"></path></svg>
        </a>
      </aside>  
    </article>
  )
}

export default App