import {FaGithub, FaLinkedin} from 'react-icons/fa'

function Home() {
  return (
    <div className='homeColor'>
      
        <div className="bubble a"></div>
        <div className="bubble b"></div>
        <div className="bubble c"></div>
        <div className="bubble d"></div>
        <div className="bubble e"></div>
        <div className="bubble f"></div>
        <div className="bubble g"></div>
        <div className="bubble h"></div>
        <div className="bubble i"></div>
        <div className="bubble j"></div>
        <div className="bubble k"></div>

        <div className='titleBox'>
          <h1 className="homeTitle respTitle">
            Nicholas Milligan
            <br></br>
            <div className="links">
              <a  target='_blank' rel='noreferrer noreopener' href='https://github.com/NicMilli'>
                <FaGithub className='icon' />
              </a>
              &nbsp;
              <a  target='_blank' rel='noreferrer noreopener' href='https://www.linkedin.com/in/nicholas-milligan-5ba6971a5/'>
                <FaLinkedin className='icon' />
              </a>
            </div>
          </h1>
        </div>
    </div>
  )
}

export default Home