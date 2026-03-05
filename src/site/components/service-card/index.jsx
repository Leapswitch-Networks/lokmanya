import React from 'react'

const ServiceCard = ({ title, icon, ...props }) => {
  return (
    <div className='service-card'>
      {
        icon
      }
      <p className='service-title'>{title}</p>
    </div>
  )
}

export default ServiceCard