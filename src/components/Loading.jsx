import { FaFish } from 'react-icons/fa'

function Loading() {
  return (
    <div className='topSpace'>
      <div className='loading-spinner'>
        <FaFish size={50} fill='#ff6a95' />
      </div>
      <br />
      <h1 className='loading'>Loading...</h1>
    </div>
  )
}

export default Loading