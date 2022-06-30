import {Link} from 'react-router-dom'
import {navItems} from './navItems'
import FullLogo from '../assets/Images/FullLogo.png'
import { FaTimes, FaBars } from 'react-icons/fa'
import { useState } from 'react'

function Navbar() {
const [click, setClick] = useState(false)

const onClick = () => { setClick(!click) }
const exitMenu = () => { setClick(false) }

// const onMouseEnter = () => {
//   if (window.innerWidth < 1100) {
//     setDropdown(false);
//   } else {
//     setDropdown(true);
//   }
// };

// const onMouseLeave = () => {
//   if (window.innerWidth < 1100) {
//     setDropdown(false);
//   } else {
//     setDropdown(false);
//   }
// };

  return (
    <nav className='navbar'>
      <div className="twenty">
        <Link  to='/'>
          <img src={FullLogo} alt="myLogo" className='myIcon'/>
        </Link>
      </div>

      <div className="eightylg">
        {navItems.map((item) => {
          return(
            <li key={item.id} className='navItem center' >
              <Link to={item.path}><p className='navTitle'>{item.title}</p></Link>
            </li>
                )
        })}
      </div>

      <div className="eightysm">
        {click 
        ? <FaTimes size={30} className='dropIcon' onClick={onClick} /> 
        : <FaBars size={30} className='dropIcon' onClick={onClick} />}
      </div>

      {click 
      ? <div className="dropdown center">
        <ul className="menuList">
      {navItems.map((item) => {
        return(
          <li key={item.id} className='dropItem' >
            <Link to={item.path}><p className='dropTitle center' onClick={exitMenu} >{item.title}</p></Link>
          </li>
              )
      })}
      </ul>
    </div>
    : null }
            
    </nav>
  )
}


export default Navbar