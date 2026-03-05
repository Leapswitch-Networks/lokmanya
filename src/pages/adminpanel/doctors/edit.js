import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import Select from 'react-select';
import GoBack from '../../../components/controls/GoBack';
import '@/styles/adddoctor.css';
import axiosConfig from '../../../utils/axiosConfig';
import { CustomDropdown, CustomInput, FileControl } from '../../../components';
import { errorToast, successToast } from '../../../utils/Toast';
// import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
// import TextEditor from '../../../components/controls/TextEditor';
import { FaTimes } from "react-icons/fa";
import { customStyles } from '../../../components/controls/StatusStyle';
import { useDispatch } from 'react-redux';
import { checkCategoryDetails } from '../../../store/doctor/doctorAction';
// import NewEditor from '../../components/NewEditor/NewEditor';

const EditDoctor = () => {
  const { id } = useParams(); // Assuming you use react-router for routing and doctor ID is passed in the URL
  const router = useRouter();

  const dispatch = useDispatch();
  const initialState = {

    description: '',
    education: [],
    speciality: [],
    // department: [],
    designation: [],
    experience: [],
    area: [],
    // amount_status: '',
    opd_time: '',
    // amount: '',
    mobile_no: '',
    status: 'publish', // Default value for status
    metaTitle: '',
    metaDescription: '',
    doctorSchema: '',
    blog_id: '',
    video_id: '',
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
  const [userPhoto, setUserPhoto] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [educationOptions, setEducationOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  // const [departmentOptions, setDepartmentOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [timings, setTimings] = useState(initialTimingState);
  // const [grades, setGrades] = useState(initialTimingState);

  const [textEditorData, setTextEditorData] = useState(null);
  const [postError, setPostError] = useState({
    blog: false,
    video: false,
  });


  const gradeOptions = [
    { value: 1, label: 'A+' },
    { value: 2, label: 'A' },
    { value: 3, label: 'B' },
    { value: 4, label: 'C' },
  ];
  const fetchData = useCallback(async () => {
    try {
      const doctorResponse = await axiosConfig.get(`/get-doctor/${id}`);
      const doctor = doctorResponse.data;

      // Parse the opdTiming
      const parsedTimings = doctor.opdTiming ? JSON.parse(doctor.opdTiming) : initialTimingState;
      parsedTimings.week.map(async (data, weekIndex) => {
        if (data.city) {
          const response = await axiosConfig.get('/get-area-citywise', {
            params: {
              city: data.city,
            }
          });
          setAreaOptions((prev) => ({ ...prev, [weekIndex]: response.data.map(option => ({ value: option.masterName, label: option.masterName })) }));
        }
      });

      setTextEditorData(doctor?.description);

      const educationResponse = await axiosConfig.get('/educations');
      const [specialityResponse, areaResponse, areaDesignation, areaExperience, cityResponse] = await Promise.all([
        axiosConfig.get('/get-speciality'),
        axiosConfig.get('/get-area'),
        // axiosConfig.get('/get-department'),
        axiosConfig.get('/get-designation'),
        axiosConfig.get('/get-experience'),
        axiosConfig.get('/get-city'),
      ]);
      // Map speciality options
      const specialityOptionsMap = new Map(
        specialityResponse.data.map(option => ([option.id, option.masterName]))
      );

      // Convert doctor's specialties IDs to labels
      const mappedSpecialities = doctor?.specialty?.split(",")
        .filter(spec => spec.trim() !== "")
        .map(specId => ({ value: specId, label: specialityOptionsMap.get(Number(specId)) || specId })) || [];

      // Map Department options
      // const departmentOptionsMap = new Map(
      //   departmentResponse.data.map(option => ([option.id, option.departmentName]))
      // );

      // Convert doctor's specialties IDs to labels
      // const mappeddepartment = doctor?.department?.split(",")
      //   .filter(spec => spec.trim() !== "")
      //   .map(deptId => ({ value: deptId, label: departmentOptionsMap.get(Number(deptId)) || deptId })) || [];


      // const GradeOptions =[
      //   { value: '1', label: 'A+' },
      //   { value: '2', label: 'A' },
      //   { value: '3', label: 'B' },
      //   { value: '4', label: 'C' },
      // ];
      // setGrades(GradeOptions);
      setFormData({
        name: doctor.doctorName,
        description: doctor?.description,
        education: doctor?.education,
        city: doctor?.city?.split(",").map(cit => ({ value: cit, label: cit })),
        // speciality: doctor?.specialty?.split(",").filter(spec => spec.trim() !== "").map(spec => ({ value: spec, label: spec })) || '',
        speciality: mappedSpecialities,
        // department: mappeddepartment,
        // department: doctor?.department?.split(",").filter(dep => dep.trim() !== "").map(dep => ({ value: dep, label: dep })) || '',
        designation: doctor?.designation,
        experience: doctor?.experience?.split(",").filter(exp => exp.trim() !== "").map(exp => ({ value: exp, label: exp })) || '',
        area: doctor?.area?.split(",").map(area => ({ value: area, label: area })),
        opd_time: doctor.opd_time,
        // amount: doctor.amount,
        // amount_status: doctor.amount_status,
        // grade: doctor?.grade?.split(",").filter(exp => exp.trim() !== "").map(exp => ({ value: exp, label: exp })) || '',

        status: doctor.publish,
        mobile_no: doctor.mobile_no,
        featured_images: doctor.featured_images,
        metaTitle: doctor.metaTitle,
        metaDescription: doctor.metaDescription,
        // grade: doctor?.grade
        // ?.split(",")
        // .filter(exp => exp.trim() !== "")
        // .map(label => GradeOptions.find(opt => opt.label === label))
        // .filter(Boolean) || '',
        doctorSchema: doctor.doctorSchema,
        blog_id: doctor.blog_id,
        video_id: doctor.video_id,



        // grade: doctor?.grade
        grade: gradeOptions.find(option => option.value === doctor?.grade) || null


      });
      setUserPhoto(doctor.featured_images);
      setTimings(parsedTimings);




      setEducationOptions(educationResponse.data.map(option => ({ value: option.masterName, label: option.masterName })));
      setCityOptions(cityResponse.data.map(option => ({ value: option.masterName, label: option.masterName })));
      // setSpecialityOptions(specialityResponse.data.map(option => ({ value: option.masterName, label: option.masterName })));
      setSpecialityOptions(specialityResponse.data.map(option => ({ value: option.id, label: option.masterName })));
      // setLocationOptions(areaResponse.data.map(option => ({ value: option.masterName, label: option.masterName })));
      // setDepartmentOptions(departmentResponse.data.map(option => ({ value: option.id, label: option.departmentName })));
      // setDepartmentOptions(departmentResponse.data.map(option => ({ value: option.masterName, label: option.masterName })));
      setExperienceOptions(areaExperience.data.map(option => ({ value: option.masterName, label: option.masterName })));
      setDesignationOptions(areaDesignation.data.map(option => ({ value: option.masterName, label: option.masterName })));
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked ? 1 : 0 : value;
    setFormData({ ...formData, [name]: newValue });

    if (name === 'blog_id' || name === 'video_id') {
      let postData = await dispatch(checkCategoryDetails({ blog_id: value })).then(res => res.payload);
      const isEmpty = postData.length === 0;

      setPostError(prevPostError => ({
        ...prevPostError,
        blog: name === 'blog_id' ? isEmpty : prevPostError.blog,
        video: name === 'video_id' ? isEmpty : prevPostError.video,
      }));
    }
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

  // const handleLocationChange = (weekIndex, selectedOption) => {
  //   setTimings(prev => ({
  //     ...prev,
  //     week: prev.week.map((week, i) => i === weekIndex ? {
  //       ...week,
  //       location: selectedOption.value
  //     } : week)
  //   }));
  // };
  const handleCityChange = async (weekIndex, selectedOption) => {
    let city = selectedOption.value;
    setFormData({ ...formData, city: city })
    setTimings(prev => ({
      ...prev,
      week: prev.week.map((week, i) => i === weekIndex ? {
        ...week,
        city: city
      } : week)
    }));
    try {
      const response = await axiosConfig.get('/get-area-citywise', {
        params: {
          city: city,
        }
      });
      setAreaOptions((prev) => ({ ...prev, [weekIndex]: response.data.map(option => ({ value: option.masterName, label: option.masterName })) }));

    } catch (error) {
      console.error(error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('doctorName', formData.name);
    formData.slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    data.append('slug', formData.slug);


    // data.append('slug', (formData.name || '').toLowerCase().replace(/ /g, '-'));

    data.append('specialty', (formData.speciality || []).map(option => option.value).join(','));
    data.append('education', formData?.education);
    data.append('city', (formData.city))
    // data.append('department', (formData.department || []).map(option => option.value).join(','));
    data.append('designation', formData.designation);
    data.append('experience', (formData.experience || []).map(option => option.value).join(','));

    // data.append('grade', (formData.grade || '').map(option => option.value) );
    // To this:
    data.append('grade', formData.grade?.value || '');


    // data.append('description', formData.description || '');
    data.append('description', textEditorData || '');
    data.append('area', (formData.area));
    // data.append('amount', formData.amount);
    // data.append('amount_status', formData.amount_status);
    data.append('publish', formData.status);
    data.append('mobile_no', formData.mobile_no ? formData.mobile_no : '');

    data.append('opdTiming', JSON.stringify(timings));
    if (selectedFile) {
      data.append('featured_images', selectedFile);
    }
    data.append('metaTitle', formData.metaTitle);
    data.append('metaDescription', formData.metaDescription);
    data.append('doctorSchema', formData.doctorSchema);
    data.append('blog_id', formData.blog_id);
    data.append('video_id', formData.video_id);

    try {
      const response = await axiosConfig.put(`/update-doctor/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        successToast('Doctor updated successfully');
        router.push('/adminpanel/doctors')

      }
    } catch (error) {
      errorToast('There was an error updating the doctor');
      console.error('There was an error updating the doctor:', error);
    }
  };

  const statusOptions = [
    { label: 'Published', value: 'published' },
    { label: 'Draft', value: 'draft' }
  ];


  useEffect(() => {
    fetchData();
  }, [fetchData]);


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

  const timeReason = [
    { label: 'By prior appointment', value: 'By prior appointment' },
    { label: 'Available on 1st Wednesday of Every Month', value: 'Available on 1st Wednesday of Every Month' },
    { label: 'No Fix OPD Slot But Available for OPD on Call', value: 'No Fix OPD Slot But Available for OPD on Call' },
    { label: 'Available on 2nd Friday of Every Month', value: 'Available on 2nd Friday of Every Month' }
  ];
  // const gradeOptions = [
  //   { value: '1', label: 'A+' },
  //   { value: '2', label: 'A' },
  //   { value: '3', label: 'B' },
  //   { value: '4', label: 'C' },
  // ];



  return (
    <div className="full-container">
      <div className="section-header">
        <GoBack to={'/adminpanel/doctors'} />
        <span className="main-heading heading-both">Edit Doctor</span>
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
                    <div className="col-lg-12 col-md-12">
                      {/* <TextEditor onChange={handleDescriptionChange} value={formData.description} /> */}
                      {/* <NewEditor setData={handleDescriptionChange} data={formData.description || ''} />  */}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  {/* <div className="input-outer">
                    <label htmlFor="designation">Designation</label>
                    <Select
                      isMulti
                      name="designation"
                      value={formData.designation}
                      onChange={handleMultiSelectChange}
                      options={designationOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Designation"
                    />
                  </div> */}
                  <CustomInput label={'Designation'} name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter Designation" />
                </div>

                <div className="col-md-6">
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
                {/* <div className="mt-3 col-md-6">
                  <div className="input-outer">
                    <label htmlFor="department">Department</label>
                    <Select
                      isMulti
                      name="department"
                      value={formData.department}
                      onChange={handleMultiSelectChange}
                      options={departmentOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Department"
                    />
                  </div>
                </div> */}
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
                    <label htmlFor="grade">Grade</label>
                    <Select

                      name="grade"
                      value={formData.grade}
                      onChange={(selectedOption) => setFormData({ ...formData, grade: selectedOption })}
                      options={gradeOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Grade"
                    />
                  </div>
                </div>
                {/* <div className="mt-3 col-md-6">
                  <CustomInput type="number" label={'Doctor Pay Amount'} name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Pay Amount" />
                </div> */}
                <div className="mt-3 col-md-6">
                  <CustomInput label={'Mobile Number'} name="mobile_no" value={formData.mobile_no} onChange={handleChange} placeholder="Enter Mobile Number" />
                </div>

                {/* <div className="mt-3 col-md-6">
                  <div className="input-outer">
                    <div className="px-0 form-checkw form-switch">
                      <label className="form-check-label" htmlFor="amount_status">Doctor Pay amount status</label>
                      <input checked={formData.amount_status} name="amount_status" className="form-check-input ms-2" type="checkbox" id="amount_status" onChange={handleChange} />
                    </div>
                  </div>
                </div> */}

                {timings.week.map((week, weekIndex) => (
                  <div key={weekIndex} className="mt-3 col-md-12">
                    <div className="timing-section input-outer">
                      {/* <label className="form-check-label" htmlFor="">Location</label>
                    <div className="d-flex">
                    <Select
                      name={`location_${weekIndex}`}
                      value={locationOptions.find(option => option.value === week.location)}
                      onChange={(selectedOption) => handleLocationChange(weekIndex, selectedOption)}
                      options={locationOptions}
                      className="basic-select w-100"
                      classNamePrefix="select"
                      placeholder="Select Location"
                    />
                    {weekIndex > 0 && (
                        <span className='remove_clone' onClick={() => removeLocationSlot(weekIndex)}><FaTimes /></span>
                    )}
                    
                    </div> */}
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-check-label" htmlFor="">City</label>
                          <Select
                            name={`city${weekIndex}`}
                            value={cityOptions.find(option => option.value === week.city)}
                            onChange={(selectedOption) => handleCityChange(weekIndex, selectedOption)}
                            options={cityOptions}
                            className="basic-select w-100"
                            classNamePrefix="select"
                            placeholder="Select City"

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

                          />
                          {weekIndex > 0 && (
                            <span className='remove_clone' onClick={() => removeLocationSlot(weekIndex)}><FaTimes /></span>
                          )}
                        </div>
                      </div>
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
                                // <Select
                                //     name={`appoiment_status${weekIndex}`}
                                //     value={timeReason.find(option => option.value === week.timings[day].apppoiment_status)}
                                //     onChange={(selectedOption) => handleAppStatusChange(weekIndex, selectedOption, day)}
                                //     options={timeReason}
                                //     className="basic-select w-100"
                                //     classNamePrefix="select"
                                //     placeholder="Select "
                                // />

                                <CustomDropdown name={`appoiment_status${weekIndex}`} onChange={(selectedOption) => handleAppStatusChange(weekIndex, selectedOption.target.value, day)} options={timeReason} defaultOption='Select Reason'
                                  value={week.timings[day].apppoiment_status}
                                  isWhite={true} />
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
                  </div>
                ))}
                <div className="col-md-12">
                  <button type="button" className="btn-clone-week" onClick={cloneWeek}>Clone Week</button>
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
                    <FileControl label={'Featured image'} onChange={showImagePreviewAndValidate} />
                    {userPhoto ? (
                      <img className="image_preview" crossOrigin='anonymous' src={process.env.REACT_APP_FILE_BASE_URL + '/' + userPhoto} alt="User Photo" />
                    ) : <h6 className='px-3 mt-3'>No Images</h6>}
                  </div>
                  {/* <div className="mt-3">
                      <CustomInput type="number" label={'Blog Id'} name="blog_id" value={formData.blog_id} onChange={handleChange} placeholder="Blog Id" />
                      { postError.blog === true && <span className='px-0 error-msg'>Records not found</span>}
                  </div>
                  <div className="mt-3">
                      <CustomInput type="number" label={'Video Id'} name="video_id" value={formData.video_id} onChange={handleChange} placeholder="Video Id" />
                      { postError.video === true && <span className='px-0 error-msg'>Records not found</span>}
                  </div> */}
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditDoctor;
