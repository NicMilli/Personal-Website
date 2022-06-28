import { useState, useEffect } from "react"
import { FaFileArchive, FaLaptopCode, FaGithub } from "react-icons/fa"
import {doc, getDoc,} from 'firebase/firestore'
import {db} from '../firebase.config'
import {getAuth} from 'firebase/auth'
import Loading from "../components/Loading"

function TechStack() {
    const [icons, setIcons] = useState({})
    const [fetching, setFetching] = useState(true)
    
    getAuth()
    
    useEffect(() => {
      const fetchIcons = async() => {
          const iconRef = doc(db, 'Portfolio', 'StackIcons')
          const iconSnap = await getDoc(iconRef)
    
          if(iconSnap.exists()) {
              setIcons(iconSnap.data())
              setFetching(false)
          }
          
      }
    
      fetchIcons()
    }, [])

const {Languages, Frameworks} = icons

    if(fetching) {
        return <><Loading/></>
      }

  return (
    <>
    Languages:
    <br />
    {Object.keys(Languages).sort((a, b) => {
            if (Languages[a].rank < Languages[b].rank) {
            return -1;
            } else if (Languages[b].rank < Languages[a].rank) {
            return 1;
            } else {
            return a.localeCompare(b);
            }
          }).map((key) => {
        return(
        <img key={key} src={Languages[key].src} 
        alt={key} className={Languages[key].cName}/>
        )
    })}
    <br />
       
             Frameworks and Technologies:
             <br />
             {Object.keys(Frameworks).sort((a, b) => {
            if (Frameworks[a].rank < Frameworks[b].rank) {
            return -1;
            } else if (Frameworks[b].rank < Frameworks[a].rank) {
            return 1;
            } else {
            return a.localeCompare(b);
            }
          }).map((key) => {
        return(
        <img key={key} src={Frameworks[key].src} 
        alt={key} className={Frameworks[key].cName}/>
        )
    })}
    </>
  )
}

export default TechStack