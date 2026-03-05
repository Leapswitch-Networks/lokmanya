import React from 'react'

const FileControl = ({  label, id, ...props }) => {
    return (
    <>
        <label htmlFor={id} style={{ paddingLeft: '0px' }}>{label || ''}</label>
        {/* <label htmlFor={id}>Click me to upload image</label> */}
        <div className="file-wrapper">
            <input type="file" name="uploadfile" id={id} placeholder="fsf"  {...props} />
        </div>
    </>
    )
}

export default FileControl