import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='loading'>
        <p className='oops'>
            Oops!
        </p>
        <p >404 - Page not found!</p>
        <Link to='/' className='center'>
            <FaHome />
            &nbsp;
            Back To Home
        </Link>
    </div>
  )
}

export default NotFound