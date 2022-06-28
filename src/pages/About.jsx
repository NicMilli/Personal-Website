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
  return <><Loading/></>
}

  return (
    <div className='aboutPage'>
      <p className="pageHeader"> About Me </p>
             <div className="columns">
        
             <div className="setLeft">
               <img src={content.myPic.url} alt="Profile" className='myPic'/>
               {content.myPic.description ? content.myPic.description : null}
             </div>
             <div className="setRight">
               <p className='aboutBody'>
               {content.Paragraph1 ? content.Paragraph1 : null}
               </p> 
             </div>
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

// import myPic from '../assets/Images/myPic.jpg'
// import SABass from '../assets/Images/SABass.jpg'

// import {doc, getDoc,} from 'firebase/firestore'
// import {db} from '../firebase.config'
// import {getAuth} from 'firebase/auth'
// import Loading from "../components/Loading"
// import { useState, useEffect } from "react"

// function About() {
//   const [content, setContent] = useState([])
//   const [fetching, setFetching] = useState(true)

//   getAuth()

// useEffect(() => {
//   const fetchContents = async() => {
//       const Ref = doc(db, 'Portfolio', 'Category')
//       const Snap = await getDoc(Ref)

//       if(Snap.exists()) {
//           setContent(Snap.data())
//           setFetching(false)
//       }
//     }

//   fetchContents()
// }, [])

// if(fetching) {
//   return <><Loading/></>
// }

//   return (
//     <div className='aboutPage'>
//       <p className="pageHeader"> About Me </p>
//       <div className="columns">
//       <div className="setLeft">
//         <img src={myPic} alt="Profile" className='myPic'/>
//       </div>
//       <div className="setRight">
//         <p className='aboutBody'>
//           Born in South Africa, Nicholas developed a deep love for the outdoors. 
//           He went from snake hunter to semi-professional bass angler. The latter led him to many great opportunities.
//           He captain the South African U-19 bass fishing team from 2013-2015; he was a junior field editor as well as monthly columnist for the national magazine, SA Bass.
//           He served as a brand ambassador for Mercury Marine, Livingston Lures and Afribaits; which involved presenting workshops at club meetings and speaking at tournaments.
//         </p> 
//       </div>
//       </div>
//       <div className="clear"></div>
//       <br />
//       <p className='aboutBody pink'>
//         He loves to solve problems! It was in South Africa that he learn't t find solutions with limited resources.
//       </p>
//       <br />
//       <span>
//         <img src={SABass} alt="Magazine Cover" className='SABass'/>
//         Nic on the cover of SA Bass magazine
//       </span>
//       <br />
//       <p className='aboutBody'>Nicholas earned a bachelor’s degree in chemical engineering from the University of California, Davis. 
//       He also participated in an internship helping with the design and scale up of a novel sonication reactor with Khepra Inc. in San Francisco. 
//       Since then, he has taken an interest in blockchain technologies. 
//       He has learnt how to develop smart contracts using Solidity. 
//       This led to the need to know how to deploy these contracts as web applications with React.js.
//       He has now expanded his knowledge to encompass full-stack software engineering.
//       <br /> <br />
//       His tech stack includes but is not limited to: 
//       <br />   
//       </p>
//       Languages:
//       <br />
//       <img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E' 
//       alt="JavaScript" className='TechStack'/>
//       <img src='https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue' 
//       alt="Python" className='TechStack'/>
//       <img src='https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black' 
//       alt="Solidity" className='TechStack'/>
//       <img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' 
//       alt="CSS3" className='TechStack'/>
//       <img src='https://www.pinclipart.com/picdir/big/38-389244_41-28-january-2017-matlab-logo-transparent-clipart.png' alt='Matlab' 
//       className='TechStackMatlab'/>
//       <br /> <br />

//       Frameworks and Technologies:
//       <br />
//       <img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' 
//       alt="React" className='TechStack'/>
//       <img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' 
//       alt="MongoDB" className='TechStack'/>
//       <img src='https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black' 
//       alt="Firebase" className='TechStack'/>
//       <img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' 
//       alt="NodeJS" className='TechStack'/>
//        <img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white' 
//       alt="Redux" className='TechStack'/>
//       <img src='https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white' 
//       alt="Web3" className='TechStack'/>
//       <img src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white' 
//       alt="NPM" className='TechStack'/>
//       <img src='https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white' 
//       alt="Tailwind" className='TechStack'/>
//       <img src='https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white' 
//       alt="Netlify" className='TechStack'/>
//       <img src='https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white' 
//       alt="Vercel" className='TechStack'/>
    
//     </div>
//   )
// }


// export default About