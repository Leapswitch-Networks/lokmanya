import React from 'react'

const CustomDropdown = ({options,defaultOption='Select',isWhite=false,...props}) => {
    const style={
        backgroundColor:isWhite ? '#fff' : 'transparent'
    }
  return (
    <select className='dropdown-select px-2 py-1 mt-1' style={style} {...props}>
        <option value="">{defaultOption}</option>
    { options?.map((opt) => {
      return <option value={opt.value}>{opt.label}</option>
    }) }
  </select>
  )
}

export default CustomDropdown