import { useState, useEffect } from "react"
import { FaFileArchive, FaLaptopCode, FaGithub } from "react-icons/fa"
import {doc, getDoc,} from 'firebase/firestore'
import {db} from '../firebase.config'
import {getAuth} from 'firebase/auth'
import Loading from "../components/Loading"

function Portfolio() {
const [filter, setFilter] = useState('All')
const [content, setContent] = useState([])
const [loading, setLoading] = useState(true)
const [fetching, setFetching] = useState(true)
const [category, setCategory] = useState({})
const [url, setUrl] = useState({})
const [hover, setHover] = useState(null)

getAuth()

useEffect(() => {
  const fetchProjects = async() => {
      const catRef = doc(db, 'Portfolio', 'Category')
      const catSnap = await getDoc(catRef)

      if(catSnap.exists()) {
          setCategory(catSnap.data())
      }

      const urlRef = doc(db, 'Portfolio', 'url')
      const urlSnap = await getDoc(urlRef)

      if(urlSnap.exists()) {
          setUrl(urlSnap.data())
          setFetching(false)
      }
      
  }

  fetchProjects()
}, [])

useEffect(() => {
  if (filter === 'All') {
    setContent(category.All)
  } else if (filter === 'React') {
    setContent(category.React)
  } else if (filter === 'Blockchain') {
    setContent(category.Blockchain)
  } else if (filter === 'API') {
    setContent(category.API)
  } else if (filter === 'Database') {
    setContent(category.Database)
  } else if (filter === 'MATLAB') {
    setContent(category.MATLAB)
  } else {
    setContent(category.Python)
  }

  setLoading(false)

}, [filter, loading, category.API, category.All, 
  category.Blockchain, category.Database, category.MATLAB,
   category.Python, category.React])

const onHover = (item) => {
  setHover(`${item}`)
}

const onLeave = () => {
  setHover(null)
}

const sortButton = (key) => {
  if(filter === key) {
    return (<div key={key}>
      <button className='prt-act-btn' >{key}</button>
      </div>)
  } else {
    return ( <div key={key}>
        <button className='prt-btn' onClick={() => setFilter(`${key}`)}>{key}</button>
        </div> )}
}

if(loading || fetching) {
  return <><Loading/></>
}

  return (
    <>
      <p className="pageHeader"> <FaFileArchive/> &nbsp; Portfolio</p>
      <div className='center'>
      <div className='pButtons'>
        {Object.keys(category).sort((a, b) => {
          if (a === 'All') {
          return -1;
          } else if (b === 'All') {
          return 1;
          } else {
          return a.localeCompare(b);
        }
        }).map((key) => (
          sortButton(key) 
        ))}
      </div>
      </div>

      <div >
        {content.map((item, id) => ( 
          <div key={id} className='border'>
            <p className='projectTitle'>{item}</p>
            {url[item][2] !== '' 
            ? (<div className='center' onMouseEnter={() => onHover(item)} onMouseLeave={onLeave}>
                <article className='center'>
                  <img src={url[item][2]} alt={item} className='portfolioIcon center'/>
                  {hover === item 
                  ? <p className="textOver" onMouseEnter={() => onHover(item)}>{url[item][3]}</p>
                  : null }
                </article>
                <br /> 
               </div>)
            : (<div className='center'  onMouseEnter={() => onHover(item)} onMouseLeave={onLeave}>
                <img src='https://firebasestorage.googleapis.com/v0/b/personal-website-b4960.appspot.com/o/watch_space.jpg?alt=media&token=0d946a66-ebd6-40fc-9a69-62976e22139f' 
                     alt={item} className='portfolioIcon'/>
                {hover === item ? 
                <p className="textOver" onMouseEnter={() => onHover(item)}>{url[item][3]}</p>
                 : null }
                <br /> 
               </div>) 
            }
            <div className="center">
              {url[item][0] !== '' 
              ? (<>
                  <a href={url[item][0]} target='_blank' rel='noreferrer noreopener' >
                    <p className='align'> <FaLaptopCode/>Web App! </p>
                  </a> 
                  &nbsp; </>)
              : null }

            &nbsp; &nbsp; &nbsp;

              {url[item][1] !== '' 
              ? (<div >
                  <a href={url[item][1]} target='_blank' rel='noreferrer noreopener' >
                    <p className='align'> <FaGithub/>  Source code! </p>
                  </a>
                </div>)
              : null }
              <br />
            </div>
          </div>
        ))} 
      </div>
    </>
  )
}

