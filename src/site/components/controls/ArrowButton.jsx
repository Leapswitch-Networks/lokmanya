import React from 'react'
import ArrowGradient from '../../assets/images/icons/blu-arrow-grad.svg'
// import BlueRTArrow from '../../assets/images/icons/arro-gradient.svg'

const ArrowButton = () => {
  return (
    <div className="icon-container">
      <img alt='Arrow Up' src={ArrowGradient.src} />
      {/* <img src={BlueRTArrow.src} /> */}
    </div>
  )
}

export default ArrowButton;