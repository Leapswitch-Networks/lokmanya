import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { EditIcon, View } from '@/assets/images/icons';
import {  DataTableComponent, DateControl, PrimaryButton, Reset, SearchField } from '@/components';
import TableSkeleton from '@/components/loader/tableSkeleton';
import { useAccessControl } from '@/hooks/useAccessControl';

// import CustomSelect from '@/components/controls/CustomSelect';
// import axiosConfig from '../../utils/axiosConfig';
// import { getLeadList } from '../../store/leads/leadsAction';
// import Modal from '@/components/controls/Modal';
// import SelectInput from '../../site/component/controls/SelectInput';
// import { customFilter } from '../../utils/commonHelpers';
import { format } from 'date-fns'; // Import date-fns library
// import SelectField from '@/components/controls/SelectField';
// import CsvIcon from '../../assets/images/icons/CsvIcon';
// import { exportData } from '../../store/doctor/doctorAction';
// import { exportData } from '../../store/leads/leadsAction';
// import { getblog } from '../../store/blog/blogAction';
import { errorToast, successToast } from '@/utils/Toast';
import { getblogbackend } from '@/ApiActions/CommonApi';
import { perm } from '@/assets/constant';
import { exportData } from '@/store/leads/leadsAction';
import DeleteIcon from '@/assets/images/icons/DeleteIcon';
import { deleteBlog } from '@/ApiActions/Admin/blogadmin/blog';


