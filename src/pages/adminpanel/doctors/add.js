import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import GoBack from '../../../components/controls/GoBack';
// import './adddoctor.css';
// import axiosConfig from '../../../utils/axiosConfig';
import { CustomDropdown, CustomInput, FileControl } from '../../../components';
import { errorToast, successToast } from '../../../utils/Toast';
import { useRouter } from "next/router";
// import TextEditor from '../../../components/controls/TextEditor';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { customStyles } from '../../../components/controls/StatusStyle';
import { useDispatch } from 'react-redux';
// import { checkCategoryDetails } from '../../../store/doctor/doctorAction';
import NewEditor from '@/components/NewEditor/NewEditor';
import { fetchAllCity, fetchAllcitywiseArea, fetchAllDesignation, fetchAlleducations, fetchAllexperience, fetchAllSpecialty } from '@/ApiActions/CommonApi';
import { addDoctor } from '@/ApiActions/Admin/doctor';
// import NewEditor from '../../components/NewEditor/NewEditor';

const AddDoctor = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    let navigate = useRouter();
    const initialState = {
        name: '',
        // description: '',
        education: [],
        speciality: [],
        area: [],
        opd_time: '',
        // pay_amount: '',
        // amount_status: '',
        designation: [],
        experience: [],
        city: [],
        grade: [],
        mobile_no: '',
        status: 'published', // Default value for status
        metaTitle: '',
        metaDescription: '',
        doctorSchema: '',
        blog_id: '',
        video_id: '',
        expertTagline: '',
        faqs: [ // ✅ initialize default one FAQ
            { id: 1, question: '', answer: '' }
        ],
        conditions: [
            { id: 1, name: '', image: null, imagePreview: null }
        ],
    };

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const initialTimingState = {
        week: [
            {
                location: '',
                city: '',
                timings: days.reduce((acc, day) => {
                    acc[day] = {
                        status: false,
                        times: [{ openTime: '', closeTime: '' }],
                        apppoiment_status: ''
                    };
                    return acc;
                }, {})
            }
        ]
    };

    const [formData, setFormData] = useState(initialState);
    const [userPhoto, setUserPhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [educationOptions, setEducationOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [designationOptions, setDesignationOptions] = useState([]);
    const [experienceOptions, setExperienceOptions] = useState([]);
    const [specialityOptions, setSpecialityOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);
    const [timings, setTimings] = useState(initialTimingState);
    const [textEditorData, setTextEditorData] = useState('');
    const [postError, setPostError] = useState({
        blog: false,
        video: false,
    });

    const [nextId, setNextId] = useState(2);
    const [nextConditionId, setNextConditionId] = useState(2);
    const [conditionErrors, setConditionErrors] = useState([{ name: '', image: '' }]);


    useEffect(() => {
        const fetcheduc = async () => {
            try {
                const response = await fetchAlleducations();
                setEducationOptions(response.data.map(option => ({ value: option.masterName, label: option.masterName })));
            } catch (error) {
                console.error("Failed to fetch specialties", error);
            }
        };
        fetcheduc();



        const fetchSpecialties = async () => {
            try {
                const response = await fetchAllSpecialty();
                setSpecialityOptions(response.data.map(option => ({ value: option.id, label: option.masterName })));
            } catch (error) {
                console.error("Failed to fetch specialties", error);
            }
        };
        fetchSpecialties();


        const fetchAllexp = async () => {
            try {
                const response = await fetchAllexperience();
                setExperienceOptions(response.data.map(option => ({ value: option.masterName, label: option.masterName })));
            } catch (error) {
                console.error("Failed to fetch specialties", error);
            }
        };
        fetchAllexp();

        const fetchAllDesi = async () => {
            try {
                const response = await fetchAllDesignation();
                setDesignationOptions(response.data.map(option => ({ value: option.masterName, label: option.masterName })));
            } catch (error) {
                console.error("Failed to fetch specialties", error);
            }
        };
        fetchAllDesi();

        const fetchAllcites = async () => {
            try {
                const response = await fetchAllCity();
                setCityOptions(response.data.map(option => ({ value: option.masterName, label: option.masterName })));
            } catch (error) {
                console.error("Failed to fetch specialties", error);
            }
        };
        fetchAllcites();

    }, []);

    // Handle change for each FAQ input

    // Handle change for each FAQ input
    const handleFAQChange = (id, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            faqs: prev.faqs.map(faq =>
                faq.id === id ? { ...faq, [name]: value } : faq
            ),
        }));
    };

    // Add new FAQ
    const addFaq = () => {
        setFormData(prev => ({
            ...prev,
            faqs: [...prev.faqs, { id: nextId, question: '', answer: '' }],
        }));
        setNextId(prev => prev + 1);
    };

    // Remove FAQ
    const removeFAQ = (id) => {
        setFormData(prev => ({
            ...prev,
            faqs: prev.faqs.filter(faq => faq.id !== id),
        }));
    };

    // Handle change for each condition input
    const handleConditionChange = (id, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            conditions: prev.conditions.map(cond =>
                cond.id === id ? { ...cond, [name]: value } : cond
            ),
        }));
        // Clear error
        const index = formData.conditions.findIndex(cond => cond.id === id);
        if (index !== -1) {
            setConditionErrors(prev => prev.map((err, i) => i === index ? { ...err, [name]: '' } : err));
        }
    };

    // Add new condition
    const addCondition = () => {
        setFormData(prev => ({
            ...prev,
            conditions: [...prev.conditions, { id: nextConditionId, name: '', image: null, imagePreview: null }],
        }));
        setConditionErrors(prev => [...prev, { name: '', image: '' }]);
        setNextConditionId(prev => prev + 1);
    };

    // Remove condition
    const removeCondition = (id) => {
        const index = formData.conditions.findIndex(cond => cond.id === id);
        setFormData(prev => ({
            ...prev,
            conditions: prev.conditions.filter(cond => cond.id !== id),
        }));
        if (index !== -1) {
            setConditionErrors(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Handle condition image change
    const handleConditionImageChange = (id, e) => {
        try {
            let selectedFile = e.target.files.item(0);
            let supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];

            if (!selectedFile) throw new Error('No file selected.');
            if (!supportedFormats.includes(selectedFile.type)) throw new Error('Invalid file type. Only JPEG/PNG/webp are allowed.');
            if (selectedFile.size > 5 * 1024 * 1024) throw new Error('File size is more than 5 MB');

            let fileReader = new FileReader();

            fileReader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    conditions: prev.conditions.map(cond =>
                        cond.id === id ? { ...cond, image: selectedFile, imagePreview: event.target.result } : cond
                    ),
                }));
                // Clear error
                const index = formData.conditions.findIndex(cond => cond.id === id);
                if (index !== -1) {
                    setConditionErrors(prev => prev.map((err, i) => i === index ? { ...err, image: '' } : err));
                }
            };

            fileReader.readAsDataURL(selectedFile);
        } catch (error) {
            console.error(error);
        }
    };


    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked ? 1 : 0 : value;
        setFormData({ ...formData, [name]: newValue });

        // if (name === 'blog_id' || name === 'video_id') {
        //     let postData = await dispatch(checkCategoryDetails({ blog_id: value })).then(res => res.payload);
        //     const isEmpty = postData.length === 0;

        //     setPostError(prevPostError => ({
        //         ...prevPostError,
        //         blog: name === 'blog_id' ? isEmpty : prevPostError.blog,
        //         video: name === 'video_id' ? isEmpty : prevPostError.video,
        //     }));
        // }
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        setFormData({ ...formData, [name]: selectedOptions || [] });
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
            let supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];

            if (!selectedFile) throw new Error('No file selected.');
            if (!supportedFormats.includes(selectedFile.type)) throw new Error('Invalid file type. Only JPEG/PNG/webp are allowed.');
            if (selectedFile.size > 5 * 1024 * 1024) throw new Error('File size is more than 5 MB');

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

    const handleStatusChange = (weekIndex, day) => {
        setTimings(prev => ({
            ...prev,
            week: prev.week.map((week, i) => i === weekIndex ? {
                ...week,
                timings: {
                    ...week.timings,
                    [day]: {
                        ...week.timings[day],
                        status: !week.timings[day].status,
                        apppoiment_status: '',
                    }
                }
            } : week)
        }));

    };

    const handleTimeChange = (weekIndex, day, index, type, value) => {
        setTimings(prev => ({
            ...prev,
            week: prev.week.map((week, i) => i === weekIndex ? {
                ...week,
                timings: {
                    ...week.timings,
                    [day]: {
                        ...week.timings[day],
                        times: week.timings[day].times.map((time, j) => j === index ? { ...time, [type]: value } : time)
                    }
                }
            } : week)
        }));
    };

    const addTimingSlot = (weekIndex, day) => {
        let current_clone = timings.week[weekIndex].timings[day].times.length + 1;

        if (current_clone < 3) {
            setTimings(prev => ({
                ...prev,
                week: prev.week.map((week, i) => i === weekIndex ? {
                    ...week,
                    timings: {
                        ...week.timings,
                        [day]: {
                            ...week.timings[day],
                            times: [...week.timings[day].times, { openTime: '', closeTime: '' }]
                        }
                    }
                } : week)
            }));
        }
    };

    const removeTimingSlot = (weekIndex, day, index) => {
        setTimings(prev => ({
            ...prev,
            week: prev.week.map((week, i) => i === weekIndex ? {
                ...week,
                timings: {
                    ...week.timings,
                    [day]: {
                        ...week.timings[day],
                        times: week.timings[day].times.filter((_, j) => j !== index)
                    }
                }
            } : week)
        }));
    };

    const cloneWeek = () => {
        const freshWeek = {
            location: '',
            timings: days.reduce((acc, day) => {
                acc[day] = {
                    status: false,
                    times: [{ openTime: '', closeTime: '' }]
                };
                return acc;
            }, {})
        };
        setTimings(prev => ({
            ...prev,
            week: [...prev.week, freshWeek]
        }));
    };

    const removeLocationSlot = (weekIndex) => {
        setTimings(prev => {
            const weekExists = prev.week[weekIndex];
            if (weekExists) {
                return {
                    ...prev,
                    week: prev.week.filter((_, idx) => idx !== weekIndex)
                };
            }
        });
    };


    // const handleCityChange = async (weekIndex, selectedOption) => {
    //     let city = selectedOption.value;
    //     setFormData({ ...formData, city: city })
    //     setTimings(prev => ({
    //         ...prev,
    //         week: prev.week.map((week, i) => i === weekIndex ? {
    //             ...week,
    //             city: city
    //         } : week)
    //     }));
    //     try {
    //         const response = await axiosConfig.get('/get-area-citywise', {
    //             params: {
    //                 city: city,
    //             }
    //         });
    //         //  const response = await fetchAllcitywiseArea(city);
    //         setAreaOptions((prev) => ({ ...prev, [weekIndex]: response.data.map(option => ({ value: option.masterName, label: option.masterName })) }));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const handleCityChange = async (weekIndex, selectedOption) => {
        const city = selectedOption.value;

        // Update city in formData
        setFormData(prev => ({
            ...prev,
            city
        }));

        // Update city in timings for the specific week
        setTimings(prev => ({
            ...prev,
            week: prev.week.map((week, i) =>
                i === weekIndex ? { ...week, city } : week
            )
        }));

        try {
            // Assuming fetchAllcitywiseArea is a helper function that fetches area list
            const response = await fetchAllcitywiseArea(city);

            // Set area options for the corresponding week index
            setAreaOptions(prev => ({
                ...prev,
                [weekIndex]: response.data.map(option => ({
                    value: option.masterName,
                    label: option.masterName
                }))
            }));
        } catch (error) {
            console.error("Error fetching area list:", error);
        }
    };

    const handleAreaChange = (weekIndex, selectedOption) => {
        let area = selectedOption.value;
        setFormData({ ...formData, area: area })
        setTimings(prev => ({
            ...prev,
            week: prev.week.map((week, i) => i === weekIndex ? {
                ...week,
                location: area
            } : week)
        }));
    };

    const handleAppStatusChange = (weekIndex, selectedOption, day) => {
        setTimings(prev => ({
            ...prev,
            week: prev.week.map((week, i) => i === weekIndex ? {
                ...week,
                timings: {
                    ...week.timings,
                    [day]: {
                        ...week.timings[day],
                        times: [{ openTime: '', closeTime: '' }],
                        apppoiment_status: selectedOption
                    }
                }
            } : week)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for conditions
        let errors = formData.conditions.map(() => ({ name: '', image: '' }));
        let hasError = false;
        formData.conditions.forEach((cond, index) => {
            if (!cond.name.trim()) {
                errors[index].name = 'Name is required';
                hasError = true;
            }
            // if (!cond.image) {
            //     errors[index].image = 'Image is required';
            //     hasError = true;
            // }
        });
        setConditionErrors(errors);
        if (hasError) {
            errorToast('Please fill all required fields for conditions');
            return;
        }

        const data = new FormData();
        data.append('doctorName', formData.name);
        formData.slug = formData.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
        data.append('slug', formData.slug);
        data.append('specialty', formData.speciality.map(option => option.value).join(','));
        data.append('education', formData.education);
        data.append('city', formData.city)
        data.append('description', textEditorData);
        data.append('area', formData.area)
        data.append('mobile_no', formData.mobile_no ? formData.mobile_no : '');
        data.append('publish', formData.status);
        data.append('designation', formData.designation);
        // data.append('grade', formData.grade.map(option => option.value).join(','));
        data.append('experience', formData.experience.map(option => option.value).join(','));
        data.append('opdTiming', JSON.stringify(timings));
        data.append('faq', JSON.stringify(formData.faqs)); // ✅ added line
        data.append('conditions', JSON.stringify(formData.conditions.map(cond => ({ id: cond.id, name: cond.name }))));
        formData.conditions.forEach(cond => {
            if (cond.image) {
                data.append(`condition_image_${cond.id}`, cond.image);
            }
        });
        if (selectedFile) {
            data.append('featured_images', selectedFile);
        }
        data.append('metaTitle', formData.metaTitle);
        data.append('metaDescription', formData.metaDescription);
        data.append('doctorSchema', formData.doctorSchema);
        data.append('blog_id', formData.blog_id);
        data.append('video_id', formData.video_id);
        data.append('expertTagline', formData.expertTagline);


        try {
            // const response = await axiosConfig.post('/add-doctor', data, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
            const response = await addDoctor(data);

            if (response.status === 201) {
                successToast('Doctor created successfully');
                router.push('/adminpanel/doctors');
                resetFormData();
            }
        } catch (error) {
            errorToast('There was an error adding the doctor');
            console.error('There was an error adding the doctor:', error);
        }
    };

    const resetFormData = () => {
        setFormData(initialState);
        setUserPhoto(null);
        setSelectedFile(null);
        setTimings(initialTimingState);
        setNextConditionId(2);
    };

    const formCategory = (val) => {
    };

    const statusOptions = [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' }
    ];

    const timeReason = [
        { label: 'By prior appointment', value: 'By prior appointment' },
        { label: 'Available on 1st Wednesday of Every Month', value: 'Available on 1st Wednesday of Every Month' },
        { label: 'No Fix OPD Slot But Available for OPD on Call', value: 'No Fix OPD Slot But Available for OPD on Call' },
        { label: 'Available on 2nd Friday of Every Month', value: 'Available on 2nd Friday of Every Month' }
    ];

    const GradeOptions = [
        { value: '1', label: 'A+' },
        { value: '2', label: 'A' },
        { value: '3', label: 'B' },
        { value: '4', label: 'C' },
    ];
    return (
        <div className="full-container">
            <div className="section-header">
                <GoBack to={'/adminpanel/doctors'} />
                <span className="main-heading heading-both">Add Doctor</span>
            </div>
            <div className="section-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomInput label={'Doctor Name'} name="name" value={formData.name} onChange={handleChange} placeholder="Enter Doctor Name" required />
                                </div>
                                <div className="col-md-6">
                                    <CustomInput label={'Education'} name="education" value={formData.education} onChange={handleChange} placeholder="Enter Education" />
                                </div>

                                <div className="my-3 col-md-12">
                                    <div className="input-outer">
                                        <label htmlFor="description">Doctor Description</label>
                                        {/* <TextEditor onChange={handleDescriptionChange} /> */}
                                        <NewEditor setData={(data) => handleDescriptionChange(data)} />
                                    </div>
                                </div>
                                <div className="mt-3 col-md-6">

                                    <CustomInput label={'Designation'} name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter Designation" />
                                </div>

                                <div className="mt-3 col-md-6">
                                    <CustomInput label={'Expert Tagline'} name="expertTagline" value={formData.expertTagline} onChange={handleChange} placeholder="Enter Expert Tagline" />
                                </div>
                                <div className="mt-3 col-md-6">
                                    <div className="input-outer">
                                        <label htmlFor="speciality">Speciality</label>
                                        <Select
                                            isMulti
                                            name="speciality"
                                            value={formData.speciality}
                                            onChange={handleMultiSelectChange}
                                            options={specialityOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Select Speciality"
                                        />
                                    </div>
                                </div>

                                <div className="mt-3 col-md-6">
                                    <div className="input-outer">
                                        <label htmlFor="experience">Experience</label>
                                        <Select
                                            isMulti
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleMultiSelectChange}
                                            options={experienceOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Select Experience"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3 col-md-6">
                                    <div className="input-outer">
                                        <label htmlFor="experience">Grade</label>
                                        <Select
                                            isMulti
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleMultiSelectChange}
                                            options={GradeOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Select Grade"
                                        />
                                    </div>
                                </div>
                                {/* <div className="mt-3 col-md-6">
                                    <CustomInput type="number" label={'Doctor Pay Amount'} name="pay_amount" value={formData.pay_amount} onChange={handleChange} placeholder="Enter Pay Amount" />
                                </div> */}
                                <div className="mt-3 col-md-6">
                                    <CustomInput label={'Doctor Mobile Number'} name="mobile_no" value={formData.mobile_no} onChange={handleChange} placeholder="Enter Mobile Number" />
                                </div>



                                {timings.week.map((week, weekIndex) => (
                                    <div key={weekIndex} data-id={weekIndex} className="mt-3 col-md-12">
                                        <div className="timing-section input-outer">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="form-check-label" htmlFor="">City</label>
                                                    <Select
                                                        name={`city${weekIndex}`}
                                                        value={cityOptions.find(option => option.value === week.location)}
                                                        onChange={(selectedOption) => handleCityChange(weekIndex, selectedOption)}
                                                        options={cityOptions}
                                                        className="basic-select w-100"
                                                        classNamePrefix="select"
                                                        placeholder="Select City"
                                                        styles={customStyles}
                                                    />
                                                </div>
                                                <div className="col-md-6 position-relative">
                                                    <label className="form-check-label" htmlFor="">Area</label>
                                                    <Select
                                                        name={`area${weekIndex}`}
                                                        value={areaOptions?.[weekIndex]?.find(option => option.value === week.location)}
                                                        onChange={(selectedOption) => handleAreaChange(weekIndex, selectedOption)}
                                                        options={areaOptions?.[weekIndex]}
                                                        className="basic-select w-100"
                                                        classNamePrefix="select"
                                                        placeholder="Select Area"
                                                        styles={customStyles}
                                                    />
                                                    {weekIndex > 0 && (
                                                        <span className='remove_clone' onClick={() => removeLocationSlot(weekIndex)}><FaTimes /></span>
                                                    )}
                                                </div>
                                            </div>
                                            {/* <div className="row"> */}
                                            {days.map(day => (
                                                <div key={day} className="day-section row">
                                                    <div className="col-md-2">
                                                        <div className="px-0 form-checkw form-switch">
                                                            <input className="form-check-input ms-0" id={`day_` + day} type="checkbox" checked={week.timings[day].status} onChange={() => handleStatusChange(weekIndex, day)} />
                                                            <label className="form-check-label ms-2" htmlFor={`day_` + day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="opd-time-controls">
                                                            {(week.timings[day].status == false) &&
                                                               
                                                                <CustomDropdown name={`appoiment_status${weekIndex}`} onChange={(selectedOption) => handleAppStatusChange(weekIndex, selectedOption.target.value, day)} options={timeReason} defaultOption='Select Reason' isWhite={true} />
                                                            }

                                                            {week.timings[day].status && week.timings[day].times.map((time, index) => (
                                                                <div key={index} className="time-slot-wrapper">
                                                                    <div className="time-slot">
                                                                        <CustomInput
                                                                            type="time"
                                                                            name={`openTime_${weekIndex}_${day}_${index}`}
                                                                            value={time.openTime}
                                                                            onChange={(e) => handleTimeChange(weekIndex, day, index, 'openTime', e.target.value)}
                                                                            placeholder="Open Time"
                                                                        />
                                                                        <CustomInput
                                                                            type="time"
                                                                            name={`closeTime_${weekIndex}_${day}_${index}`}
                                                                            value={time.closeTime}
                                                                            onChange={(e) => handleTimeChange(weekIndex, day, index, 'closeTime', e.target.value)}
                                                                            placeholder="Close Time"
                                                                        />
                                                                    </div>
                                                                    {week.timings[day].times.length > 1 && (
                                                                        <button type="button" onClick={() => removeTimingSlot(weekIndex, day, index)}>Remove</button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            {week.timings[day].status && week.timings[day].times.length + 1 < 3 && (
                                                                <button type="button" className='text-nowrap' onClick={() => addTimingSlot(weekIndex, day)}>Add Time Slot</button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* </div> */}
                                    </div>
                                ))}
                                <div className="col-md-12">
                                    <button type="button" className="btn-clone-week" onClick={cloneWeek}>Clone Week</button>
                                </div>

                                <div className="mt-4 mb-2 col-md-12">
                                    <div className="input-outer">
                                        <label className='mb-2' htmlFor="faq">FAQ Section</label>
                                        {formData.faqs.map((faq, index) => (
                                            <div className="col-md-12" key={faq.id}>
                                                <div className="faq-section mb-3">
                                                    <CustomInput
                                                         label={`Question ${index + 1}`}
                                                        name="question"
                                                        value={faq.question}
                                                        onChange={(e) => handleFAQChange(faq.id, e)}
                                                        placeholder="Enter Question"
                                                    />
                                                    <textarea
                                                        className="common-textarea-2 form-control mt-2"
                                                        name="answer"
                                                        value={faq.answer}
                                                        onChange={(e) => handleFAQChange(faq.id, e)}
                                                        placeholder="Enter Answer"
                                                    ></textarea>

                                                    {/* {formData.faqs.length > 1 && ( */}
                                                        <button
                                                            type="button"
                                                            className="remove_clone"
                                                            onClick={() => removeFAQ(faq.id)}
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    {/* )} */}
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className="btn-clone-week"
                                            onClick={addFaq}
                                        >
                                            <FaPlus /> Add FAQ
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 mb-2 col-md-12">
                                    <div className="input-outer">
                                        <label className='mb-2' htmlFor="conditions">Conditions Treated</label>
                                        {formData.conditions.map((condition, index) => (
                                            <div className="col-md-12" key={condition.id}>
                                                <div className="condition-section mb-3">
                                                    <CustomInput
                                                        label={`Condition ${index + 1} Name`}
                                                        name="name"
                                                        value={condition.name}
                                                        onChange={(e) => handleConditionChange(condition.id, e)}
                                                        placeholder="Enter Condition Name"
                                                    />
                                                    {conditionErrors[index]?.name && <div className="error-text">{conditionErrors[index].name}</div>}
                                                    {/* <div className="mt-2">
                                                        <label>Condition Image</label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleConditionImageChange(condition.id, e)}
                                                        />
                                                        {condition.imagePreview && (
                                                            <img className="image_preview" src={condition.imagePreview} alt="Condition" />
                                                        )}
                                                        {conditionErrors[index]?.image && <div className="error-text">{conditionErrors[index].image}</div>}
                                                    </div> */}
                                                    {/* {formData.conditions.length > 1 && ( */}
                                                        <button
                                                            type="button"
                                                            className="remove_clone"
                                                            onClick={() => removeCondition(condition.id)}
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    {/* )} */}
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn-clone-week"
                                            onClick={addCondition}
                                        >
                                            <FaPlus /> Add Condition
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3 col-md-6">
                                    <CustomInput type="text" label={'Meta Title'} name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="Meta Title" />
                                </div>
                                <div className="mt-3 col-md-6">
                                    <CustomInput type="text" label={'Meta Description'} name="metaDescription" value={formData.metaDescription} onChange={handleChange} placeholder="Meta Description" />
                                </div>

                                <div className="my-3 col-md-12">
                                    <div className="input-outer">
                                        <label htmlFor="schema">Schema</label>
                                        <textarea id="schema" className='form-control' name="doctorSchema" value={formData.doctorSchema} onChange={handleChange} rows="5" style={{ border: '1px solid #8c8f94' }}></textarea>
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
                                        <FileControl label={'Featured image'} onChange={showImagePreviewAndValidate} />
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

export default AddDoctor;


