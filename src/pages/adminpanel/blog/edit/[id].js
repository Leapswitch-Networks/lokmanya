import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import Select from 'react-select';
import '@/styles/addblog.css';
// import axiosConfig from '@/utils/axiosConfig';
import { CustomDropdown, CustomInput, FileControl } from '@/components';
import { errorToast, successToast } from '@/utils/Toast';
// import ReactQuill from 'react-quill';
// import { useParams } from 'react-router-dom';
// import TextEditor from '@/components/controls/TextEditor';
// import { FaTimes } from "react-icons/fa";
import { customStyles } from '@/components/controls/StatusStyle';
// import { useDispatch } from 'react-redux';
// import { checkCategoryDetails } from '@/store/doctor/doctorAction';
import NewEditor from '@/components/NewEditor/NewEditor';
import GoBack from '@/components/controls/GoBack';
import { useRouter } from 'next/router';
import { getBlogByID, getCategoryblog, getDoctorsblog, updateBlogByID } from '@/ApiActions/Admin/blogadmin/blog';

const EditBlog = () => {
  // const { id } = useParams(); // Assuming you use react-router for routing and doctor ID is passed in the URL
  let router = useRouter();
  const { id } = router.query;

  // const dispatch = useDispatch();
  const initialState = {

    description: '',
    department: [],
    status: 'published', // Default value for status
    metaTitle: '',
    metaDescription: '',
    blogSchema: '',
  };



  const [formData, setFormData] = useState(initialState);
  const [userPhoto, setUserPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textEditorData, setTextEditorData] = useState(null);
  const [userPhotoMobile, setUserPhotoMobile] = useState(null);
  const [selectedFilemobile, setSelectedFilemobile] = useState(null);


  const [input, setInput] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);




  const fetchData = useCallback(async () => {
    try {
      // const blogResponse = await axiosConfig.get(`/get-blog/${id}`);
      const blogResponse = await getBlogByID(id);

      const blog = blogResponse.data;



      // Fetch categories for the dropdown
      // const categoryResponse = await axiosConfig.get('/categoryList');
      const categoryResponse = await getCategoryblog();
      const categoryOptionsMap = categoryResponse.data.map(option => ({
        value: option.id,
        label: option.categoryName,
      }));

      // const doctorResponse = await axiosConfig.get('/get-blog-doctor');
      const doctorResponse = await getDoctorsblog();
      const doctorOptionsMap = doctorResponse.data.map(option => ({
        value: option.id,
        label: option.doctorName,
      }));

      setTextEditorData(blog?.description);
      setCategoryOptions(categoryOptionsMap);
      setDoctorOptions(doctorOptionsMap);


      // Parse the comma-separated category IDs from the blog data
      const categoryIds = blog.category ? blog.category.split(',').map(id => id.trim()) : [];
      const matchedCategories = categoryOptionsMap.filter(option => categoryIds.includes(String(option.value)));

      const doctorIds = blog.doctor ? blog.doctor.split(',').map(id => id.trim()) : [];
      const matcheddoctor = doctorOptionsMap.filter(option => doctorIds.includes(String(option.value)));

      // Set the form data with selected categories
      setFormData({
        name: blog.title,
        slug: blog.slug,
        description: blog.description,
        categoryName: matchedCategories.map(option => option.value), // Store selected category IDs
        doctor: matcheddoctor.map(option => option.value), // Store selected category IDs
        publish_date: blog.publish_date,
        author: blog.author,
        status: blog.status,
        thumbnil_image: blog.thumbnil_image,
        banner_image: blog.banner_image,
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        blogSchema: blog.blogSchema,
      });

      setUserPhoto(blog.thumbnil_image);
      setUserPhotoMobile(blog.banner_image);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  }, [id]);


  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked ? 1 : 0 : value;
    setFormData({ ...formData, [name]: newValue });
  };

  // Category select handler (to update selected categories)
  const handleMultiSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      categoryName: selectedOptions ? selectedOptions.map(option => option.value) : [], // Store category IDs
    });
  };

  const handleDoctorSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      doctor: selectedOptions ? selectedOptions.map(option => option.value) : [],
    });
  };


  // Handle category select change (single select)
  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      categoryName: selectedOption ? [selectedOption.value] : [], // Set single category ID
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

  const showImagePreviewAndValidateMobile = (e) => {
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
      setSelectedFilemobile(selectedFilemobile);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.name);
    data.append('slug', formData.slug);
    data.append('category', formData.categoryName);
    data.append('doctor', formData.doctor);
    data.append('author', formData.author);
    data.append('publish_date', formData.publish_date);
    data.append('description', textEditorData || '');
    data.append('status', formData.status);
    if (selectedFile) {
      data.append('thumbnil_image', selectedFile);
    }
    if (selectedFilemobile) {
      data.append('banner_image', selectedFilemobile);
    }
    data.append('metaTitle', formData.metaTitle);
    data.append('metaDescription', formData.metaDescription);
    data.append('blogSchema', formData.blogSchema);
    try {
      // const response = await axiosConfig.put(`/update-blog/${id}`, data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
       const response = await updateBlogByID(id, data);
      if (response.status === 200) {
        successToast('Blog updated successfully');
        router.push('/adminpanel/blog')

      }
    } catch (error) {
      errorToast('There was an error updating the blog');
      console.error('There was an error updating the blog:', error);
    }
  };

  const statusOptions = [
    { label: 'Published', value: 'published' },
    { label: 'Draft', value: 'draft' }
  ];

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="full-container">
      <div className="section-header">
        <GoBack to={'/adminpanel/blog'} />
        <span className="main-heading heading-both">Edit Blog</span>
      </div>
      <div className="section-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <CustomInput label={'Blog Name'} name="name" value={formData.name} onChange={handleChange} placeholder="Enter Blog Name" required />
                </div>
                <div className="col-md-6">
                  <CustomInput label={'slug'} name="slug" value={formData.slug} onChange={handleChange} placeholder="Enter Permalink" required />
                </div>

                <div className="col-md-12 my-3">
                  <div className="input-outer">
                    <label htmlFor="description">Blog Description</label>
                    <div className="col-lg-12 col-md-12">
                      {/* <TextEditor onChange={handleDescriptionChange} value={formData.description} /> */}
                      <NewEditor setData={handleDescriptionChange} data={formData.description || ''} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <CustomInput label={'Author'} name="author" value={formData.author} onChange={handleChange} placeholder="Enter Author" required />
                </div>
                <div className="col-md-6">
                  <label>Publish Date</label>
                  <input
                    type="date"
                    name="publish_date"
                    value={formData.publish_date}
                    onChange={handleChange}
                    placeholder="Select a Date"
                    className="form-control"
                    required
                  />
                </div>



                <div className="col-md-6 mt-3">
                  <div className="input-outer">
                    <label>Category</label>
                    <Select
                      isMulti
                      name="categoryName"
                      value={categoryOptions.filter(option =>
                        formData.categoryName.includes(option.value)
                      )}
                      onChange={handleMultiSelectChange}
                      options={categoryOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Categories"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="input-outer">
                    <label>Related Doctor</label>
                    <Select
                      isMulti
                      name="doctorName"
                      value={doctorOptions.filter(option =>
                        formData.doctor.includes(option.value)
                      )}
                      onChange={handleDoctorSelectChange}
                      options={doctorOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Doctor"
                    />
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <CustomInput type="text" label={'Meta Title'} name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="Meta Title" />
                </div>
                <div className="col-md-6 mt-3">
                  <CustomInput type="text" label={'Meta Description'} name="metaDescription" value={formData.metaDescription} onChange={handleChange} placeholder="Meta Description" />
                </div>

                <div className="col-md-12 my-3">
                  <div className="input-outer">
                    <label htmlFor="schema">Schema</label>
                    <textarea id="schema" className='form-control' name="blogSchema" value={formData.blogSchema} onChange={handleChange} rows="5" style={{ border: '1px solid #8c8f94' }}></textarea>
                  </div>
                </div>


              </div>
            </div>
            <div className="col-md-3">
              <div className="status-sec">
                <div className="input-outer">
                  <label htmlFor="" style={{ marginLeft: '0px' }}>Status</label>
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
                    <FileControl label={'Thumbnil Image'} onChange={showImagePreviewAndValidate} accept="image/webp" />
                    {/* {userPhoto ? (
                      <img className="image_preview" crossOrigin='anonymous' src={process.env.REACT_APP_FILE_BASE_URL + '/' + userPhoto} alt="User Photo" />
                    ) : <img className="image_preview" src={userPhoto} alt="User Photo" />}
                   */}
                    {userPhoto ? (
                      <img
                        className="image_preview"
                        crossOrigin="anonymous"
                        src={
                          userPhoto.startsWith("data:") || userPhoto.startsWith("data")
                            ? userPhoto
                            : process.env.REACT_APP_FILE_BASE_URL + '/' + userPhoto
                        }
                        alt="User Photo"
                      />
                    ) : (
                      <p>No image selected</p>
                    )}

                  </div>
                  <div className="mt-3">
                    <FileControl label={'Banner image'} onChange={showImagePreviewAndValidateMobile} accept="image/webp" />
                    {userPhotoMobile ? (
                      <img
                        className="image_preview"
                        crossOrigin="anonymous"
                        src={
                          userPhotoMobile.startsWith("data:") || userPhotoMobile.startsWith("data")
                            ? userPhotoMobile
                            : process.env.REACT_APP_FILE_BASE_URL + '/' + userPhotoMobile
                        }
                        alt="User Photo"
                      />
                    ) : (
                      <p>No image selected</p>
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

export default EditBlog;
