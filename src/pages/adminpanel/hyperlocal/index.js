import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { perm } from '../../../assets/constant';
import { EditIcon, View } from '../../../assets/images/icons';
import { DataTableComponent, PrimaryButton, Reset, SearchField } from '../../../components';
import TableSkeleton from '../../../components/loader/tableSkeleton';
import { useAccessControl } from '../../../hooks/useAccessControl';
// import DeleteIcon from '../../../assets/images/icons/DeleteIcon';
import CustomSelect from '../../../components/controls/CustomSelect';
import { errorToast, successToast } from '../../../utils/Toast';
import Link from 'next/link';
import { fetchAllArea } from '@/ApiActions/CommonApi';
import axiosConfig from '@/utils/axiosConfig';
import { getHyperlocalListAll } from '@/ApiActions/Admin/hyperlocaladmin/hyperlocal';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';

const HyperlocalList = () => {
  const { checkPermission } = useAccessControl();
  const dispatch = useDispatch();
  const router = useRouter();

  const [hyperlocalData, setHyperlocalData] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);

  const categoryTypeOptions = [
    { value: 'best-hospital', label: 'Best Hospital', id: 1 },
    { value: 'best-treatment', label: 'Best Treatment', id: 2 },
    { value: 'best-doctors', label: 'Best Doctor', id: 3 },
  ];

  const defaultType = categoryTypeOptions[0]; // best-hospital

  const [filterData, setFilterData] = useState({
    type: defaultType.value,
    typeId: defaultType.id,
    area: null,
    status: null,
    searchTerm: ''
  });


  const statusOptions = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' }
  ];

  const getHyperlocalList = async (filters = {}) => {
    try {
      const res = await getHyperlocalListAll(filters);
      setHyperlocalData(res.data?.data || []);
    } catch (error) {
      console.error('Error fetching hyperlocal list:', error);
    }
  };

  const handleFilterChange = (selectedOption, name) => {
    setFilterData(prev => ({
      ...prev,
      [name]: name === 'searchTerm' ? selectedOption : selectedOption?.value || null
    }));
  };

  const handleResetFilters = () => {
    const resetFilters = {
      type: defaultType.value,
      typeId: defaultType.id,
      area: null,
      status: null,
      searchTerm: ''
    };
    setFilterData(resetFilters);
    getHyperlocalList(resetFilters);
  };



  const deleteData = async (id) => {
    try {
      const response = await axiosConfig.delete(`/delete-hyperlocal/${id}`);
      if (response.status === 200) {
        successToast('Hyperlocal deleted successfully');
        getHyperlocalList(filterData);
      } else {
        errorToast('Hyperlocal not found');
      }
    } catch (error) {
      console.error('Error deleting hyperlocal:', error.message);
    }
  };

  // Fetch areas on mount
  useEffect(() => {
    const fetchArea = async () => {
      try {
        const response = await fetchAllArea();
        const options = response.data.data.map(area => ({
          value: area.masterName,
          label: area.masterName
        }));
        setAreaOptions([{ value: null, label: 'Select Area' }, ...options]);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchArea();
  }, []);

  // Fetch data whenever filters change
  useEffect(() => {
    if (filterData.typeId) {
      getHyperlocalList(filterData);
    }
  }, [filterData]);


  const columns = [
    { key: 'id', name: 'ID', cell: row => String(row.id) },
    { key: 'title', name: 'Title', cell: row => row.title || '-' },
    { key: 'CategoryId', name: 'Category ID', cell: row => row.category.name || '-' },
    // {
    //   key: 'Status',
    //   name: 'Status',
    //   cell: row => <span className="text-capitalize">{row.status || '-'}</span>
    // },
    {
      key: 'action',
      name: 'Action',
      cell: row => (
        <>
          {checkPermission("hyperlocal", perm.edit,
            <Link href={`/adminpanel/hyperlocal/${filterData.type}/edit/${row.id}`} className='action-icon'>
              <EditIcon height={15} width={15} />
            </Link>
          )}
          {checkPermission("hyperlocal", perm.view,
            <Link href={`/${filterData.type}/${row.slug}`} target='_blank' className='action-icon'>
              <View height={15} width={15} />
            </Link>
          )}
          {/* {checkPermission("hyperlocal", perm.delete,
            <Link href="javascript:void(0)" className='action-icon' onClick={() => {
              if (window.confirm('Delete the item?')) {
                deleteData(row.id);
              }
            }}>
              <DeleteIcon height={15} width={15} />
            </Link>
          )} */}
        </>
      )
    }
  ];

  return (
    <div className="container-listing listing hr-listing">
      <div className='resource-header horizontal-p-20'>
        <div className="search-sec">
          <SearchField
            bg_color="#fff"
            value={filterData.searchTerm}
            placeholder='Search'
            onChange={e => handleFilterChange(e.target.value, 'searchTerm')}
          />
          <Link href='/adminpanel/hyperlocal/master-module/area/area'>
            <PrimaryButton background="#fff" height="35px">Masters</PrimaryButton>
          </Link>

          <CustomSelect
            value={categoryTypeOptions.find(opt => opt.value === filterData.type) || null}
            placeholder="Select Type"
            width={180}
            options={categoryTypeOptions}
            onChange={(selected) => {
              const selectedType = selected?.value || defaultType.value;
              const selectedTypeId = selected?.id || defaultType.id;

              const updatedFilters = {
                ...filterData,
                type: selectedType,
                typeId: selectedTypeId,
              };

              setFilterData(updatedFilters);
              getHyperlocalList(updatedFilters); // ⬅️ Trigger API with new filter
            }}
          />


        </div>

        <div className="filter-section">
          {/* <CustomSelect
            value={filterData.area ? { value: filterData.area, label: filterData.area } : null}
            placeholder="Area"
            width={120}
            options={areaOptions}
            onChange={selected => handleFilterChange(selected, 'area')}
          /> */}

          {/* <CustomSelect
            value={filterData.status ? { value: filterData.status, label: filterData.status } : null}
            placeholder="Status"
            width={120}
            options={[{ value: null, label: 'Status' }, ...statusOptions]}
            onChange={selected => handleFilterChange(selected, 'status')}
          /> */}

          <Reset onClick={handleResetFilters} />

          <div className="action-btn">
            {checkPermission("hyperlocal", perm.add,
              <Link href={`/adminpanel/hyperlocal/${filterData.type}/add-${filterData.type.replace('best-', '')}-hyperlocal`}>
                <PrimaryButton background="#fff" height="35px"><FaPlus /> {`${filterData.type.replace('best-', 'Best ').replace(/^\w/, c => c.toUpperCase())}`}</PrimaryButton>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="resource-body hr-listing-body">
        {hyperlocalData.length > 0 ? (
          <DataTableComponent
            columns={columns}
            data={hyperlocalData}
            pagination
            progressComponent={<TableSkeleton columns={columns} />}
          />
        ) : (
          <DataTableComponent columns={columns} />
        )}
      </div>
    </div>
  );
};

export default HyperlocalList;
