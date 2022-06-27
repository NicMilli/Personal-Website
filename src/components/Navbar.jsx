import {Link} from 'react-router-dom'
import {navItems} from './navItems'
import FullLogo from '../assets/Images/FullLogo.png'

function Navbar() {
  return (
    <nav className='navbar'>
              <div className="twenty">
              <Link  to='/' className='menu'>
                {/* <h1>Nic</h1> */}
                <img src={FullLogo} alt="myLogo" className='myIcon'/>
              </Link>
              </div>

              <div className="eighty">
              <ul className='navItems'>
              {navItems.map(item => {
                return(
                <li key={item.id} className='navItem' >
                  <Link to={item.path}><p className='navTitle'>{item.title}</p></Link>
                </li>
                )
              })}
              </ul>
              </div>
            
    </nav>
  )
}


export default Navbar