const BlogList = () => {
  const { checkPermission } = useAccessControl();
  const [leadData, setLeadData] = useState([]);
  const [leadType, setLeadType] = useState('default');
  const editModal = useRef(null);
  const dateRef = useRef(null);
  const [updateUser, setUpdateUser] = useState(false);
  const [areaOptions, setAreaOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterData, setFilterData] = useState({
    area: null,
    location: null,
    paymentType: null,
    status: null,
    type: null,
    startdate: null,
    enddate: null
  });

  const [selectedType, setSelectedType] = useState('default');



  const [selectedArea, setSelectedlocation] = useState([]);
  const [areaOptionsexport, setSelectedhospital] = useState([]);
  const [selectedstatus, setStatus] = useState([]);
  const [selectedstatuslead, setStatuslead] = useState([]);
  const [statusleadOptions, setStatusleadOptions] = useState([]);

  const [exportdate, setExportDate] = useState({
    startdatelead: null,
    enddatelead: null
  });

  const handleDateChangelead = (dates) => {
    if (Array.isArray(dates)) {
      setExportDate({
        startdatelead: dates[0] ? dates[0].format('YYYY-MM-DD') : null,
        enddatelead: dates[1] ? dates[1].format('YYYY-MM-DD') : null
      });
    } else {
      // If dates is null or not an array, reset the date range in the state
      setExportDate({
        startdatelead: null,
        enddatelead: null
      });
    }
  }



  const handleLocationChange = (selectedOptions) => {
    setSelectedlocation(selectedOptions);
  };

  const handlehospitalChange = (selectedOptions) => {
    setSelectedhospital(selectedOptions);
  };
  const handleStatusChange = (selectedOptions) => {
    setStatus(selectedOptions);
  };
  const handleStatusleadChange = (selectedOptions) => {
    setStatuslead(selectedOptions);
  };




  const handleExportData = async (event) => {
    event.preventDefault();

    // Prepare filters for the export API call
    const exportfiltersdata = {
      cityId: selectedArea,
      areaId: areaOptionsexport,
      date: exportdate,
      type: selectedstatus,
      status: selectedstatuslead
    };

    try {
      // Dispatch the exportData action
      const response = await dispatch(exportData(exportfiltersdata));
      // Create a Blob from the response data
      let filename = 'lead.csv'
      if (exportfiltersdata.type == 'doctor_lead') {
        filename = 'doctors_leads.csv'
      }
      if (exportfiltersdata.type == 'sample_collection') {
        filename = 'sample_collection_leads.csv'
      }
      if (exportfiltersdata.type == 'home_care_service') {
        filename = 'home_care_service_leads.csv'
      }
      if (exportfiltersdata.type == 'call_back_request') {
        filename = 'call_back_request_leads.csv'
      }
      if (exportfiltersdata.type == 'book_an_appointment') {
        filename = 'book_an_appointment_leads.csv'
      }
      if (exportfiltersdata.type == 'blog') {
        filename = 'blog.csv'
      }
      if (exportfiltersdata.type == 'feedback') {
        filename = 'feedback_lead.csv'
      }
      if (exportfiltersdata.type == 'suraksha_kawach') {
        filename = 'suraksha_kawach.csv'
      }
      const blob = new Blob([response.payload], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);


    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };



  const paymentTypeOptions = [
    { value: '0', label: 'Enquiry' },
    { value: '1', label: 'Pay Online' }
  ];

  const dispatch = useDispatch();

  const statusOptions = [
    { value: '0', label: 'Pending' },
    { value: '1', label: 'Completed' }
  ];



  const deleteData = async (id) => {
    try {
      const response = await deleteBlog(id); // Call API function

      // Check if deletion was successful
      if (response?.message == 'Blog deleted successfully') {
        successToast('Blog deleted successfully');

        // Refresh doctor list
        getLeads();

      } else {
        errorToast('Blog not found or could not be deleted');
        console.error("Error deleting the doctor:", response?.statusText || "Unknown error");
      }
    } catch (error) {
      // Handle API/network errors
      console.error("Error deleting the doctor:", error.message);
      errorToast(error.message || 'Something went wrong');
    }
  };



  // const getLeads = async (filters) => {
  //   const res = await dispatch(getblog(filters));
  //   setLeadData(res.payload);
  // };

  const getLeads = async (filters = {}) => {
    try {
      console.log('filters', filters);
      const res = await getblogbackend(filters);
      setLeadData(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    getLeads(); // Initial fetch
  }, []);

  // useEffect(() => {
  //   // Fetch area options
  //   axiosConfig.get('/get-area')
  //     .then(response => {
  //       setAreaOptions(response.data.map(option => ({ value: option.id, label: option.masterName })));
  //     })
  //     .catch(error => {
  //       console.error('Error fetching area options:', error);
  //     });
  //   axiosConfig.get('/get-city')
  //     .then(response => {
  //       setLocationOptions(response.data.map(option => ({ value: option.id, label: option.masterName })));
  //     })
  //     .catch(error => {
  //       console.error('Error fetching area options:', error);
  //     });

  //   setStatusleadOptions([
  //     { value: '', label: 'Select Status' }, // Initial empty option
  //     { value: '0', label: 'Pending' },
  //     { value: '1', label: 'Completed' },

  //   ])
  //   getLeads();
  // }, []);

  const handleFilterChange = (selectedOption, name) => {
    let newFilterData = {
      ...filterData,
      [name]: selectedOption || null,
    };

    setFilterData(newFilterData);
    getLeads({
      location: newFilterData?.location?.value || null,
      area: newFilterData?.area?.value || null,
      paymentType: newFilterData?.paymentType?.value || null,
      status: newFilterData?.status?.value || null,
      type: newFilterData?.type?.value || null,
      // startdate:selectedOption[0]?.format('YYYY-MM-DD') || null,
      // enddate:selectedOption[1]?.format('YYYY-MM-DD') || null,
    });
  };
  const handleDateChange = (dates) => {
    setFilterData({
      ...filterData,
      startdate: dates[0] ? dates[0].format('YYYY-MM-DD') : null,
      enddate: dates[1] ? dates[1].format('YYYY-MM-DD') : null
    });

    getLeads({
      area: filterData.area?.value || null,
      location: filterData.location?.value || null,
      paymentType: filterData.paymentType?.value || null,
      status: filterData.status?.value || null,
      type: filterData.type?.value || null,
      startdate: dates[0]?.format('YYYY-MM-DD') || null,
      enddate: dates[1]?.format('YYYY-MM-DD') || null,
    });
  };
  const handleResetFilters = () => {
    const resetData = {
      area: null,
      location: null,
      paymentType: null,
      status: null,
      type: null,
    };
    setFilterData(resetData);
    setFilterData(prevFilterData => ({
      ...prevFilterData,
      startdate: null,
      enddate: null
    }));
    getLeads(resetData);
    dateRef?.current?.clearValue();

  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy hh:mm a");
  };



  const columns = useMemo(() => {
    switch (selectedType) {
      default:
        return [
          { key: "id", name: 'Blog Id', cell: row => `${String(row.id)}` },
          { key: "title", name: 'Title', cell: row => row.title ? <span className="text-truncate">{row.title}</span> : '-' },
          { key: "publish_date", name: 'Publish Date', cell: row => <span className="text-truncate" title={row.publish_date}>{row.publish_date || '-'}</span> },


          // { key: "departmentNames", name: 'Department', cell: row => <span className="text-truncate" title={row.departmentNames}>{row.departmentNames || '-'}</span> },
          { key: "status", name: 'status', cell: row => <span className="text-truncate" title={row.status}>{row.status || '-'}</span> },

          {
            key: "action",
            name: 'Action',
            cell: row => {
              return (
                <>

                  {checkPermission("blog", perm.edit, <Link href={`/adminpanel/blog/edit/${row.id}`} className='action-icon' aria-label="edit" ><EditIcon height={15} width={15} /></Link>)}
                  {checkPermission("blog", perm.view, (
                    <Link href={`/blogs/${row.slug}`} className='action-icon' target='_blank' aria-label="view">
                      <View height={15} width={15} />
                    </Link>
                  ))}
                  {checkPermission("blog", perm.delete, (
                    <Link href="javascript:void(0)" className='action-icon' onClick={() => { if (window.confirm('Delete the item?')) { deleteData(row.id) } }} ><DeleteIcon height={15} width={15} /></Link>

                  ))}
                </>
              )
            },
            // width: "130px",
            // style: { paddingRight: 0, justifyContent: 'flex-end' },
          },
        ];
    }
  }, [selectedType, checkPermission]);



  const filteredItems = useMemo(() => {
    if (!leadData) return [];

    const text = filterText.toLowerCase();

    return leadData.filter(item =>
      item?.id?.toString().includes(text) ||
      item?.title?.toLowerCase().includes(text) ||
      item?.departmentNames?.toLowerCase().includes(text) ||
      item?.status?.toLowerCase().includes(text)
    );
  }, [filterText, leadData]);

  return (

    <div className={`container-listing listing lead ${leadType}`}>

      <div className="modal fade change-pasword-modal export-modal" id="exampleModal_lead" aria-labelledby="exampleModal_newLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body rounded" style={{ background: 'var(--bg-gray)', padding: '20px' }}>
              <div className="d-flex w-100 position-relative align-items-center justify-content-center mb-3">
                <button type="button" className="btn-close position-absolute end-0" data-bs-dismiss="modal" aria-label="Close" ></button>
                <h5 className="modal-title text-center ">Select Data</h5>
              </div>
              <form className="input-fields" onSubmit={handleExportData}>


                {/* <SelectField
                  inputRef={useRef()}
                  width={140}
                  options={areaOptions}
                  value={areaOptions.area}
                  onChange={handlehospitalChange}
                  placeholder='Select Hospital'
                /> */}
                {/* <SelectField
                  inputRef={useRef()}
                  width={140}
                  options={statusleadOptions}
                  value={statusleadOptions.value}
                  onChange={handleStatusleadChange}
                  placeholder='Select Status'
                   // This makes the field required
                /> */}
                <select style={{
                  // appearance: 'none', /* Remove default styling */
                  backgroundColor: '#ffffff', /* Background color */
                  border: '1px solid #000', /* Border color */
                  borderRadius: '4px', /* Rounded corners */
                  // padding: '10px 12px', /* Padding inside the dropdown */
                  marginTtop: '10px,',
                  marginBottom: '10px,',
                  fontSize: '14px', /* Font size */
                  width: '100%', /* Full width for responsiveness */
                  // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', /* Shadow for better visibility */
                  // outline: 'none', /* Remove outline on focus */
                }}
                  className='filter-dropdown' onChange={el => handleStatusChange(el.target.value)} required>

                </select>
                <DateControl
                  // width="120px"
                  inputRef={dateRef}
                  range
                  rangeHover
                  placeholder='Date'
                  format="YYYY-MM-DD"
                  value={[exportdate.startdatelead, exportdate.enddatelead]}
                  onChange={handleDateChangelead}
                />


                <PrimaryButton type="submit" textTransform={'capitalize'} background={'#fff'} height={'35px'}>Export Data</PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div className='resource-header horizontal-p-20'>
        <div className="search-sec">
          <SearchField
            bg_color="#fff"
            placeholder='Search'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <Link href='/adminpanel/blog/master-module/category'>
            <PrimaryButton textTransform={'capitalize'} background={'#fff'} height={'35px'}>Masters</PrimaryButton>
          </Link>
        </div>
        <div className="filter-section">
          {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_lead">
        Launch demo modal
      </button> */}

          {/* <CustomSelect
            width={130}
            placeholder="Location"
            options={[{ value: '', label: 'Location' }, ...locationOptions]}
            defaultValue={{ value: 'default', label: 'Location' }}
            value={filterData.location}
            onChange={selectedOption => handleFilterChange(selectedOption, 'location')}
          /> */}
          {/* <CustomSelect
            width={130}
            placeholder="Hospital"
            options={[{ value: '', label: 'Hospital' }, ...areaOptions]}
            defaultValue={{ value: 'default', label: 'Area' }}
            onChange={selectedOption => handleFilterChange(selectedOption, 'area')}
            value={filterData.area}
          /> */}



          <DateControl width="120px" inputRef={dateRef} range rangeHover placeholder='Date' format="YYYY-MM-DD" value={[filterData.startdate, filterData.enddate]} onChange={handleDateChange} />
          {/* <DateControl inputRef={dateRef} range rangeHover placeholder='Date' format="YYYY-MM-DD" value={[exportdate.startdate, exportdate.enddate]} onChange={handleDateChangelead} /> */}

          {/* <CustomSelect
            width={150}
            placeholder="Status"
            options={statusOptions}
            onChange={selectedOption => handleFilterChange(selectedOption, 'status')}
            value={filterData.status}
          />
          */}
          {/* <button aria-label="csv" data-bs-toggle="modal" className='icon-wrapper' data-bs-target="#exampleModal_lead">
            <CsvIcon height={20} width={20} />
          </button> */}



          <Reset onClick={handleResetFilters} />
          <div className="action-btn">
            {checkPermission("doctors", perm.add,

              <Link href='/adminpanel/blog/add'>
                <PrimaryButton textTransform={'capitalize'} background={'#fff'} height={'35px'}>Add +</PrimaryButton>
              </Link>)}

          </div>
        </div>
      </div>
      {/* <p>{filterData.startdate} {filterData.enddate}</p> */}
      <div className="resource-body hr-listing-body">
        {filteredItems && filteredItems.length > 0 ? (
          <DataTableComponent
            columns={columns}
            data={filteredItems}
            pagination
            progressComponent={<TableSkeleton columns={columns} />}
          />
        ) : (
          <DataTableComponent
            columns={columns}
          />
        )}
      </div>

    </div>


  );
};


export default BlogList;