export default Portfolio

// import { useState, useEffect } from "react"
// import { FaFileArchive, FaLaptopCode, FaGithub } from "react-icons/fa"
// import {doc, getDoc,} from 'firebase/firestore'
// import {db} from '../firebase.config'
// import {getAuth} from 'firebase/auth'

// function Portfolio() {
// const [filter, setFilter] = useState('All')
// const [content, setContent] = useState([])
// const [loading, setLoading] = useState(true)
// const [fetching, setFetching] = useState(true)
// const [category, setCategory] = useState({})
// const [url, setUrl] = useState({})
// const [hover, setHover] = useState(null)

// getAuth()

// useEffect(() => {
//   const fetchProjects = async() => {
//       const catRef = doc(db, 'Portfolio', 'Category')
//       const catSnap = await getDoc(catRef)

//       if(catSnap.exists()) {
//           setCategory(catSnap.data())
//       }

//       const urlRef = doc(db, 'Portfolio', 'url')
//       const urlSnap = await getDoc(urlRef)

//       if(urlSnap.exists()) {
//           setUrl(urlSnap.data())
//           setFetching(false)
//       }
      
//   }

//   fetchProjects()
// }, [])

// useEffect(() => {
//   if (filter === 'All') {
//     setContent(category.All)
//   } else if (filter === 'React') {
//     setContent(category.React)
//   } else if (filter === 'Blockchain') {
//     setContent(category.Blockchain)
//   } else if (filter === 'API') {
//     setContent(category.API)
//   } else if (filter === 'Database') {
//     setContent(category.Database)
//   } else if (filter === 'MATLAB') {
//     setContent(category.MATLAB)
//   } else {
//     setContent(category.Python)
//   }

//   setLoading(false)

// }, [filter, loading, category.API, category.All, 
//   category.Blockchain, category.Database, category.MATLAB,
//    category.Python, category.React])

// const onHover = (item) => {
//   setHover(`${item}`)
// }

// const onLeave = () => {
//   setHover(null)
// }

// const sortButton = (key) => {
//   if(filter === key) {
//     return (<div key={key}>
//       <button className='prt-act-btn' >{key}</button>
//       </div>)
//   } else {
//     return ( <div key={key}>
//         <button className='prt-btn' onClick={() => setFilter(`${key}`)}>{key}</button>
//         </div> )}
// }

// if(loading || fetching) {
//   return <p>loading...</p>
// }

//   return (
//     <>
//       <p className="pageHeader"> <FaFileArchive/> &nbsp; Portfolio</p>
//       <div className='center'>
//         {Object.keys(category).sort((a, b) => {
//           if (a === 'All') {
//           return -1;
//           } else if (b === 'All') {
//           return 1;
//           } else {
//           return a.localeCompare(b);
//         }
//         }).map((key) => (
//           sortButton(key) 
//         ))}
//       </div>

//       <div >
//         {content.map((item, id) => ( 
//           <div key={id} className='border'>
//             <p className='projectTitle'>{item}</p>
//             {url[item][2] !== '' 
//             ? (<div className='center' onMouseEnter={() => onHover(item)} onMouseLeave={onLeave}>
//                 <img src={url[item][2]} alt={item} className='portfolioIcon center'/>
//                 <br /> 
//                </div>)
//             : (<div className='center'  onMouseEnter={() => onHover(item)} onMouseLeave={onLeave}>
//                 <img src='https://firebasestorage.googleapis.com/v0/b/personal-website-b4960.appspot.com/o/watch_space.jpg?alt=media&token=0d946a66-ebd6-40fc-9a69-62976e22139f' 
//                      alt={item} className='portfolioIcon'/>
//                 <br /> 
//                </div>) 
//             }
//             <div className="center">
//               {url[item][0] !== '' 
//               ? (<>
//                   <a href={url[item][0]} target='_blank' rel='noreferrer noreopener' >
//                     <p className='align'> <FaLaptopCode/>Web App! </p>
//                   </a> 
//                   &nbsp; </>)
//               : null }

//             &nbsp; &nbsp; &nbsp;

//               {url[item][1] !== '' 
//               ? (<div >
//                   <a href={url[item][1]} target='_blank' rel='noreferrer noreopener' >
//                     <p className='align'> <FaGithub/>  Source code! </p>
//                   </a>
//                 </div>)
//               : null }
//               <br />
//             </div>
//           </div>
//         ))} 
//       </div>
//     </>
//   )
// }

// export default Portfolio