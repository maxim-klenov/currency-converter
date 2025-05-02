import CheckedIcon from "./CheckedIcon"
export default function Dropdown({currency, setCurrency}) {
  const currencies = [
    { key: 'RUB', label: 'российский рубль'},
    { key: 'USD', label: 'доллар США'},
    { key: 'EUR', label: 'евро'},
    { key: 'TMT', label: 'туркменский манат'},
    { key: 'JPY', label: 'японская иена'},
    { key: 'GBP', label: 'фунт Стерлинга'},
    { key: 'BTC', label: 'bitcoin'},
    { key: 'ETH', label: 'ethereum'},
  ];
  return (
    <div className='dropdown-menu'>
      <ul className='dropdown-menu__list'>
      {currencies.map(({key, label}) => (
        <li key={key} className="dropdown-menu__item" onClick={() => setCurrency(key)}>
          <span className='dropdown-menu__item-currency'>{label}</span>
          <span className='dropdown-menu__item-icon'>
            {currency === key && <CheckedIcon />}
          </span>
        </li>
      ))}
      </ul>
    </div>
  )
}
