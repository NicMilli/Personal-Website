import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div >
      <div >
          <div >
              <h1 >
                  Oops!
              </h1>
              <p >404 - Page not found!</p>
              <Link to='/' >
                  <FaHome />
                  Back To Home
              </Link>
          </div>
      </div>
    </div>
  )
}

export default NotFound