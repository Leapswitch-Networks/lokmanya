import React from 'react'
// import { SearchIcon } from '../../assets/images/icons';

const SearchInput = ({ placeholder,width,background,border=true, onClick, ...props  }) => {
 const controlStyle={
    border:` 1px solid ${border? 'hsl(0, 0%, 80%)': 'transparent'}`,
    background: background || 'transparent',
    width:width || 'fit-content',
 }
    return (<div className="search-input" style={controlStyle}>
        <input type='text' placeholder={placeholder || 'Search here'} {...props}/>
        <button type="button" aria-label="search-icon" onClick={onClick}>
            {/* <SearchIcon  width={20} height={20} /> */}
        </button>
    </div>);
}

export default SearchInput