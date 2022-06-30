import {doc, getDoc,} from 'firebase/firestore'
import {db} from '../firebase.config'
import {getAuth} from 'firebase/auth'
import Loading from "../components/Loading"
import { useState, useEffect } from "react"
import TechStack from '../components/TechStack'

function About() {
  const [content, setContent] = useState([])
  const [fetching, setFetching] = useState(true)

  getAuth()

useEffect(() => {
  const fetchContents = async() => {
      const Ref = doc(db, 'Portfolio', 'Assets')
      const Snap = await getDoc(Ref)

      if(Snap.exists()) {
          setContent(Snap.data())
          setFetching(false)
      }
    }

  fetchContents()
}, [])

if(fetching) {
  return <div className='topSpace'><Loading/></div>
}

  return (
    <div className='aboutPage'>
      <p className="pageHeader"> About Nicholas </p>
      
        <div className='center abt'>
          <img src={content.myPic.url} alt="Profile" className='myPic setLeft'/>
          {content.myPic.description ? content.myPic.description : null}
          <p className='aboutBody setRight'>
            {content.Paragraph1 ? content.Paragraph1 : null}
          </p> 
        </div>
        <div className="clear"></div>

        <p className='aboutBody pink'>
          {content.tagline ? content.tagline : null}
        </p>
        <br />

        <span>
          <img src={content.SABass.url} alt="Magazine Cover" className='SABass'/>
          <p>{content.SABass.description ? content.SABass.description : null}</p>
        </span>
        <br />

        <p className='aboutBody'>
          {content.Paragraph2 ? content.Paragraph2 : null}
          <br /> <br />
          His tech stack includes but is not limited to: 
          <br />   
        </p>
      <TechStack/>
    </div>
  )
}


export default About