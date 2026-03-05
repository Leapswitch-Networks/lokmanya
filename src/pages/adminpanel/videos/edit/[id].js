import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import Select from 'react-select';
import '@/styles/addblog.css';
import { CustomDropdown, CustomInput, FileControl } from '@/components';
import { errorToast, successToast } from '@/utils/Toast';
import { customStyles } from '@/components/controls/StatusStyle';
import NewEditor from '@/components/NewEditor/NewEditor';
import GoBack from '@/components/controls/GoBack';
import { useRouter } from 'next/router';
import { getCategoryblog, getDoctorsblog, updateBlogByID } from '@/ApiActions/Admin/blogadmin/blog';
import { getvideosByIds, updateVideosByID } from '@/ApiActions/Admin/videosadmin/videos';

const EditVideos = () => {
  let router = useRouter();
  const { id } = router.query;

  // const dispatch = useDispatch();
  const initialState = {

    description: '',
    department: [],
    status: 'published',
    metaTitle: '',
    metaDescription: '',
    blogSchema: '',
    videoUrl: '',
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
    if (!id) return;
    try {
      // const blogResponse = await axiosConfig.get(`/get-blog/${id}`);
      const videoResponse = await getvideosByIds(id);

      const video = videoResponse.data;



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

      setTextEditorData(video?.description);
      setCategoryOptions(categoryOptionsMap);
      setDoctorOptions(doctorOptionsMap);


      // Parse the comma-separated category IDs from the video data
      const categoryIds = video.category ? video.category.split(',').map(id => id.trim()) : [];
      const matchedCategories = categoryOptionsMap.filter(option => categoryIds.includes(String(option.value)));

      // Set the form data with selected categories
      setFormData({
        name: video.title,
        doctor: video.related_doctor || "", // Store selected doctor ID
        publish_date: video.publish_date,
        status: video.status,
        thumbnil_image: video.thumbnil_image,
        videoUrl: video.videoUrl || "",

      });

      setUserPhoto(video.thumbnil_image);
    } catch (error) {
      console.error('Error fetching video data:', error);
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

  const handleDoctorSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      doctor: selectedOption ? selectedOption.value : "",
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
    data.append('doctor', formData.doctor);
    data.append('publish_date', formData.publish_date);
    data.append('status', formData.status);
    data.append('videoUrl', formData.videoUrl);
    if (selectedFile) {
      data.append('thumbnil_image', selectedFile);
    }

    try {
      const response = await updateVideosByID(id, data);
      if (response.status === 200) {
        successToast('Videos updated successfully');
        router.push('/adminpanel/videos')

      }
    } catch (error) {
      errorToast('There was an error updating the videos');
      console.error('There was an error updating the videos:', error);
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
        <GoBack to={'/adminpanel/videos'} />
        <span className="main-heading heading-both">Edit Videos</span>
      </div>
      <div className="section-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <CustomInput label={'title'} name="name" value={formData.name} onChange={handleChange} placeholder="Enter Videos Name" required />
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
                  <CustomInput label={'Video URL'} name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Enter Video URL" required />
                </div>


                <div className="col-md-6 mt-3">
                  <div className="input-outer">
                    <label>Related Doctor</label>
                    <Select
                      name="doctorName"
                      value={doctorOptions.find(option => option.value == formData.doctor) || null}
                      onChange={handleDoctorSelectChange}
                      options={doctorOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Doctor"
                    />
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
                    {userPhoto ? (
                      <img
                        className="image_preview"
                        crossOrigin="anonymous"
                        src={
                          userPhoto.startsWith("data:") || userPhoto.startsWith("data")
                            ? userPhoto
                            : process.env.NEXT_PUBLIC_SITE_URL + '/' + userPhoto
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

export default EditVideos;
