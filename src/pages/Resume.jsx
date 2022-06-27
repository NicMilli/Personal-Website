

function Resume() {
// get url from firebase
const resumeURL = "https://firebasestorage.googleapis.com/v0/b/personal-website-b4960.appspot.com/o/Nicholas_Milligan_CV.pdf?alt=media&token=74070090-e617-4ef2-8318-43b731a8379d"

  return (
    <div className='aboutPage'>
      <p className="pageHeader"> My Resume and Skills </p>
      <p>
      Lets cut to it- my tech stack includes but is not limited to: 
      </p>
      <div className="stack">
      Languages: 
      <br />
      <img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E' 
      alt="JavaScript" className='TechStack'/>
      <img src='https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue' 
      alt="Python" className='TechStack'/>
      <img src='https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black' 
      alt="Solidity" className='TechStack'/>
      <img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' 
      alt="CSS3" className='TechStack'/>
      <img src='https://www.pinclipart.com/picdir/big/38-389244_41-28-january-2017-matlab-logo-transparent-clipart.png' alt='Matlab' 
      className='TechStackMatlab'/>
      <br /> <br />
      Frameworks and Technologies:
      <br />
      <img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' 
      alt="React" className='TechStack'/>
      <img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' 
      alt="MongoDB" className='TechStack'/>
      <img src='https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black' 
      alt="Firebase" className='TechStack'/>
      <img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' 
      alt="NodeJS" className='TechStack'/>
       <img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white' 
      alt="Redux" className='TechStack'/>
      <img src='https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white' 
      alt="Web3" className='TechStack'/>
      <img src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white' 
      alt="NPM" className='TechStack'/>
     <img src='https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white' 
      alt="Tailwind" className='TechStack'/>
      <img src='https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white' 
      alt="Netlify" className='TechStack'/>
      <img src='https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white' 
      alt="Vercel" className='TechStack'/>
      </div>
      <br /> <br />
      
     {/* <a target='_blank' rel='noreferrer noreopenner'
      href="https://docs.google.com/document/d/1bgfBNcEXvpbuPfs9R5DCv0MwwEwwm8_Z/edit?usp=sharing&ouid=100592740334878003699&rtpof=true&sd=true">
      View My Resume
     </a> */}
     Learn all you need to know from my resume below!
     <div className="res">
     <object data={resumeURL} type="application/pdf" width="90%" height="100%">
      <p>Whoops, it seems we have a problem! <a href={resumeURL} target='_blank' rel='noreferrer noreopenner'>Please view my resume here.</a></p>
  </object>
  {/* <iframe src="https://drive.google.com/file/d/1U-agvCPFjnHAYgcUEstHHvrsLbaBFVdE/preview" width="640" height="480" allow="autoplay"></iframe> */}
  </div>
    </div>
  )
}

export default Resume