import React, { useState } from 'react'

const Reset = ({ height, width, padding, color, onClick = () => {}, ...props }) => {
  const [rotate, setRotate] = useState(0);
  const handleClick = () => {
    onClick()
    setRotate(rotate + 360)
  };
  const btnStyle = {
    height: height || '40px',
    width: width || '40px',
    backgroundColor: '#fff',
    padding: padding || '7px',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
    transform: `rotate(${rotate}deg)`,

  }
  return (
    <button className='btn-reset' title='Reset All Filters' style={btnStyle} onClick={handleClick} type='button' aria-label="reset" {...props}>
      <svg viewBox="0 0 24 24" id="rotate"><path fill={'#C2202D' || "#0094cd"} d="m20.033,12.256c-.418-.054-.786.24-.837.652-.449,3.616-3.543,6.342-7.196,6.342-3.998,0-7.25-3.252-7.25-7.25s3.252-7.25,7.25-7.25c1.634,0,3.198.558,4.456,1.55h-1.456c-.414,0-.75.336-.75.75s.336.75.75.75h3c.414,0,.75-.336.75-.75v-3.05c0-.414-.336-.75-.75-.75s-.75.336-.75.75v1.012c-1.497-1.132-3.335-1.762-5.25-1.762C7.175,3.25,3.25,7.175,3.25,12s3.925,8.75,8.75,8.75c4.409,0,8.143-3.292,8.685-7.658.051-.411-.24-.786-.651-.836Z"></path></svg>
    </button>
  )
}

export default Reset
