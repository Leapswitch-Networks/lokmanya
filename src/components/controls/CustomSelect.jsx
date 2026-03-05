import React, { useMemo, useEffect, useState } from 'react';
import Select from 'react-select';
import CustomSelectStyle from './CustomSelectStyle';

const CustomSelect = ({
    option = [],
    width,
    name,
    inputRef,
    className = "",
    menuPosition = 'fixed',
    menuClassName = 'custom-menu-styles',
    isSearchable = false,
    control = {},
    styles = CustomSelectStyle(width, control),
    IndicatorSeparator = () => null,
    defaultValue = { value: '', label: 'Select' },
    ...props
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const optionsWithDefault = useMemo(() => [defaultValue, ...option], [defaultValue, option]);

    if (!isClient) return null;

    return (
        <div className="parent-control d-flex align-items-center" style={{ width: width || 'fit-content' }}>
            <Select
                ref={inputRef}
                options={optionsWithDefault}
                aria-label='filter'
                isClearable={false}
                isSearchable={isSearchable}
                className={className}
                styles={styles}
                menuPosition={menuPosition}
                menuPortalTarget={document.body}
                menuClassName={menuClassName}
                components={{
                    IndicatorSeparator: IndicatorSeparator,
                }}
                defaultValue={defaultValue}
                {...props}
            />
        </div>
    );
};

export default CustomSelect;
