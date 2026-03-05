import React, { useState, useEffect, useLayoutEffect } from 'react';
// import axios from 'axios';
import Select from 'react-select';
import GoBack from '../../../../components/controls/GoBack';
// import axiosConfig from '../../../../utils/axiosConfig';
import { CustomInput, FileControl } from '../../../../components';
import { errorToast, successToast } from '../../../../utils/Toast';
import { useRouter } from "next/router";
import { customStyles } from '../../../../components/controls/StatusStyle';
import { useDispatch } from 'react-redux';
import NewEditor from '@/components/NewEditor/NewEditor';
import "@/styles/admincss/hyperlocal.css"
import { ArrowRightTab } from '@/site/assets/images/icons';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { addHyperlocalNearMe, getHyperlocalcategoryList } from '@/ApiActions/Admin/hyperlocaladmin/hyperlocal';


const AddHyperlocal = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    let navigate = useRouter();
    const initialState = {
        name: '',
        status: 'published', // Default value for status
        treatmentProcedures: [{ question: '', description: '', image: null, isChecked: false }], // Updated structure
        benefitsProcedures: [{ title: '', description: '', image: null }], // New Preventive procedures state
        comprehensivecare: [{ title: '', description: '', image: null }], // New Preventive procedures state
        faqs: [], // Start with ID 1
        metaTitle: '',
        metaDescription: '',
        treatmentHeading: '',
        comprehensiveHeading: '',
    };
    const [formData, setFormData] = useState(initialState);
    const [userPhoto, setUserPhoto] = useState(null);
    const [userPhotoMobile, setUserPhotoMobile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileMobile, setSelectedFileMobile] = useState(null);
    const [selectedFileaboutus, setSelectedFileAboutUs] = useState(null);
    const [preventiveImages, setPreventiveImages] = useState([null]); // New state for preventive images
    const [comprehensiveImages, setComprehensiveImages] = useState([null]); // New state for preventive images
    const [nextId, setNextId] = useState(2); // Counter for the next ID

    const [hyperlocalCategory, setHyperlocalCategory] = useState([]);
    const [textEditorData, setTextEditorData] = useState('');
    const [postError, setPostError] = useState({
        blog: false,
        video: false,
    });

    const [categoryChain, setCategoryChain] = useState([]); // For recursive dropdowns
    const [finalSelectedCategoryId, setFinalSelectedCategoryId] = useState(null);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getHyperlocalcategoryList();
                const rootCategories = response.data.data;

                setCategoryChain([{ options: rootCategories, selected: null }]);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);


    const handleCategorySelect = (selected, levelIndex) => {
        const updatedChain = [...categoryChain];

        // Set selected category at current level
        updatedChain[levelIndex].selected = selected;

        // Remove deeper levels
        updatedChain.splice(levelIndex + 1);

        // If selected has children, add next level
        if (selected.children && selected.children.length > 0) {
            updatedChain.push({ options: selected.children, selected: null });
        }

        setCategoryChain(updatedChain);

        // Final selected category (deepest)
        setFinalSelectedCategoryId(selected.id);
    };



    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked ? 1 : 0 : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        setFormData({ ...formData, [name]: selectedOptions });
    };

    const handleDropdownChange = (selectedOption, { name }) => {
        setFormData({ ...formData, [name]: selectedOption.value });
    };

    const handleDescriptionChange = (value) => {
        setTextEditorData(value);
    };


    const handleTreatmentChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProcedures = [...formData.treatmentProcedures];
        updatedProcedures[index][name] = value;
        setFormData({ ...formData, treatmentProcedures: updatedProcedures });
    };

    const removeTreatmentProcedure = (index) => {
        const updatedProcedures = formData.treatmentProcedures.filter((_, i) => i !== index);
        setFormData({ ...formData, treatmentProcedures: updatedProcedures });

    };

    const handleCheckboxChange = (index, isChecked) => {
        const updatedProcedures = [...formData.treatmentProcedures];
        updatedProcedures[index].isActive = isChecked; // Update isActive to true or false
        setFormData({ ...formData, treatmentProcedures: updatedProcedures });
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


    const showImagePreviewAndValidateMobile = (e) => {
        try {
            let selectedFileMobile = e.target.files.item(0);
            let supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];
            if (!selectedFileMobile) throw new Error('No file selected.');
            if (!supportedFormats.includes(selectedFileMobile.type)) throw new Error('Invalid file type. Only JPEG/PNG/webp are allowed.');
            if (selectedFileMobile.size > 5 * 1024 * 1024) throw new Error('File size is more than 5 MB');

            let fileReader = new FileReader();
            fileReader.onload = (event) => {
                setUserPhotoMobile(event.target.result);
            };
            fileReader.readAsDataURL(selectedFileMobile);
            setSelectedFileMobile(selectedFileMobile);
        } catch (error) {
            console.error(error);
        }
    };
    const addTreatmentProcedure = () => {
        setFormData({
            ...formData,
            treatmentProcedures: [...formData.treatmentProcedures, { question: '', description: '', image: null, isChecked: false }]
        });
    };
    // New functions for Preventive Procedures
    const handlePreventiveChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPreventives = [...formData.benefitsProcedures];
        updatedPreventives[index][name] = value;
        setFormData({ ...formData, benefitsProcedures: updatedPreventives });
    };

    const handlePreventiveImageChange = (e, index) => {
        const selectedFile = e.target.files[0];
        const fileReader = new FileReader();
        let fileSizeMB = selectedFile.size / (1024 * 1024);
        if (fileSizeMB > 2) {
            return errorToast('Please upload file size below 2MB');
        }
        fileReader.onload = (event) => {
            const updatedImages = [...preventiveImages];
            updatedImages[index] = event.target.result;
            setPreventiveImages(updatedImages);
        };

        fileReader.readAsDataURL(selectedFile);
    };



    const addPreventiveProcedure = () => {
        setFormData({
            ...formData,
            benefitsProcedures: [...formData.benefitsProcedures, { title: '', description: '', image: null }]
        });
        setPreventiveImages([...preventiveImages, null]); // Add a placeholder for new preventive image
    };

    const removePreventiveProcedure = (index) => {
        const updatedPreventives = formData.benefitsProcedures.filter((_, i) => i !== index);
        const updatedImages = preventiveImages.filter((_, i) => i !== index);
        setFormData({ ...formData, benefitsProcedures: updatedPreventives });
        setPreventiveImages(updatedImages);
    };

    // Handler to update individual comprehensive care fields
    const handleComprehensiveChange = (index, e) => {
        const { name, value } = e.target;
        const updatedComprehensive = [...formData.comprehensivecare];
        updatedComprehensive[index][name] = value;
        setFormData({ ...formData, comprehensivecare: updatedComprehensive });
    };

    // Handler for image upload in comprehensive care
    const handleComprehensiveImageChange = (e, index) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const fileSizeMB = selectedFile.size / (1024 * 1024);
        if (fileSizeMB > 2) {
            return errorToast('Please upload file size below 2MB');
        }

        const updatedImages = [...comprehensiveImages];
        updatedImages[index] = selectedFile; // store file, not base64
        setComprehensiveImages(updatedImages);
    };

    // Add a new comprehensive care item
    const addComprehensiveProcedure = () => {
        const updatedList = [
            ...formData.comprehensivecare,
            { title: '', description: '', image: null }
        ];
        setFormData({ ...formData, comprehensivecare: updatedList });
        setComprehensiveImages([...comprehensiveImages, null]);
    };

    // Remove a specific comprehensive care item
    const removeComprehensiveProcedure = (index) => {
        const updatedComprehensive = formData.comprehensivecare.filter((_, i) => i !== index);
        const updatedImages = comprehensiveImages.filter((_, i) => i !== index);
        setFormData({ ...formData, comprehensivecare: updatedComprehensive });
        setComprehensiveImages(updatedImages);
    };


    const handleFAQChange = (id, e) => {
        const { name, value } = e.target;
        const updatedFAQs = formData.faqs.map(faq =>
            faq.id === id ? { ...faq, [name]: value } : faq
        );
        setFormData({ ...formData, faqs: updatedFAQs });
    };

    ;
    const addFAQ = () => {
        setFormData({ ...formData, faqs: [...formData.faqs, { id: nextId, question: '', answer: '' }] });
        setNextId(nextId + 1); // Increment the ID counter
    };

    const removeFAQ = (id) => {
        const updatedFAQs = formData.faqs.filter(faq => faq.id !== id);
        setFormData({ ...formData, faqs: updatedFAQs });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isAtLeastOneSelected = categoryChain.some(level => level.selected);

        if (!isAtLeastOneSelected) {
            errorToast('Please select at least one category.');
            return;
        }
        const data = new FormData();
        data.append('title', formData.name);
        formData.slug = formData.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
        data.append('slug', formData.slug);
        data.append('description', textEditorData);
        data.append('status', formData.status);
        data.append('categoryId', finalSelectedCategoryId);
        data.append('treatmentHeading', formData.treatmentHeading);
        data.append('comprehensiveHeading', formData.comprehensiveHeading);
        if (selectedFile) {
            data.append('featured_images', selectedFile);
        }
        if (selectedFileMobile) {
            data.append('featured_images_mobile', selectedFileMobile);
        }
        if (selectedFileaboutus) {
            data.append('featured_images', selectedFileaboutus);
        }
        data.append('metaTitle', formData.metaTitle);
        data.append('metaDescription', formData.metaDescription);
        data.append('faqs', JSON.stringify(formData.faqs)); // Convert FAQs to JSON string      


        // Append treatment procedures
        formData.treatmentProcedures.forEach((procedure, index) => {
            data.append(`treatmentProcedures[${index}][question]`, procedure.question);
            data.append(`treatmentProcedures[${index}][description]`, procedure.description);
            data.append(`treatmentProcedures[${index}][isActive]`, procedure.isActive ? 'true' : 'false');
        });

        // Append preventive procedures
        formData.benefitsProcedures.forEach((preventive, index) => {
            data.append(`benefitsProcedures[${index}][title]`, preventive.title);
            data.append(`benefitsProcedures[${index}][description]`, preventive.description);
            if (preventiveImages[index]) {
                data.append(`benefitsProcedures[${index}][image]`, preventiveImages[index]);
            }
        });

        // Append preventive procedures
        formData.comprehensivecare.forEach((care, index) => {
            data.append(`comprehensiveProcedures[${index}][title]`, care.title);
            data.append(`comprehensiveProcedures[${index}][description]`, care.description);

            if (comprehensiveImages[index]) {
                data.append('comprehensiveProceduresImages', comprehensiveImages[index]);
            }
        });

        try {
            const response = await addHyperlocalNearMe(data);
            if (response.status === 201) {
                successToast('Doctor created successfully');
                router.push('/adminpanel/hyperlocal');
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
        setUserPhotoMobile(null);
        setPreventiveImages([null]); // Reset preventive images
        setComprehensiveImages([null]); // Reset preventive images

    };

    const statusOptions = [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' }
    ];

    return (
        <div className="full-container department-page">
            <div className="section-header">
                <GoBack to={'/adminpanel/hyperlocal'} />
                <span className="main-heading heading-both">Add Hyperlocal</span>
            </div>
            <div className="section-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomInput label={'Hyperlocal Name'} name="name" value={formData.name} onChange={handleChange} placeholder="Enter Doctor Name" required />
                                </div>


                                <div className="my-3 col-md-12">
                                    <div className="input-outer">
                                        <label htmlFor="description">Hyperlocal Description</label>
                                        <NewEditor setData={(data) => handleDescriptionChange(data)} />
                                    </div>
                                </div>


                                <div className="col-12 mt-3">
                                    <div className="row hyp-loc-dept">
                                        <div className="col-xl-4">
                                            <ul className="nav nav-pills treatment-procedure-tabs gap-3">
                                                <li className="nav-item w-100">
                                                    <a className="btn-treat-tab active" id="tab3" data-bs-toggle="pill" href="#treatmentProcedures">Treatment Procedures<ArrowRightTab /></a>
                                                </li>
                                                <li className="nav-item w-100">
                                                    <a className="btn-treat-tab" id="tab4" data-bs-toggle="pill" href="#benefitsProcedures">Benefits<ArrowRightTab /></a>
                                                </li>
                                                <li className="nav-item w-100">
                                                    <a className="btn-treat-tab" id="tab4" data-bs-toggle="pill" href="#comprehensivecare">Comprehensive Care<ArrowRightTab /></a>
                                                </li>
                                                <li className="nav-item w-100">
                                                    <a className="btn-treat-tab" id="tab1" data-bs-toggle="pill" href="#faq">FAQ <ArrowRightTab /> </a>
                                                </li>
                                                <li className="nav-item w-100">
                                                    <a className="btn-treat-tab" id="tab5" data-bs-toggle="pill" href="#meta">Meta <ArrowRightTab /> </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='col-xl-8'>
                                            <div className="tab-content">

                                                <div id="treatmentProcedures" className="tab-pane fade show active">
                                                    {/* Treatment Procedures Section */}
                                                    <h2 className='section-heading-blue '>Treatment Procedures</h2>
                                                    <div className="col-md-12">
                                                        <CustomInput label={'Treatment Procedures Title'} name="treatmentHeading" value={formData.treatmentHeading} onChange={handleChange} placeholder="Enter heading Name" />
                                                    </div>
                                                    {formData.treatmentProcedures?.map((procedure, index) => (
                                                        <div className="col-md-12" key={index}>
                                                            <div className="procedure-section border rounded p-3 mb-4 position-relative">

                                                                {/* Featured Procedure Checkbox */}
                                                                <div className="form-check mb-3">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id={`featuredProcedure-${index}`}
                                                                        checked={procedure.isActive || false}
                                                                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                                                    />
                                                                    <label className="form-check-label ms-2 user-select-none" htmlFor={`featuredProcedure-${index}`}>
                                                                        Featured procedure
                                                                    </label>
                                                                </div>

                                                                {/* Title Input */}
                                                                <div className="mb-3 position-relative">
                                                                    <CustomInput
                                                                        label={`Procedure Title ${index + 1}`}
                                                                        name="question"
                                                                        value={procedure.question}
                                                                        onChange={(e) => handleTreatmentChange(index, e)}
                                                                        placeholder="Enter Procedure Title"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 mt-1 me-1"
                                                                        onClick={() => removeTreatmentProcedure(index)}
                                                                        title="Remove"
                                                                    >
                                                                        <FaTimes />
                                                                    </button>
                                                                </div>

                                                                {/* Description Textarea */}
                                                                <div className="mb-2">
                                                                    <label className="form-label">
                                                                        {`Procedure Description ${index + 1}`}
                                                                        <span className="text-danger"> (Word limit 300)</span>
                                                                    </label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        name="description"
                                                                        value={procedure.description}
                                                                        onChange={(e) => handleTreatmentChange(index, e)}
                                                                        placeholder="Enter Procedure Description"
                                                                        rows="4"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="col-md-12 mb-3">
                                                        <button type="button" className="button-primary btn-pry-svg" onClick={addTreatmentProcedure}>
                                                            <FaPlus /> <span>Add Treatment Procedure</span></button>
                                                    </div>
                                                </div>

                                                <div id="benefitsProcedures" className="tab-pane fade">
                                                    {/* Preventive Procedures Section */}
                                                    <h2 className='section-heading-blue '>Benefits</h2>
                                                    {formData.benefitsProcedures?.map((procedure, index) => (
                                                        <div key={index} className="border rounded p-3 mb-4 position-relative">
                                                            {/* Title Input with Remove Button */}
                                                            <div className="mb-3 position-relative">
                                                                <CustomInput
                                                                    label={`Benefits Title ${index + 1}`}
                                                                    name="title"
                                                                    value={procedure.preventiveTitle}
                                                                    onChange={(e) => handlePreventiveChange(index, e)}
                                                                    placeholder="Enter Benefits Title"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 mt-1 me-1"
                                                                    onClick={() => removePreventiveProcedure(index)}
                                                                    title="Remove"
                                                                >
                                                                    <FaTimes />
                                                                </button>
                                                            </div>

                                                            {/* Description Textarea */}
                                                            <div className="mb-3">
                                                                <label className="form-label">{`Benefits Description ${index + 1}`}</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    name="description"
                                                                    rows="4"
                                                                    value={procedure.preventiveOverview}
                                                                    onChange={(e) => handlePreventiveChange(index, e)}
                                                                    placeholder="Enter Benefits Description"
                                                                ></textarea>
                                                            </div>

                                                            {/* Image Upload */}
                                                            {/* <div className="mb-3">
                                                                <FileControl
                                                                    label={`Image for Benefits ${index + 1}`}
                                                                    accept="image/webp"
                                                                    onChange={(e) => handlePreventiveImageChange(e, index)}
                                                                />
                                                            </div> */}

                                                            {/* Image Preview */}
                                                            {/* {preventiveImages[index] && (
                                                                <div className="mb-2">
                                                                    <img
                                                                        className="img-fluid rounded border"
                                                                        src={preventiveImages[index]}
                                                                        alt={`Preventive ${index + 1}`}
                                                                        style={{ maxHeight: '150px' }}
                                                                    />
                                                                </div>
                                                            )} */}
                                                        </div>
                                                    ))}
                                                    <div className="col-md-12 mb-3">
                                                        <button type="button" className="button-primary btn-pry-svg" onClick={addPreventiveProcedure}>
                                                            <FaPlus /> <span>Add Benefits</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div id="comprehensivecare" className="tab-pane fade">
                                                    {/* Preventive Comprehensive Care Section */}
                                                    <h2 className='section-heading-blue '>Comprehensive Care</h2>
                                                    <div className="col-md-12">
                                                        <CustomInput label={'Comprehensive Heading'} name="comprehensiveHeading" value={formData.comprehensiveHeading} onChange={handleChange} placeholder="Enter heading" />
                                                    </div>
                                                    {formData.comprehensivecare?.map((cares, index) => (
                                                        <div key={index} className="border rounded p-3 mb-4 position-relative">
                                                            {/* Title Input */}
                                                            <div className="mb-3 position-relative">
                                                                <CustomInput
                                                                    label={`Title ${index + 1}`}
                                                                    name="title"
                                                                    value={cares.comprehensiveTitle}
                                                                    onChange={(e) => handleComprehensiveChange(index, e)}
                                                                    placeholder="Enter Title"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 mt-1 me-1"
                                                                    onClick={() => removeComprehensiveProcedure(index)}
                                                                    title="Remove"
                                                                >
                                                                    <FaTimes />
                                                                </button>
                                                            </div>

                                                            {/* Description Textarea */}
                                                            <div className="mb-3">
                                                                <label className="form-label">{`Description ${index + 1}`}</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    name="description"
                                                                    rows="4"
                                                                    value={cares.comprehensiveOverview}
                                                                    onChange={(e) => handleComprehensiveChange(index, e)}
                                                                    placeholder="Enter Description"
                                                                ></textarea>
                                                            </div>

                                                            {/* Image Upload */}
                                                            <div className="mb-3">
                                                                <FileControl
                                                                    label={`Image ${index + 1}`}
                                                                    accept="image/webp"
                                                                    onChange={(e) => handleComprehensiveImageChange(e, index)}
                                                                />
                                                            </div>

                                                            {/* Image Preview */}
                                                            {comprehensiveImages[index] && (
                                                                <div className="mb-2">
                                                                    <img
                                                                        className="img-fluid rounded border"
                                                                        src={URL.createObjectURL(comprehensiveImages[index])}
                                                                        alt={`Comprehensive ${index + 1}`}
                                                                        style={{ maxHeight: '150px' }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <div className="col-md-12 mb-3">
                                                        <button type="button" className="button-primary btn-pry-svg" onClick={addComprehensiveProcedure}>
                                                            <FaPlus /> <span>Add Comprehensive Care</span>
                                                        </button>
                                                    </div>
                                                </div>


                                                <div id="meta" className="tab-pane fade">
                                                    <h2 className="section-heading-blue mb-4">Meta</h2>
                                                    {/* Meta Title */}
                                                    <div className="mb-3">
                                                        <CustomInput
                                                            type="text"
                                                            label="Meta Title"
                                                            name="metaTitle"
                                                            value={formData.metaTitle}
                                                            onChange={handleChange}
                                                            placeholder="Meta Title"
                                                        />
                                                    </div>
                                                    {/* Meta Description */}
                                                    <div className="mb-3">
                                                        <CustomInput
                                                            type="text"
                                                            label="Meta Description"
                                                            name="metaDescription"
                                                            value={formData.metaDescription}
                                                            onChange={handleChange}
                                                            placeholder="Meta Description"
                                                        />
                                                    </div>
                                                </div>

                                                <div id="faq" className="tab-pane fade  ">
                                                    <h2 className='section-heading-blue '>FAQ</h2>
                                                    {formData.faqs.map((faq, index) => (
                                                        <div className="col-md-12" key={faq.id}>
                                                            <div className="faq-section border rounded p-3 mb-4 position-relative">
                                                                {/* Question Input */}
                                                                <div className="mb-3 position-relative">
                                                                    <CustomInput
                                                                        label={`Question ${index + 1}`}
                                                                        name="question"
                                                                        value={faq.question}
                                                                        onChange={(e) => handleFAQChange(faq.id, e)}
                                                                        placeholder="Enter Question"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 mt-1 me-1"
                                                                        onClick={() => removeFAQ(faq.id)}
                                                                        title="Remove"
                                                                    >
                                                                        <FaTimes />
                                                                    </button>
                                                                </div>
                                                                {/* Answer Textarea */}
                                                                <div className="mb-2">
                                                                    <label className="form-label" htmlFor={`faq-answer-${faq.id}`}>
                                                                        Answer {index + 1}
                                                                    </label>
                                                                    <textarea
                                                                        id={`faq-answer-${faq.id}`}
                                                                        className="form-control"
                                                                        name="answer"
                                                                        value={faq.answer}
                                                                        onChange={(e) => handleFAQChange(faq.id, e)}
                                                                        placeholder="Enter Answer"
                                                                        rows="4"
                                                                    ></textarea>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="col-md-12 mb-3">
                                                        <button type="button" className="button-primary btn-pry-svg" onClick={addFAQ}>
                                                            <FaPlus /> <span>Add FAQ</span></button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
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

                                    <div className="mt-3">
                                        <FileControl label={'Featured image Mobile'} onChange={showImagePreviewAndValidateMobile} />
                                        {userPhotoMobile ? (
                                            <img className="image_preview" src={userPhotoMobile} alt="User Photo" />
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Select Category</label>
                                        {categoryChain.map((level, index) => (
                                            <div key={index} className="mb-2">
                                                <Select
                                                    options={level.options.map(opt => ({
                                                        label: opt.name,
                                                        value: opt.id,
                                                        ...opt // preserve children
                                                    }))}
                                                    value={level.selected ? { label: level.selected.name, value: level.selected.id } : null}
                                                    onChange={(selectedOption) =>
                                                        handleCategorySelect(selectedOption, index)
                                                    }
                                                    placeholder={`Select Level ${index + 1} Category`}
                                                    styles={customStyles}
                                                />
                                            </div>
                                        ))}

                                        {/* Error message if none selected */}
                                        {!categoryChain.some(level => level.selected) && (
                                            <div className="text-danger">Please select at least one category.</div>
                                        )}
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

export default AddHyperlocal;


