import axios from "axios"
import { useState, useRef } from "react"
import { FaAngleDoubleRight } from "react-icons/fa"
import { toast } from "react-toastify"
import ReCAPTCHA from "react-google-recaptcha"
import { FaPaperPlane } from "react-icons/fa"

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
})
const [loading, setLoading] = useState(false)
const [recaptchaToken, setRecaptchaToken] = useState('')

const formSparkURL = 'https://submit-form.com/wkJxopl2'

const recaptcha = '6Lc8s5cgAAAAADLd83SpijLlTu7JQs_YvK0n2cOX'
const recaptchaRef = useRef()

const {name, company, email, message} = formData

const onChange = (e) => {
  setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
  }))
}

const onSubmit = async(e) => {
  e.preventDefault()
  setLoading(true)

  const payload = {
    ...formData,
    'g-recaptcha-response': recaptchaToken,
  }

  try {
    await axios.post(formSparkURL, payload)
       toast.success('Succesful! Thank you for reaching out, I will be in touch shortly!')
    recaptchaRef.current.reset()
    setFormData({
      name: '',
      company: '',
      email: '',
      message: '',
  })
  } catch (error) {
    toast.error('There was an error submitting this form, please contact me via LinkedIn on my home page')
  }

  setLoading(false)
}

const updateRecaptchaToken = (token) =>{
  setRecaptchaToken(token)
}

  return (
    <>
      <div>
        <div>
          <p className="pageHeader"> <FaPaperPlane/> &nbsp; Contact Me</p>
        </div>   
        <main >
          <form onSubmit={onSubmit} className='form-group'>
            <div className='formWidth'>
              <input type="text" 
                placeholder='Name*'
                id='name'
                value={name}
                onChange={onChange}
                required
                />
            </div>
                
            <div className='formWidth'>
              <input type="text" 
                placeholder='Company'
                id='company'
                value={company}
                onChange={onChange}
                /> 
            </div>

            <div className="formWidth">
              <input type="email" 
                placeholder='Email*'
                id='email'
                value={email}
                onChange={onChange}
                required
                /> 
            </div> 

            <div className="formWidth">
              <textarea
                id="message"
                name="message"
                value={message}
                placeholder="Message*"
                onChange={onChange}
                required>
              </textarea>
            </div> 

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptcha}
              onChange={updateRecaptchaToken}  
              id='g-recaptcha'/>

            <div >
              <button disabled={loading} className='contact-btn'>
                {loading 
                ? 'Submitting...' 
                : (<p className='center'>
                    Send &nbsp; <FaAngleDoubleRight fill='#000000' width='3vh' height='3vh' />
                  </p>)}
              </button>
            </div>
          </form>
        </main> 
      </div>
    </>
  )
}

export default Contact