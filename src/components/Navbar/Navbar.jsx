import React from 'react';
// import { ReactComponent as Logo} from '../../assets/chantflow-logo.svg';
import chantflowLogo from "../../assets/chantflow-logo.svg"
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useGetProfileQuery, useLogoutMutation } from '../../app/api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function Navbar() {
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const {data: user, isLoading: loadingUser, error: errorLoading, refetch: refetchUserProfile} = useGetProfileQuery()

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap()
      console.log('response: ', response);

      await refetchUserProfile()
      await toast.success('Logged Out succesfully!')
      navigate('/')
    } catch(err) {
      toast.error(err?.data?.msg || "Logout failed");
    }
  }

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
        {loadingUser ? (<li><LoadingScreen /></li>)
          : errorLoading ? ( <li><Link to="/login">Login</Link></li>)
          : <>
          <li><FontAwesomeIcon icon={faUser} /> {user?.name}</li>
          <li><Link onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></Link> </li>
          </>
          }
      </div>
    </div>
  )
}

export default Navbar;
