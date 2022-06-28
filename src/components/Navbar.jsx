import {Link} from 'react-router-dom'
import {navItems} from './navItems'
import FullLogo from '../assets/Images/FullLogo.png'

function Navbar() {
  return (
    <nav className='navbar'>
      <div className="twenty">
        <Link  to='/'>
          <img src={FullLogo} alt="myLogo" className='myIcon'/>
        </Link>
      </div>

      <div className="eighty">
        {navItems.map((item) => {
          return(
            <li key={item.id} className='navItem center' >
              <Link to={item.path}><p className='navTitle'>{item.title}</p></Link>
            </li>
                )
        })}
      </div>
            
    </nav>
  )
}


export default Navbar