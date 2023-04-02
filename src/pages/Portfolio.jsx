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

const fallbackImg = 'https://firebasestorage.googleapis.com/v0/b/personal-website-b4960.appspot.com/o/watch_space.jpg?alt=media&token=0d946a66-ebd6-40fc-9a69-62976e22139f'

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
  if(!fetching){
    const newContent = itemHandler(category[`${filter}`])
    setContent(newContent)
}

  setLoading(false)

}, [fetching, filter, category])

   const itemHandler = (arr) => {
    if(arr){
    const newContent = arr.map(x => {
          if (url[x]){
            return x
          }else{
            return 'Content Error';
          }
        })
    return newContent }
    else {return []}
   }

const onHover = (item) => {
  setHover(`${item}`)
}

const onLeave = () => {
  setHover(null)
}

const imgError = (e) => {
  e.target.src = fallbackImg
}

const sortButton = (key) => {
  if(filter === key) {
    return (
      <div key={key}>
        <button className='prt-act-btn' >{key}</button>
      </div>)
  } else {
    return (
      <div key={key}>
        <button className='prt-btn' onClick={() => setFilter(`${key}`)}>
          {key}
        </button>
      </div> )}
}

if(loading || fetching) {
  return <div className='topSpace'><Loading/></div>
}

  return (
    <>
      <p className="pageHeader"> <FaFileArchive/> &nbsp; Portfolio</p>
      <div className='center'>
        <div className='pButtons center'>
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
        {content.sort((a, b) => {
            if (url[a][4] < url[b][4]) {
            return -1;
            } else if (url[a][4] > url[b][4]) {
            return 1;
            } else {
            return 0;
            }
          }).map((item, id) => (
          <div key={id} className='border'>
            {url[item]
            ? <p className='projectTitle'>{item}</p>
            : <div className="center">
              <img src={fallbackImg} alt={item} className='portfolioIcon'/>
            </div>
            }
            {url[item][2]
            ? ( <div className='center'>
                    <img src={url[item][2]} alt={item} onError={(e) => imgError(e)}
                    onMouseEnter={() => onHover(item)} onMouseLeave={onLeave} className='portfolioIcon center'/>
                    {hover === item
                    ? <p className="textOver" onMouseEnter={() => onHover(item)}>{url[item][3]}</p>
                    : null }
                  <br />
                </div>)
            : ( <div className='center'  onMouseEnter={() => onHover(item)} onMouseLeave={onLeave}>
                  <img src={fallbackImg} alt={item} className='portfolioIcon'/>
                  {hover === item
                  ? <p className="textOver" onMouseEnter={() => onHover(item)}>{url[item][3]}</p>
                  : null }
                  <br />
                </div>)
            }
            <div className="center projectLinks">
              {url[item][0]
              ? ( <>
                    <a href={url[item][0]} target='_blank' rel='noreferrer noreopener' >
                      <p className='align center'> <FaLaptopCode/>  Web App! </p>
                    </a>
                    &nbsp;
                  </> )
              : null }

            &nbsp; &nbsp; &nbsp;

              {url[item][1]
              ? ( <div >
                    <a href={url[item][1]} target='_blank' rel='noreferrer noreopener' >
                      <p className='align center'> <FaGithub/>  Source code! </p>
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