import { SearchIcon } from "../../assets/images/icons";
import "./controls.css";

const SearchField = ({ placeholder, bg_color, ...props }) => {
    const inputStyle={
        backgroundColor:bg_color || "#f8f8f8",
    }
    return (<div className="input-wrapper search-wrapper" style={inputStyle} >
        <input type='text' {...props} placeholder={placeholder || 'Search here'} />
        <button type="button" aria-label="search-icon">
            <SearchIcon  width={20} height={20} />
        </button>
    </div>);
};

export default SearchField;
