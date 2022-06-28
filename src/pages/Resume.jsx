import TechStack from "../components/TechStack"

function Resume() {
// get url from firebase
const resumeURL = process.env.REACT_APP_RES_URL

  return (
    <div className='aboutPage'>
      <p className="pageHeader"> My Resume and Skills </p>
      <p>
        Lets cut to it- my tech stack includes but is not limited to: 
      </p>
      <div className="stack">
        <TechStack/>
        </div>
        <br /> <br />
      
        Learn all you need to know from my resume below!
        <p>If you are having trouble viewing the PDF below, <a href={resumeURL} target='_blank' rel='noreferrer noreopenner' className='loading'>please follow this link.</a></p>
        <div className="res">
          <object data={resumeURL} type="application/pdf" width="90%" height="100%">
            <p className='resumeIss'>Whoops, it seems we have a problem! <a href={resumeURL} target='_blank' rel='noreferrer noreopenner'>Please view my resume here.</a></p>
          </object>
        </div>
    </div>
  )
}

export default Resume