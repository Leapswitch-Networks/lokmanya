import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { perm } from '../../assets/constant';
import { EditIcon } from '../../assets/images/icons';
import { DataTableComponent, PrimaryButton, SearchField } from '../../components';
import TableSkeleton from '../../components/loader/tableSkeleton';
import { useAccessControl } from '../../hooks/useAccessControl';
import { categoryList } from '../../store/category/categoryAction';
import Link from 'next/link';


const CategoryList = () => {
  const { checkPermission } = useAccessControl()
  const [doctorData, setDoctorData] = useState([]);

  const initialFilterState = {
    specialty: null,
    status: null,
    searchTerm: '',
  }
  const [filterData, setFilterData] = useState(initialFilterState);
  const dispatch = useDispatch();
  const getDoctorsList = async (filters) => {
    const res = await dispatch(categoryList(filters));
    setDoctorData(res.payload);
  };

  useEffect(() => {
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

  const columns = [
    {
      key: "id",
      name: 'ID',
      cell: row => `${String(row.id)}`,
    },
    {
      key: "categoryName",
      name: 'Category Name',
      cell: row => row.categoryName ? <span >{row.categoryName}</span> : '-',
    },
    {
      key: "action",
      name: 'Action',
      cell: row => {
        return (
          <>

            {checkPermission("blog", perm.edit, <Link href={`/adminpanel/blog/master-module/category/edit/${row.id}`} className='action-icon' aria-label="edit" ><EditIcon height={15} width={15} /></Link>)}
          </>
        )
      },
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


        </div>

        <div className="filter-section">
          <div className="action-btn">
            {checkPermission("doctors", perm.add,

              <Link href='/adminpanel/blog/master-module/category/add'>
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
    </div>
  );
};

export default CategoryList;
