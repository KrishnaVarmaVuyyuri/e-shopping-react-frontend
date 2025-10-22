import { NavLink,useNavigate, useSearchParams } from 'react-router';
import './header.css';
import { ThemeContext } from "../../ThemeContext";
import { useContext, useState } from "react";

export default function Header({cart}) {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search')
  const[searchInput,setSearchInput]=useState(searchValue || '')

  const navigate = useNavigate()

  let totalQuantity = 0
  cart.forEach((cartItem)=>{
    totalQuantity = totalQuantity + cartItem.quantity;
  })
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`header ${theme}`}>
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input value={searchInput} onChange={(e)=>{
          setSearchInput(e.target.value)
        }} className="search-bar" type="text" placeholder="Search" />

        <button className="search-button" onClick={()=>{
          navigate(`/?search=${searchInput}`)
          
        }}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </div>
  );
}