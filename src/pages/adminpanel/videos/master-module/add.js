'use client';

import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Select from 'react-select';
import { useRouter } from 'next/router';
// import axiosConfig from '../../../../../utils/axiosConfig';
import { CustomInput } from '../../../../components';
import { errorToast, successToast } from '../../../../utils/Toast';
import { customStyles } from '../../../../components/controls/StatusStyle';
import GoBack from '@/components/controls/GoBack';
import { addBlogCategory, getBlogCategoryList } from '@/ApiActions/Admin/blogadmin/blog';

const AddCategory = () => {
    const router = useRouter();
    const [departmentOptions, setDepartmentOptions] = useState([]);

    const initialState = {
        name: '',
        status: 'published', // Change to match your statusOptions value
        department: ''
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        const fetchBlogCategories = async () => {
            try {
                const response = await getBlogCategoryList(); // API call
                const options = response.data.map(option => ({
                    value: option.id,
                    label: option.categoryName
                }));
                setDepartmentOptions(options); // Set dropdown options
            } catch (error) {
                console.error('Error fetching department options:', error);
            }
        };

        fetchBlogCategories(); // Call on mount
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (selectedOption) => {
        setFormData({ ...formData, status: selectedOption.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            categoryName: formData.name,
            parent: formData.department,
            status: formData.status
        };

        try {
           const response = await addBlogCategory(data)

            if (response.status === 201) {
                successToast('Category created successfully');
                router.push('/adminpanel/blog/master-module/category');
                
                resetFormData();
            }
        } catch (error) {
            errorToast('There was an error adding the Category');
            console.error('Error adding the Category:', error);
        }
    };

    const resetFormData = () => {
        setFormData(initialState);
    };

    const statusOptions = [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' }
    ];

    return (
        <div className="full-container">
            <div className="section-header">
                <GoBack to={'/adminpanel/blog/'} />
                <span className="main-heading heading-both">Add category</span>
            </div>
            <div className="section-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomInput
                                        label={'Category Name'}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Category Name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="input-outer">
                                        <label htmlFor="category">Parent Category</label>
                                        <Select
                                            name="parent"
                                            value={departmentOptions.find(option => option.value === formData.department)}
                                            onChange={(selectedOption) =>
                                                setFormData({ ...formData, department: selectedOption ? selectedOption.value : '' })
                                            }
                                            options={departmentOptions}
                                            className="basic-select"
                                            classNamePrefix="select"
                                            placeholder="Select Parent Category"
                                            isClearable
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
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
