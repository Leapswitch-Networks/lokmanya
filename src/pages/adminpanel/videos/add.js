import React, { useState, useEffect, useLayoutEffect } from 'react';
// import axios from 'axios';
import Select from 'react-select';
import GoBack from '../../../components/controls/GoBack';
// import './addblog.css';
// import axiosConfig from '../../../utils/axiosConfig';
import { CustomInput, FileControl } from '../../../components';
import { errorToast, successToast } from '../../../utils/Toast';
import { useRouter } from 'next/router';
// import TextEditor from '../../../components/controls/TextEditor';
// import { FaTimes } from 'react-icons/fa';
import { customStyles } from '../../../components/controls/StatusStyle';
import { useDispatch } from 'react-redux';
import NewEditor from '../../../components/NewEditor/NewEditor';
import { AddBlog, getCategoryblog, getDoctorsblog } from '@/ApiActions/Admin/blogadmin/blog';
import { AddVideos } from '@/ApiActions/Admin/videosadmin/videos';

const AddBLog = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    let navigate = useRouter();
    const initialState = {
        name: '',
        description: '',
        categoryName: [],
        doctor: [],
        author: [],
        status: 'published', // Default value for status
        metaTitle: '',
        metaDescription: '',
        blogSchema: '',
        publishDate: new Date().toISOString().slice(0, 10),

    };


    const [formData, setFormData] = useState(initialState);
    const [userPhoto, setUserPhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userPhotoMobile, setUserPhotoMobile] = useState(null);
    const [selectedFileMobile, setSelectedFileMobile] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [textEditorData, setTextEditorData] = useState('');


    useEffect(() => {

        const getcategoryListBlog = async () => {
            try {
                const response = await getCategoryblog();
                setCategoryOptions(response.data.map(option => ({ value: option.id, label: option.categoryName })));

            } catch (error) {
                console.error("Failed to fetch specialties", error);
            }
        };
        getcategoryListBlog();

        const getDoctorsbloglist = async () => {
            try {
                const response = await getDoctorsblog();
                setDoctorOptions(response.data.map(option => ({ value: option.id, label: option.doctorName })));

            } catch (error) {
                console.error("Failed to fetch specialties", error);
            }
        };
        getDoctorsbloglist();



    }, []);

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked ? 1 : 0 : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        setFormData({ ...formData, [name]: selectedOptions });
    };
    const handleSelectChange = (selectedOptions) => {
        // Map selected options to their IDs or set an empty array if none
        setFormData({
            ...formData,
            categoryName: selectedOptions ? selectedOptions.map(option => option.value) : [],
        });
    };

    const handleDoctorSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            doctor: selectedOption ? selectedOption.value : "",
        });
    };





    const handleDropdownChange = (selectedOption, { name }) => {
        setFormData({ ...formData, [name]: selectedOption.value });
    };

    const handleDescriptionChange = (value) => {
        setTextEditorData(value);
    };

    const showImagePreviewAndValidate = (e) => {
        try {
            let selectedFile = e.target.files.item(0);
            let supportedFormats = ['image/webp'];

            if (!selectedFile) throw new Error('No file selected.');
            if (!supportedFormats.includes(selectedFile.type)) throw new Error('Invalid file type. Only webp are allowed.');
            if (selectedFile.size > 2 * 1024 * 1024) throw new Error('File size is more than 5 MB');

            let fileReader = new FileReader();

            fileReader.onload = (event) => {
                setUserPhoto(event.target.result);
            };

            fileReader.readAsDataURL(selectedFile);
            setSelectedFile(selectedFile);
        } catch (error) {
            console.error(error);
        }
    };


    const showImagePreviewAndValidatemobile = (e) => {
        try {
            let selectedFilemobile = e.target.files.item(0);
            let supportedFormats = ['image/webp'];

            if (!selectedFilemobile) throw new Error('No file selected.');
            if (!supportedFormats.includes(selectedFilemobile.type)) throw new Error('Invalid file type. Only webp are allowed.');
            if (selectedFilemobile.size > 2 * 1024 * 1024) throw new Error('File size is more than 5 MB');

            let fileReader = new FileReader();

            fileReader.onload = (event) => {
                setUserPhotoMobile(event.target.result);
            };

            fileReader.readAsDataURL(selectedFilemobile);
            setSelectedFileMobile(selectedFilemobile);
        } catch (error) {
            console.error(error);
        }
    };

  



    const handleSubmit = async (e) => {
        e.preventDefault();

       

        const data = new FormData();
        data.append('title', formData.name);
        data.append('publish_date', formData.publishDate);
        formData.slug = formData.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters except spaces
            .replace(/\s+/g, '-');
        data.append('slug', formData.slug);
        data.append('doctor', formData.doctor);
        data.append('status', formData.status);
        data.append('videoUrl', formData.videoUrl);

        if (selectedFile) {
            data.append('thumbnil_image', selectedFile);
        }


        try {
            const response = await AddVideos(data);
            if (response.status === 201) {
                successToast('videos created successfully');
                router.push('/adminpanel/videos');
                resetFormData();
            }
        } catch (error) {
            errorToast('There was an error adding the videos');
            console.error('There was an error adding the videos:', error);
        }
    };


    const resetFormData = () => {
        setFormData(initialState);
        setUserPhoto(null);
        setSelectedFile(null);
        setUserPhotoMobile(null);

    };

    const statusOptions = [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' }
    ];


    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="full-container">
            <div className="section-header">
                <GoBack to={'/adminpanel/videos'} />
                <span className="main-heading heading-both">Add Videos</span>
            </div>
            <div className="section-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-12">
                                    <CustomInput label={'Title'} name="name" value={formData.name} onChange={handleChange} placeholder="Enter Title" required />
                                </div>
                                <div className="col-md-12  mt-3">
                                    <CustomInput label={'Video URL'} name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Enter Video URL" required />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label>Publish Date</label>
                                    <input
                                        type="date"
                                        name="publishDate" // Corrected name attribute
                                        value={formData.publishDate}
                                        onChange={handleChange}
                                        placeholder="Select a Date"
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mt-3">
                                    <div className="input-outer">
                                        <label htmlFor="categoryName">Related Doctor Name</label>
                                        <Select
                                            name="categoryName"
                                            value={doctorOptions.find(option => option.value === formData.doctor) || null}
                                            onChange={handleDoctorSelectChange}
                                            options={doctorOptions}
                                            // isMulti // Allow multiple selections
                                            className="basic-select"
                                            classNamePrefix="select"
                                            placeholder="Select Doctor Name"

                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="status-sec">
                                <div className="input-outer">
                                    <label htmlFor="">Status</label>
                                    <div className="profile-submit-section" style={{ display: 'flex' }}>
                                        <Select
                                            name="status"
                                            value={statusOptions.find(option => option.value === formData.status)}
                                            onChange={handleDropdownChange}
                                            options={statusOptions}
                                            className="basic-select form_status"
                                            classNamePrefix="select"
                                            styles={customStyles}
                                        />
                                        <button type="submit" className="btn-submit">Submit</button>
                                    </div>
                                    <div className="mt-3">
                                        <FileControl label={'Thumbnil image'} onChange={showImagePreviewAndValidate} accept="image/webp" required />
                                        {userPhoto ? (
                                            <img className="image_preview" src={userPhoto} alt="User Photo" />
                                        ) : null}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddBLog;
