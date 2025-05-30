import CheckedIcon from "../CheckedIcon"
import styles from './Dropdown.module.css';
export default function Dropdown({currency, setCurrency}) {
  const currencies = [
    { key: 'RUB', label: 'российский рубль'},
    { key: 'USD', label: 'доллар США'},
    { key: 'EUR', label: 'евро'},
    { key: 'TRY', label: 'турецкая лира'},
    { key: 'UAH', label: 'украинская гривна'},
    { key: 'BYN', label: 'белорусский рубль'},
    { key: 'TMT', label: 'туркменский манат'},
    { key: 'JPY', label: 'японская иена'},
    { key: 'GBP', label: 'фунт Стерлинга'},
    { key: 'BTC', label: 'bitcoin'},
    { key: 'ETH', label: 'ethereum'},
  ];
  return (
    <div className={styles["dropdown"]}>
      <ul className={styles["list"]}>
      {currencies.map(({key, label}) => (
        <li key={key} className={styles["list__item"]} onClick={() => setCurrency(key)} tabIndex={0}>
          <span className={styles["list__item-currency"]}>{label}</span>
          <span className={styles["list__item-icon"]}>
            {currency === key && <CheckedIcon />}
          </span>
        </li>
      ))}
      </ul>
    </div>
  )
}
