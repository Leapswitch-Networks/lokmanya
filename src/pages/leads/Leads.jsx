import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { perm } from '../../assets/constant';
import { EditIcon, View } from '../../assets/images/icons';
import {  DataTableComponent, DateControl, PrimaryButton, Reset, SearchField } from '../../components';
import TableSkeleton from '../../components/loader/tableSkeleton';
import { useAccessControl } from '../../hooks/useAccessControl';
import '@/styles/lead.css';

import CustomSelect from '../../components/controls/CustomSelect';
import axiosConfig from '../../utils/axiosConfig';
import { getLeadList } from '../../store/leads/leadsAction';
import Modal from '../../components/controls/Modal';
// import SelectInput from '../../site/component/controls/SelectInput';
import SelectInput from '../../site/components/controls/SelectInput';
import { customFilter } from '../../utils/commonHelpers';
import { format } from 'date-fns'; // Import date-fns library
// import SelectField from '../../components/controls/SelectField';
import CsvIcon from '../../assets/images/icons/CsvIcon';
// import { exportData } from '../../store/doctor/doctorAction';
import { exportData } from '../../store/leads/leadsAction';
import Link from 'next/link';


const Leads = () => {
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
  // console.log(updateUser.type)
  const [selectedType, setSelectedType] = useState('default');

  // Export

  const [selectedArea, setSelectedlocation] = useState([]);
  const [areaOptionsexport, setSelectedhospital] = useState([]);
  const [selectedstatus, setStatus] = useState([]);
  const [selectedstatuslead, setStatuslead] = useState([]);
  const [statusExportOptions, setStatusExportOptions] = useState([]);
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
      if (exportfiltersdata.type == 'doctor') {
        filename = 'doctors_leads.csv'
      }
      if (exportfiltersdata.type == 'book_appointment') {
        filename = 'book_appointment.csv'
      }
      if (exportfiltersdata.type == 'lab_test') {
        filename = 'lab_test.csv'
      }
      if (exportfiltersdata.type == 'health_checkup') {
        filename = 'health_checkup.csv'
      }
      if (exportfiltersdata.type == 'second_opinion') {
        filename = 'second_opinion.csv'
      }
      if (exportfiltersdata.type == 'blog') {
        filename = 'blog.csv'
      }
      if (exportfiltersdata.type == 'Inquiry') {
        filename = 'Inquiry.csv'
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
    { value: 1, label: 'Pending' },
    { value: 2, label: 'Completed' }
  ];

  const typeOptions = [
    { value: 'default', label: 'All Forms' },
    { value: 'doctor', label: 'Doctor Lead' },
    { value: 'lab_test', label: 'lab Test' },
    { value: 'health_checkup', label: 'Health Checkup' },
    { value: 'second_opinion', label: 'Second Opinion' },
    { value: 'book_appointment', label: 'Book an Appointment' },
    { value: 'blog', label: 'Blog' },
    { value: 'Inquiry', label: 'Inquiry' },

  ];



  const getLeads = async (filters) => {
    const res = await dispatch(getLeadList(filters));
    setLeadData(res.payload);
  };

  useEffect(() => {
    // Fetch area options
    axiosConfig.get('/get-area')
      .then(response => {
        setAreaOptions(response.data.map(option => ({ value: option.id, label: option.masterName })));
      })
      .catch(error => {
        console.error('Error fetching area options:', error);
      });
    axiosConfig.get('/get-city')
      .then(response => {
        setLocationOptions(response.data.map(option => ({ value: option.id, label: option.masterName })));
      })
      .catch(error => {
        console.error('Error fetching area options:', error);
      });
    setStatusExportOptions([
      { value: '', label: 'Select form type' }, // Initial empty option
      { value: 'doctor', label: 'Doctor Lead' },
      { value: 'book_appointment', label: 'Book An Appointment' },
      { value: 'lab_test', label: 'Lab Test' },
      { value: 'health_checkup', label: 'Health Checkup' },
      { value: 'second_opinion', label: 'Second Opinion' },
      { value: 'blog', label: 'Blog' },
      { value: 'Inquiry', label: 'Inquiry' },



    ])
    setStatusleadOptions([
      { value: '', label: 'Select Status' }, // Initial empty option
      { value: '0', label: 'Pending' },
      { value: '1', label: 'Completed' },

    ])
    getLeads();
  }, []);

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

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption.value);
    setLeadType(selectedOption.value)
  };

  const columns = useMemo(() => {
    switch (selectedType) {
      case 'doctor':
        return [
          { key: "id", name: 'Lead ID', cell: row => `${String(row.id)}` },
          { key: "fullName", name: 'Full Name', cell: row => row.patientName ? <span className="text-truncate">{row.patientName}</span> : '-' },
          { key: "message", name: 'message', cell: row => <span className="text-truncate" title={row.message}>{row.message || '-'}</span> },
          { key: "number", name: 'Mobile Number', cell: row => <span className="text-truncate" title={row.mobileNumber}>{row.mobileNumber || '-'}</span> },


          { key: "hospital", name: 'Hospital', cell: row => <span className="text-truncate" title={`${row?.Area?.masterName}`}>{`${row?.Area?.masterName}`}</span> },
          {
            key: "sources",
            name: 'Sources',
            cell: row => (
              <div className="d-flex align-items-center justify-content-between">
                {/* <span className="text-truncate" title={row?.Doctor?.doctorName}>{row?.Doctor?.doctorName}</span> */}
                <Link
                  href={`/doctors/${row?.Doctor?.slug}`}
                  className='action-icon mx-2 text-nowrap outline-0'
                  aria-label="view"
                >
                  <View height={10} width={30} />
                </Link>
              </div>
            )
          },
          // { key: "paymentType", name: 'Payment Type', cell: row => <span className="text-truncate" title={paymentTypeOptions.find(s => s?.value === row?.paymentType)?.label}>{paymentTypeOptions.find(s => s?.value === row?.paymentType)?.label || '-'}</span> },

          {
            key: "updatedAt",
            name: 'Date',
            cell: row => (
              <span className="text-truncate" title={formatDate(row.updatedAt)}>
                {formatDate(row.updatedAt) ? formatDate(row.updatedAt) : '-'}
              </span>
            ),
          },

          { key: "Status", name: 'Status', cell: row => <span className="text-truncate" title={statusOptions.find(s => s.value === row.status)?.label}>{statusOptions.find(s => s.value === row.status)?.label || '-'}</span> },
          { key: "action", name: 'Action', cell: row => checkPermission("leads", perm.edit, <Link to="/" className='action-icon' onClick={() => setUpdateUser(row)} data-bs-toggle="modal" data-bs-target="#popup"><EditIcon height={15} width={15} /></Link>) }
        ];



      case 'book_appointment':
        return [
          { key: "id", name: 'Lead ID', cell: row => `${String(row.id)}` },
          { key: "fullName", name: 'Full Name', cell: row => row.patientName ? <span className="text-truncate">{row.patientName}</span> : '-' },
          { key: "number", name: 'Mobile Number', cell: row => <span className="text-truncate" title={row.mobileNumber}>{row.mobileNumber || '-'}</span> },
          {
            key: "updatedAt",
            name: 'Date',
            cell: row => (
              <span className="text-truncate" title={formatDate(row.updatedAt)}>
                {formatDate(row.updatedAt) ? formatDate(row.updatedAt) : '-'}
              </span>
            ),
          },
          { key: "action", name: 'Action', cell: row => checkPermission("leads", perm.edit, <Link to="/" className='action-icon' onClick={() => setUpdateUser(row)} data-bs-toggle="modal" data-bs-target="#popup"><EditIcon height={15} width={15} /></Link>) }
        ];

      case 'second_opinion':
        return [
          { key: "id", name: 'Lead ID', cell: row => `${String(row.id)}` },
          { key: "fullName", name: 'Full Name', cell: row => row.patientName ? <span className="text-truncate">{row.patientName}</span> : '-' },
          { key: "number", name: 'Mobile Number', cell: row => <span className="text-truncate" title={row.mobileNumber}>{row.mobileNumber || '-'}</span> },
          {
            key: "updatedAt",
            name: 'Date',
            cell: row => (
              <span className="text-truncate" title={formatDate(row.updatedAt)}>
                {formatDate(row.updatedAt) ? formatDate(row.updatedAt) : '-'}
              </span>
            ),
          },
          { key: "action", name: 'Action', cell: row => checkPermission("leads", perm.edit, <Link to="/" className='action-icon' onClick={() => setUpdateUser(row)} data-bs-toggle="modal" data-bs-target="#popup"><EditIcon height={15} width={15} /></Link>) }
        ];

      case 'health_checkup':
        return [
          { key: "id", name: 'Lead ID', cell: row => `${String(row.id)}` },
          { key: "fullName", name: 'Full Name', cell: row => row.patientName ? <span className="text-truncate">{row.patientName}</span> : '-' },
          { key: "number", name: 'Mobile Number', cell: row => <span className="text-truncate" title={row.mobileNumber}>{row.mobileNumber || '-'}</span> },
          {
            key: "updatedAt",
            name: 'Date',
            cell: row => (
              <span className="text-truncate" title={formatDate(row.updatedAt)}>
                {formatDate(row.updatedAt) ? formatDate(row.updatedAt) : '-'}
              </span>
            ),
          },
          { key: "action", name: 'Action', cell: row => checkPermission("leads", perm.edit, <Link to="/" className='action-icon' onClick={() => setUpdateUser(row)} data-bs-toggle="modal" data-bs-target="#popup"><EditIcon height={15} width={15} /></Link>) }
        ];

      case 'lab_test':
        return [
          { key: "id", name: 'Lead ID', cell: row => `${String(row.id)}` },
          { key: "fullName", name: 'Full Name', cell: row => row.patientName ? <span className="text-truncate">{row.patientName}</span> : '-' },
          { key: "number", name: 'Mobile Number', cell: row => <span className="text-truncate" title={row.mobileNumber}>{row.mobileNumber || '-'}</span> },
          {
            key: "updatedAt",
            name: 'Date',
            cell: row => (
              <span className="text-truncate" title={formatDate(row.updatedAt)}>
                {formatDate(row.updatedAt) ? formatDate(row.updatedAt) : '-'}
              </span>
            ),
          },
          { key: "action", name: 'Action', cell: row => checkPermission("leads", perm.edit, <Link to="/" className='action-icon' onClick={() => setUpdateUser(row)} data-bs-toggle="modal" data-bs-target="#popup"><EditIcon height={15} width={15} /></Link>) }
        ];
      case 'Inquiry':
        return [
          { key: "id", name: 'Lead ID', cell: row => `${String(row.id)}` },
          { key: "fullName", name: 'Full Name', cell: row => row.patientName ? <span className="text-truncate">{row.patientName}</span> : '-' },
          { key: "number", name: 'Mobile Number', cell: row => <span className="text-truncate" title={row.mobileNumber}>{row.mobileNumber || '-'}</span> },
          {
            key: "updatedAt",
            name: 'Date',
            cell: row => (
              <span className="text-truncate" title={formatDate(row.updatedAt)}>
                {formatDate(row.updatedAt) ? formatDate(row.updatedAt) : '-'}
              </span>
            ),
          },
          { key: "action", name: 'Action', cell: row => checkPermission("leads", perm.edit, <Link to="/" className='action-icon' onClick={() => setUpdateUser(row)} data-bs-toggle="modal" data-bs-target="#popup"><EditIcon height={15} width={15} /></Link>) }
        ];

      default:
        return [
          { key: "id", name: 'Lead ID', cell: row => `${String(row.id)}` },
          { key: "fullName", name: 'Full Name', cell: row => row.patientName ? <span className="text-truncate">{row.patientName}</span> : '-' },
          { key: "number", name: 'Mobile Number', cell: row => <span className="text-truncate" title={row.mobileNumber}>{row.mobileNumber || '-'}</span> },

          {
            key: "updatedAt",
            name: 'Date',
            cell: row => (
              <span className="text-truncate" title={formatDate(row.updatedAt)}>
                {formatDate(row.updatedAt) ? formatDate(row.updatedAt) : '-'}
              </span>
            ),
          },
          { key: "Inquiry Type", name: 'Inquiry Type', cell: row => <span className="text-truncate" title={row.type}>{row.type || '-'}</span> },

          { key: "Status", name: 'Status', cell: row => <span className="text-truncate" title={statusOptions.find(s => s.value === row.status)?.label}>{statusOptions.find(s => s.value === row.status)?.label || '-'}</span> },
          { key: "action", name: 'Action', cell: row => checkPermission("leads", perm.edit, <Link to="/" className='action-icon' onClick={() => setUpdateUser(row)} data-bs-toggle="modal" data-bs-target="#popup"><EditIcon height={15} width={15} /></Link>) }
        ];
    }
  }, [selectedType, checkPermission]);

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    const tempData = {
      id: updateUser.id,
      status: updateUser.status,
    };
    try {
      const response = await axiosConfig.post('/update-lead', tempData);
      const res = await dispatch(getLeadList(filterData));
      setLeadData(res.payload);
      editModal.current.click();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const filteredItems = useMemo(() => {
    let filteredData = leadData;
    switch (selectedType) {

      case 'doctor':
        filteredData = leadData.filter(item => item.type === 'doctor');
        break;

      case 'book_appointment':
        filteredData = leadData.filter(item => item.type === 'book_appointment');
        break;
      case 'second_opinion':
        filteredData = leadData.filter(item => item.type === 'second_opinion');
        break;
      case 'blog':
        filteredData = leadData.filter(item => item.type === 'blog');
        break;
      case 'lab_test':
        filteredData = leadData.filter(item => item.type === 'lab_test');
        break;
      case 'Inquiry':
        filteredData = leadData.filter(item => item.type === 'Inquiry');
        break;
      case 'health_checkup':
        filteredData = leadData.filter(item => item.type === 'health_checkup');
        break;

      default:
        break;
    }
    return customFilter(filteredData, [{ id: 'global-filter', value: filterText }], ['id', 'patientName', 'message', 'mobileNumber', 'Area.masterName', 'City.masterName', 'Doctor.doctorName', 'status']);
  }, [filterText, leadData, selectedType]);

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

                <select style={{
                  backgroundColor: '#ffffff', /* Background color */
                  border: '1px solid #000', /* Border color */
                  borderRadius: '4px', /* Rounded corners */
                  marginTtop: '10px,',
                  marginBottom: '10px,',
                  fontSize: '14px',
                  width: '100%',

                }}
                  className='filter-dropdown' onChange={el => handleStatusChange(el.target.value)} required>
                  {statusExportOptions.map(data => (
                    <option key={data.value} value={data.value}>
                      {data.label}
                    </option>
                  ))}
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
      <Modal modalRef={editModal} modalTitle={"Update Status"}>
        <div className='container'>
          <div className='mb-3'>
            <label>Status</label>
            <SelectInput
              className="w-100"
              name="status"
              options={statusOptions}
              onChange={(e) => setUpdateUser(prev => ({ ...prev, status: e.value }))}
              value={statusOptions.find(s => s.value === updateUser.status)}
            />
          </div>
          <div className="">
            {updateUser.type === 'doctor' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>
                {/* <div className="">
                  <span>Message: {updateUser?.message}</span>
                </div> */}
                <div className="">
                  <span>Hospital: {updateUser?.Area?.masterName}</span>
                </div>
                <div className="">
                  <span>Doctor Name: {updateUser?.Doctor?.doctorName}</span>
                </div>
                <div className="">
                  <span>Inquiry Type: {'Doctor Lead'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )}

            {/* {updateUser.type === 'doctor' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>
                <div className="">
                  <span>Message: {updateUser?.message}</span>
                </div>
                <div className="">
                  <span>Hospital: {updateUser?.Area?.masterName}</span>
                </div>
                <div className="">
                  <span>Inquiry Type: {'Doctor Lead'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )} */}





            {updateUser.type === 'blog' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>

                <div className="">
                  <span>Branch: {updateUser?.location}</span>
                </div>
                <div className="">
                  <span>Source: {updateUser?.slug}</span>
                </div>
                <div className="">
                  <span>Message: {updateUser?.message}</span>
                </div>

                <div className="">
                  <span>Inquiry Type: {'Blog'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )}





            {updateUser.type === 'book_appointment' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>

                <div className="">
                  <span>Location: {updateUser?.location}</span>
                </div>

                <div className="">
                  <span>Inquiry Type: {'Book an Appointment'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )}

            {updateUser.type === 'second_opinion' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>

                <div className="">
                  <span>Location: {updateUser?.location}</span>
                </div>

                <div className="">
                  <span>Inquiry Type: {'Second Opinion'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )}

            {updateUser.type === 'health_checkup' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>

                <div className="">
                  <span>Location: {updateUser?.location}</span>
                </div>

                <div className="">
                  <span>Inquiry Type: {'Health Checkup'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )}

            {updateUser.type === 'lab_test' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>

                <div className="">
                  <span>Location: {updateUser?.location}</span>
                </div>

                <div className="">
                  <span>Inquiry Type: {'Lab Test'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )}
            {updateUser.type === 'Inquiry' && (
              <>
                <div className="">
                  <span>Full Name: {updateUser?.patientName}</span>
                </div>
                <div className="">
                  <span>Mobile Number: {updateUser?.mobileNumber}</span>
                </div>
                <div className="">
                  <span>Email: {updateUser?.email}</span>
                </div>
                <div className="">
                  <span>Hospital: {updateUser?.Area?.masterName}</span>
                </div>
                <div className="">
                  <span>Message: {updateUser?.message}</span>
                </div>

                <div className="">
                  <span>Inquiry Type: {'Inquiry'}</span>
                </div>
                <div className="">
                  <span>Date: {formatDate(updateUser.updatedAt) ? formatDate(updateUser.updatedAt) : '-'}</span>
                </div>

              </>
            )}




          </div>
          <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        </div>
      </Modal>

      <div className='resource-header horizontal-p-20'>
        <div className="search-sec">
          <SearchField
            bg_color="#fff"
            placeholder='Search'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="filter-section">


          {/* <CustomSelect
            width={130}
            placeholder="Location"
            options={[{ value: '', label: 'Location' }, ...locationOptions]}
            defaultValue={{ value: 'default', label: 'Location' }}
            value={filterData.location}
            onChange={selectedOption => handleFilterChange(selectedOption, 'location')}
          />
          <CustomSelect
            width={130}
            placeholder="Hospital"
            options={[{ value: '', label: 'Hospital' }, ...areaOptions]}
            defaultValue={{ value: 'default', label: 'Area' }}
            onChange={selectedOption => handleFilterChange(selectedOption, 'area')}
            value={filterData.area}
          /> */}

          <DateControl width="120px" inputRef={dateRef} range rangeHover placeholder='Date' format="YYYY-MM-DD" value={[filterData.startdate, filterData.enddate]} onChange={handleDateChange} />

          <CustomSelect
            width={150}
            placeholder="Status"
            options={statusOptions}
            onChange={selectedOption => handleFilterChange(selectedOption, 'status')}
            value={filterData.status}
          />
          <CustomSelect
            width={150}
            options={typeOptions}
            onChange={handleTypeChange}
            value={typeOptions.find(option => option.value === selectedType)}
          />
          <button aria-label="csv" data-bs-toggle="modal" className='icon-wrapper' data-bs-target="#exampleModal_lead">
            <CsvIcon height={20} width={20} />
          </button>


          <Reset onClick={handleResetFilters} />
        </div>
      </div>
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


export default Leads;
