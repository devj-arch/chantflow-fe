import React from 'react';
// import { ReactComponent as Logo} from '../../assets/chantflow-logo.svg';
import chantflowLogo from "../../assets/chantflow-logo.svg"
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  return (
    <div className='nav'>
      <Link to="/" className='chantflow'>
      {/* TODO: fix on load */}
        <div className={localStorage.getItem('theme')==='dark' ? 'chantflow-logo-dark' : 'chantflow-logo'}><img src={chantflowLogo} alt='chantflow logo'></img></div>
        <div className='chantflow-title'>ChantFlow</div>
      </Link>
      <div className='menu-bar'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/chant">Chant</Link></li>
      </div>
    </div>
  )
}

export default Navbar;
