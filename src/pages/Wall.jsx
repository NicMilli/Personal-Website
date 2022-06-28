import { FaFish } from "react-icons/fa"

function Wall() {
  return (
    <div className='grad'>
      <div className="grey">
        <div className="wallDescription">
          <p className="descriptionText">
            Please feel free to leave any messages or comments here.
            I wanted to add some color and make my page interactive whilst showing off some of the skills I have learnt! 
          </p> 
          <p  className="descriptionText">
            I hope you have enjoyed my page! <FaFish className='fish' />
          </p>
        </div>
          
        <div>
          <div className="border">
            <div className="center">
              <p className="wallText-1">I would like to get visitors to sign with Firebase to avoid spam massages</p>
            </div>
            <div className="center">
              <p className="wallText-2">Please be patient while I set this up as I am finishing some other projects first!</p>
              <p className='wallText-3'>Thank you for visiting!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wall