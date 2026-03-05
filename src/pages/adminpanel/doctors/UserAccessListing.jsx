import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { perm } from '../../../assets/constant';
import { EditIcon } from '../../../assets/images/icons';
import { AccessType, CustomSelect, DataTableComponent, PrimaryButton, Reset } from '../../../components';
import Button from '../../../components/controls/Button';
import GoBack from '../../../components/controls/GoBack';
import TableSkeleton from '../../../components/loader/tableSkeleton';
import { useAccessControl } from '../../../hooks/useAccessControl';
import { getAssign } from '../../../store/assign/assignAction';
import { setCurrentOption } from '../../../store/assign/assignSlice';
import Link from 'next/link';

const UserAccessListing = () => {
  const { assignedUserList, loading, currentOption } = useSelector(state => state.assign)
  const { modules } = useSelector(state => state.auth);
  const [userList, setUserList] = useState(assignedUserList)

  const { checkRoleAccess } = useAccessControl()
  const dispatch = useDispatch()
  const [options, setOptions] = useState([])
  useEffect(() => {
    if (checkRoleAccess(["super_admin", "admin"], [])) dispatch(getAssign());
    setOptions(modules.map(e => ({ value: e.module_id, label: e.module_name })))
  }, [])

  useEffect(() => {
    setUserList(assignedUserList)
  }, [assignedUserList])

  const handleFilterChange = useCallback(e => {
    if (!e) return;
    dispatch(setCurrentOption(e))
    // userList.filter(a => console.log(a, 'a'))

    setUserList(assignedUserList.filter(a => a.modules.some(b => parseInt(b.module_assign_id) === e.value)))
    // setModules()
  }, [setCurrentOption, dispatch, assignedUserList])

  const handleReset = useCallback(() => {
    dispatch(setCurrentOption(null))
  }, [setCurrentOption, dispatch])
  let permissionTypes = useMemo(() => Object.values({ admin: 'admin', ...perm }), [])
  const filteredCol = useMemo(() => [
    {
      name: 'Full Name',
      cell: row => row.user?.name,
      width: "auto",
      className: 'ellipsis',
      style: {
        maxWidth: "35%",
        justifyContent: 'flex-start',
        fontWeight: 'bold'
      }
    },
    ...permissionTypes.map(perms => {
      return {
        name: perms,
        cell: row => {
          let checked = false
          let item = row.modules.find(item => parseInt(item.module_assign_id) === parseInt(currentOption.value))
          if (perms === "admin") {
            if (item?.role === "admin") checked = true
          } else {
            if (item?.permission?.includes(perms)) checked = true
          }
          return (
            <input
              type="checkbox"
              style={{ pointerEvents: 'none' }}
              label={perms}
              onChange={() => { }}
              checked={checked}
            />
          )
        },

        width: "10%",
        // style: {  justifyContent: 'start' }
      }
    }),
    // ...modules.map((mod => {
    //   return {
    //     name: mod.module_name,
    //     cell: row => {
    //       let match = row.modules?.find(m => m.module_assign_id === mod.module_id)

    //       return match ? <AccessType type={match?.role} /> : <span>-</span>
    //     },
    //     width: "8%",
    //     style: {
    //       justifyContent: 'center',
    //     }
    //   }
    // }))
    {
      name: '',
      cell: row => <Link href={'/adminpanel/edit-access-user/' + row.user_id}> <Button aria-label="edit" className='action-icon'> <EditIcon height={15} width={15} /></Button></Link>,
      width: "4%",
      style: {
        justifyContent: 'flex-end'
      }
    }
  ], [currentOption, handleFilterChange])


  // All module section
  const moduleCol = useMemo(() => [
    {
      name: 'Full Name',
      cell: row => row.user?.name,
      width: "auto",
      style: {
        justifyContent: 'flex-start',
        fontWeight: 'bold'
      }
    },
    ...modules.map((mod => {
      return {
        name: mod.module_name,
        cell: row => {
          let match = row.modules?.find(m => m.module_assign_id === mod.module_id)

          return match ? <AccessType type={match?.role} /> : <span>-</span>
        },
        width: "8%",
        style: {
          justifyContent: 'center',
        }
      }
    }))
    , {
      name: '',
      cell: row => <Link href={'/adminpanel/edit-access-user/' + row.user_id}> <Button aria-label="edit" className='action-icon'> <EditIcon height={15} width={15} /></Button></Link>,
      width: "4%",
      style: {
        justifyContent: 'flex-end'
      }
    }
  ], [handleFilterChange, currentOption])

  return (
    <div className="container-listing">
      <div className="">
        <div className='resource-header'>
          <div className="modulename d-flex gap-2 align-items-center">
            <GoBack />
            <span className='main-heading'>Access Panel</span>
          </div>
          <div className="filter-section">
            <CustomSelect
              className='user-access-dropdown'
              DropdownIndicator={() => <svg xmlns="http://www.w3.org/2000/svg" height="20" width="13" viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" /></svg>}
              width={"auto"}
              control={{ padding: "0 10px" }}
              onChange={handleFilterChange}
              placeholder="All Modules"
              options={options}
              value={currentOption}
            />
            <Reset onClick={handleReset} />
            {checkRoleAccess(['super_admin', 'admin'], []) && <div className="action-btn"> <NavLink to='/adminpanel/add-access-user'>  <PrimaryButton textTransform={'capitalize'} background={'#fff'} height={'35px'} >Add +</PrimaryButton></NavLink></div>}
          </div>
        </div>
      </div>
      <div className='resource-body'>
        <div className="resource-body user-access-listing user-access-listing-resp">
          <DataTableComponent
            columns={currentOption ? filteredCol : moduleCol}
            pagination
            progressPending={loading}
            progressComponent={<TableSkeleton columns={moduleCol} />}
            data={userList}
          />
        </div>
      </div>
    </div>
  )
}

export default UserAccessListing