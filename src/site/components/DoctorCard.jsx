// import React from 'react'
// import { ExpIcon, FeesIcon } from '../assets/images/icons'
// import { ButtonPrimary, Image } from './controls'
// import {NavLink, useNavigate} from 'react-router-dom'
// import './component.css'

// const DoctorCard = ({data={}}) => {
//   const BASE_URL = process.env.REACT_APP_FILE_BASE_URL_PUBLIC;
//   const {doctorName,slug,amount,specialty,experience,imageBase64,featured_images,amount_status}=data;
//   const navigate=useNavigate();
//   return (
//     <div className="doctor-card-container">
//       <div className="card-info">
//         <NavLink to={`/doctors/${slug}`} className='doctor-img'>
//           {/* <Image alt={'doctor-profile'} image={`images/doctors/${featured_images}`} width={'100%'} height={'100%'} /> */}
//         {imageBase64 ? <Image alt='doctor-profile' image={imageBase64} width='100%' height='100%' />: <img src={`${BASE_URL}/images/placeholder-image.webp`} className='placeholder-image' alt="doctor" crossorigin="anonymous" width='100%' height='100%' />}
//         </NavLink>
//         <div className="doctor-info">
//         <NavLink to={`/doctors/${slug}`} className='text-black'> <h4 className="dr-name">{doctorName}</h4></NavLink>
//           { specialty && <p className='dr-specialty'>{specialty}</p> }
//           { !!(experience || amount_status) &&
//           <div className='price-wrapper'>
//             {experience && <div className="d-flex align-items-center gap-1 mt-1"><ExpIcon /><span className='fw-bold'>{experience} Years</span></div>}
//             {amount_status == 1 && <div className="d-flex align-items-center gap-1 mt-1"><FeesIcon /><span className='fw-bold' style={{ paddingLeft: '2px' }}>&#8377; {amount}</span></div> }
//           </div>
//           }
//         </div>
//       </div>

//       <div className="buttons-group doctor-card-footer">
//         <ButtonPrimary icon={true} onClick={()=>navigate(`/doctors/${slug}`)}>View Now</ButtonPrimary>
//         <ButtonPrimary isWhite="true" onClick={()=>navigate(`/doctors/${slug}`)}>Book Now</ButtonPrimary>
//       </div>
//     </div>
//   )
// }

// export default DoctorCard
import React from 'react'

const DoctorCard = () => {
  return (
    <div>DoctorCard</div>
  )
}

export default DoctorCard
