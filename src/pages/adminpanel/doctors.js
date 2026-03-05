import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { perm } from '../../assets/constant';
import { EditIcon, View } from '../../assets/images/icons';
import { DataTableComponent, DateControl, PrimaryButton, Reset, SearchField } from '../../components';
import TableSkeleton from '../../components/loader/tableSkeleton';
import { useAccessControl } from '../../hooks/useAccessControl';
// import './humanresource.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import DeleteIcon from '../../assets/images/icons/DeleteIcon';
import CustomSelect from '../../components/controls/CustomSelect';
// import { getDoctors } from '../../store/doctor/doctorAction';
// import axiosConfig from '../../utils/axiosConfig';
import SelectField from '../../components/controls/SelectField';
import axios from 'axios';
import { exportData } from '../../store/doctor/doctorAction';
// import CsvIcon from '../../assets/images/icons/CsvIcon';
import { errorToast, successToast } from '../../utils/Toast';
import Link from 'next/link';
import { fetchAllArea, fetchAllSpecialty, getdoctorlistbackend } from '@/ApiActions/CommonApi';
import { deleteDoctor } from '@/ApiActions/Admin/doctoradmin/doctor';

const Doctors = () => {
  const { checkPermission } = useAccessControl()
  const modalHideRef = useRef();
  const dateRef = useRef(null);
  // const { checkRoleAccess } = useAccessControl();
  const [doctorData, setDoctorData] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);
  // const [departmentOptions, setDepartmentOptions] = useState([]);
  const [statusExportOptions, setStatusExportOptions] = useState([]);
  const [exportdate, setexportdate] = useState([]);
  const initialFilterState = {
    area: null,
    specialty: null,
    education: null,
    department: null,
    // amount: null,
    status: null,
    searchTerm: '',
  }

  const [filterData, setFilterData] = useState(initialFilterState);
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState([]);
  const [selectedstatus, setStatus] = useState([]);

  const [selecteddepartment, setSelectedDepartment] = useState([]);

  // const amountOptions = [
  //   { value: null, label: 'Select Amount' },
  //   { value: '0-100', label: '0 - 100' },
  //   { value: '101-200', label: '101-200' },
  //   { value: '201-300', label: '201-300' },
  //   { value: '301-400', label: '301-400' },
  //   { value: '401-500', label: '401-500' },
  //   { value: '501-600', label: '501-600' },
  //   { value: '601-700', label: '601-700' },
  //   { value: '701-800', label: '701-800' },
  //   { value: '801-900', label: '801-900' },
  //   { value: '901-1000', label: '901-1000' },
  //   { value: '1001+', label: '1001 and more' }
  // ];



  const dispatch = useDispatch();

  const statusOptions = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' }
  ];

  // const getDoctorsList = async (filters) => {
  //   const res = await dispatch(getDoctors(filters));
  //   setDoctorData(res.payload);
  // };

  const getDoctorsList = async (filters) => {
    try {
      console.log('filters', filters);

      const getLeads = await getdoctorlistbackend(filters);
      setDoctorData(getLeads.data);

    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {


    getDoctorsList();
  }, []);

  useEffect(() => {
    // Fetch area options
    // fetchAllArea()
    // axiosConfig.get('/get-area')
    //   .then(response => {     
    //     setAreaOptions(response.data.data.map(option => ({ value: option.masterName, label: option.masterName })));
    //   })
    //   .catch(error => {
    //     console.error('Error fetching area options:', error);
    //   });

    const fetchArea = async () => {
      try {
        const response = await fetchAllArea(); // Call your API function
        setAreaOptions(response.data.data.map(option => ({
          value: option.masterName,
          label: option.masterName
        })));
      } catch (error) {
        console.error('Error fetching area options:', error);
      }
    };

    fetchArea(); // Call on component mount

    const fetchAllSpecialtylist = async () => {
      try {
        const response = await fetchAllSpecialty(); // Call your API function
        setSpecialityOptions(response.data.map(option => ({ value: option.id, label: option.masterName })));
      } catch (error) {
        console.error('Error fetching area options:', error);
      }
    };
    fetchAllSpecialtylist();

    // Fetch education options
    // axiosConfig.get('/educations')
    //   .then(response => {
    //     setEducationOptions(response.data.map(option => ({ value: option.masterName, label: option.masterName })));
    //   })
    //   .catch(error => {
    //     console.error('Error fetching education options:', error);
    //   });

    // // Fetch speciality options
    // axiosConfig.get('/get-speciality')
    //   // axiosConfig.get('/get-speciality')
    //   .then(response => {
    //     setSpecialityOptions(response.data.map(option => ({ value: option.id, label: option.masterName })));
    //     // setSpecialityOptions(response.data.map(option => ({ value: option.masterName, label: option.masterName })));
    //   })
    //   .catch(error => {
    //     console.error('Error fetching speciality options:', error);
    //   });

    // Fetch department options
    // axiosConfig.get('/get-department')
    //   .then(response => {
    //     setDepartmentOptions(response.data.map(option => ({ value: option.id, label: option.departmentName })));
    //   })
    //   .catch(error => {
    //     console.error('Error fetching department options:', error);
    //   });
    setStatusExportOptions([
      { value: 'published', label: 'Published' },
      { value: 'draft', label: 'Draft' }
    ])
    getDoctorsList(filterData);
  }, []);

  const handleFilterChange = (selectedOption, name) => {
    let newFilterData = {
      ...filterData,
      [name]: selectedOption?.value ? selectedOption.value : null,
    };

    if (name === 'searchTerm') {
      newFilterData = { searchTerm: selectedOption }
    } else {
      newFilterData = { ...newFilterData, searchTerm: '' };
    }
    setFilterData(newFilterData);
    getDoctorsList(newFilterData);
  };


  const deleteData = async (id) => {
    try {
      const response = await deleteDoctor(id); // Call API function

      // Check if deletion was successful
      if (response?.message == 'Doctor deleted successfully') {
        successToast('Doctor deleted successfully');

        // Refresh doctor list
        getDoctorsList(filterData);
      } else {
        errorToast('Doctor not found or could not be deleted');
        console.error("Error deleting the doctor:", response?.statusText || "Unknown error");
      }
    } catch (error) {
      // Handle API/network errors
      console.error("Error deleting the doctor:", error.message);
      errorToast(error.message || 'Something went wrong');
    }
  };


  const baseURL = process.env.REACT_APP_FILE_BASE_URL;

  const handleDateChange = (dates) => {
    setexportdate({
      ...exportdate,
      startdate: dates && dates[0] ? dates[0].format('YYYY-MM-DD') : null,
      enddate: dates && dates[1] ? dates[1].format('YYYY-MM-DD') : null
    });
  }


  const handleAreaChange = (selectedOptions) => {
    setSelectedArea(selectedOptions);
  };

  const handleSpecialtyChange = (selectedOptions) => {
    setSelectedSpecialty(selectedOptions);
  };

  const handleStatusChange = (selectedOptions) => {
    setStatus(selectedOptions);

  };
  // console.log("Data",selectedstatus);
  // const handleStatusChange = (selectedOption) => {
  //   setStatus(prevData => ({
  //     ...prevData,
  //     status: selectedOption ? selectedOption.value : ''
  //   }));
  // };

  const handledDepartmentChange = (selectedOptions) => {
    setSelectedDepartment(selectedOptions);
  };

  const handleExportData = async (event) => {
    event.preventDefault();

    // Prepare filters for the export API call
    const exportfiltersdata = {
      areas: selectedArea,
      specialties: selectedSpecialty,
      date: exportdate,
      publish: selectedstatus,
      department: selecteddepartment,
      // Include any other filters if needed
    };

    try {
      // Dispatch the exportData action
      const response = await dispatch(exportData(exportfiltersdata));
      // Create a Blob from the response data
      const blob = new Blob([response.payload], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Doctor_List.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);


    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleResetFilters = () => {
    setFilterData(initialFilterState);
    getDoctorsList(initialFilterState);
  };

  const columns = [
    {
      key: "id",
      name: 'ID',
      cell: row => `${String(row.id)}`,
    },
    {
      key: "doctorName",
      name: 'Doctor Name',
      cell: row => row.doctorName ? <span >{row.doctorName}</span> : '-',
    },
    {
      key: "specialty",
      name: 'Speciality',
      cell: row => row.specialty ? (
        <FaCheck style={{ color: 'green' }} />
      ) : (
        <FaTimes style={{ color: 'red' }} />
      ),
      width: '50px',
    },
    // {
    //   key: "description",
    //   name: 'Description',
    //   cell: row => row.description ? (
    //     <FaCheck style={{ color: 'green' }} />
    //   ) : (
    //     <FaTimes style={{ color: 'red' }} />
    //   ),
    //   // cell: row => <span className='ellipsis' title={row.description}>{row.description || '-'}</span>,
    // },
    {
      key: "education",
      name: 'Education',
      cell: row => row.education ? (
        <FaCheck style={{ color: 'green' }} />
      ) : (
        <FaTimes style={{ color: 'red' }} />
      ),
    },

    {
      key: "opdTiming",
      name: 'OPD Availability',
      cell: row => {
        const timing = JSON.parse(row?.opdTiming);
        const daysAvailable = Object.keys(timing.week[0].timings).filter(day => timing.week[0].timings[day].status).length;
        return (
          <span className='text-center w-100'>
            {daysAvailable > 0}
            {` ${daysAvailable} Day${daysAvailable !== 1 ? 's' : ''} `}
          </span>
        );
      }
    },

    {
      key: "area",
      name: 'Area',
      cell: row => row.area ? (
        <FaCheck style={{ color: 'green' }} />
      ) : (
        <FaTimes style={{ color: 'red' }} />
      ),
      // cell: row => <span className='ellipsis' title={row.area}>{row.area || '-'}</span>,
    },
    {
      key: "designation",
      name: 'Designation',
      cell: row => row.designation ? (
        <FaCheck style={{ color: 'green' }} />
      ) : (
        <FaTimes style={{ color: 'red' }} />
      ),
      // cell: row => <span className='ellipsis' title={row.area}>{row.area || '-'}</span>,
    },
    {
      key: "experience",
      name: 'Experience',
      cell: row => row.experience ? (
        <FaCheck style={{ color: 'green' }} />
      ) : (
        <FaTimes style={{ color: 'red' }} />
      ),
      // cell: row => <span className='ellipsis' title={row.area}>{row.area || '-'}</span>,
    },
    // {
    //   key: "amount",
    //   name: 'Amount',
    //   cell: row => row.amount ? (
    //     <span title={row.amount}>
    //       {row.amount}
    //     </span>
    //   ) : (
    //     <span title={row.amount}>
    //       -
    //     </span>
    //   ),
    //   // cell: row => <span className='ellipsis' title={row.amount}>{row.amount || '-'}</span>,
    // },

    {
      key: "Status",
      name: 'status',
      cell: row => <span className='ellipsis text-capitalize' title={row.publish}>{row.publish || '-'}</span>,
    },
    {
      key: "action",
      name: 'Action',
      cell: row => {
        return (
          <>

            {checkPermission("doctors", perm.edit, <Link href={`/adminpanel/doctors/edit/${row.id}`} className='action-icon' aria-label="edit" ><EditIcon height={15} width={15} /></Link>)}
            {checkPermission("doctors", perm.view, (
              <Link href={`/doctors/${row.slug}`} target='_blank' className='action-icon' aria-label="view">
                <View height={15} width={15} />
              </Link>
            ))}
            {checkPermission("doctors", perm.delete, (
              <Link href="javascript:void(0)" className='action-icon' onClick={() => { if (window.confirm('Delete the item?')) { deleteData(row.id) } }} ><DeleteIcon height={15} width={15} /></Link>

            ))}
            {/* {checkPermission("doctors", perm.view, <Link href={`/view-doctor/${row.id}`} className='action-icon' aria-label="view" ><View height={15} width={15} /></Link>)} */}
            {/* <Link to="javascript:void(0)" className='action-icon' onClick={() => { if (window.confirm('Delete the item?')) { deleteData(row.id) } }} ><DeleteIcon height={15} width={15} /></Link> */}

            {/* {checkPermission("doctors", perm.edit,<Link href={`/view-doctor${row.id}`} className='action-icon' aria-label="view" > <View height={15} width={15} /></Link>})} */}
            {/* {<Link href={`/edit-doctor/${row.id}`} className='action-icon' aria-label="edit" > <EditIcon height={15} width={15} /></Link>} */}
          </>
        )
      },
      // width: "130px",
      // style: { paddingRight: 0, justifyContent: 'flex-end' },
    },
  ];
  return (
    <div className="container-listing listing hr-listing ">
      <div className='resource-header horizontal-p-20'>
        <div className="search-sec">
          {/* <SearchField bg_color="#fff" placeholder='Search' /> */}
          <SearchField
            bg_color="#fff"
            value={filterData.searchTerm}
            placeholder='Search'
            onChange={(event) => handleFilterChange(event.target.value, 'searchTerm')}
          />
          <Link href='/adminpanel/doctors/master-module/speciality'>
            <PrimaryButton textTransform={'capitalize'} background={'#fff'} height={'35px'}>Masters</PrimaryButton>
          </Link>
        </div>
        <div className="filter-section">

          <CustomSelect
            value={filterData?.area ? { value: filterData.area, label: filterData.area } : null}
            placeholder="Area"
            width={120}
            options={[{ value: null, label: 'Select Area' }, ...areaOptions]}
            onChange={selectedOption => handleFilterChange(selectedOption, 'area')}
          />

          {/* <CustomSelect
            value={filterData?.specialty ? { value: filterData.specialty, label: filterData.specialty } : null}
            placeholder="Speciality"
            width={140}
            options={[{ value: null, label: 'Select Speciality' }, ...specialityOptions]}
            onChange={selectedOption => handleFilterChange(selectedOption, 'specialty')}
          /> */}
          <CustomSelect
            value={specialityOptions.find(option => option.value === filterData.specialty) || null}
            placeholder="Speciality"
            width={140}
            options={[{ value: null, label: 'Select Speciality' }, ...specialityOptions]}
            onChange={selectedOption => handleFilterChange(selectedOption, 'specialty')}
          />

          {/* <CustomSelect
            value={filterData?.department ? { value: filterData.department, label: filterData.department } : null}
            placeholder="Department"
            width={140}
            options={[{ value: null, label: 'Select Department' }, ...departmentOptions]}
            onChange={selectedOption => handleFilterChange(selectedOption, 'department')}
          /> */}

          {/* <CustomSelect
              value={departmentOptions.find(option => option.value === filterData.department) || null}
              placeholder="Department"
              width={140}
              options={[{ value: null, label: 'Select Department' }, ...departmentOptions]}
              onChange={selectedOption => handleFilterChange(selectedOption, 'department')}
            /> */}
          {/* <CustomSelect
            value={filterData?.amount ? { value: filterData.amount, label: filterData.amount } : null}
            placeholder="Amount"
            width={120}
            options={amountOptions}
            onChange={selectedOption => handleFilterChange(selectedOption, 'amount')}
          /> */}


          <CustomSelect
            value={filterData?.status ? { value: filterData.status, label: filterData.status } : null}
            placeholder="Status"
            width={120}
            options={[{ value: null, label: 'Status' }, ...statusOptions]}
            onChange={selectedOption => handleFilterChange(selectedOption, 'status')}
          />
          {/* <button aria-label="csv" data-bs-toggle="modal" className='icon-wrapper' data-bs-target="#exampleModal_new">
            <CsvIcon height={20} width={20} />
          </button> */}
          <Reset onClick={handleResetFilters} />
          <div className="action-btn">
            {checkPermission("doctors", perm.add,

              <Link href='/adminpanel/doctors/add'>
                <PrimaryButton textTransform={'capitalize'} background={'#fff'} height={'35px'}>Add +</PrimaryButton>
              </Link>)}

          </div>
        </div>
      </div>

      <div className="resource-body hr-listing-body">
        {doctorData && doctorData.length > 0 ? (
          <DataTableComponent
            columns={columns}
            data={doctorData}
            pagination
            progressComponent={<TableSkeleton columns={columns} />}
          />
        ) : (
          <DataTableComponent
            columns={columns}
          />
        )}
      </div>

      <div className="modal fade change-pasword-modal export-modal" id="exampleModal_new" aria-labelledby="exampleModal_newLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body rounded" style={{ background: 'var(--bg-gray)', padding: '20px' }}>
              <div className="d-flex w-100 position-relative align-items-center justify-content-center mb-3">
                <button type="button" className="btn-close position-absolute end-0" data-bs-dismiss="modal" aria-label="Close" ref={modalHideRef}></button>
                <h5 className="modal-title text-center ">Select Data</h5>
              </div>
              <form className="input-fields" onSubmit={handleExportData}>
                <SelectField
                  inputRef={useRef()}
                  width={120}
                  options={areaOptions}
                  value={areaOptions.area}
                  onChange={handleAreaChange}
                  placeholder='Select Hospital'
                />

                <SelectField
                  inputRef={useRef()}
                  width={140}
                  options={specialityOptions}
                  value={specialityOptions.specialty}
                  onChange={handleSpecialtyChange}
                  placeholder='Select Speciality'
                />

                {/* <CustomSelect
              value={specialityOptions.find(option => option.value === filterData.specialty) || null}
              placeholder="Speciality"
              width={140}
              options={[{ value: null, label: 'Select Speciality' }, ...specialityOptions]}
              onChange={selectedOption => handleFilterChange(selectedOption, 'specialty')}
            /> */}


                {/* <SelectField
                  inputRef={useRef()}
                  width={140}
                  options={departmentOptions}
                  value={departmentOptions.department}
                  onChange={handledDepartmentChange}
                  placeholder='Select Department'
                /> */}

                <DateControl inputRef={dateRef} range rangeHover placeholder='Date' format="YYYY-MM-DD" value={[exportdate.startdate, exportdate.enddate]} onChange={handleDateChange} />

                <SelectField
                  inputRef={useRef()}
                  width={140}
                  options={statusExportOptions}
                  value={statusExportOptions.value}
                  onChange={handleStatusChange}
                  placeholder='Select Status'
                />

                <PrimaryButton type="submit" textTransform={'capitalize'} background={'#fff'} height={'35px'}>Export Data</PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Doctors;
