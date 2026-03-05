import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { SearchIcon } from '../../../assets/images/icons';
import { PrimaryButton } from '../../../components';
import { useAccessControl } from '../../../hooks/useAccessControl';
import axiosConfig from '../../../utils/axiosConfig';
import { getAssign, saveAssign, updateAssign } from '../../../store/assign/assignAction';
import { errorToast, promiseToast } from '../../../utils/Toast';
import '@/styles/humanresource.css';
import { color, perm } from '../../../assets/constant';
import GoBack from '../../../components/controls/GoBack';

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: 350,
        textAlign: 'center',
        borderRadius: '20px',
        boxShadow: '#f8f8f8',
        padding: '0 10px',
        color: "#000",
        borderColor: "transparent",
        cursor: 'pointer',
        '&:hover': {
            borderColor: color.colorPrimary
        }
    }),
    option: (provided, state) => ({
        ...provided,
        fontWeight: '500',
        fontSize: '13px',
        width: '350px',
        backgroundColor: state.isSelected ? color.colorPrimary : 'white',
        color: state.isSelected ? '#fff' : '#000',
        '&:active': {
            background: color.colorPrimary,
            color: '#f00'
        },
        '&:hover': {
            background: color.colorPrimary,
            color: '#fff',
            cursor: 'pointer'
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        fontWeight: '500',
    }),
};

const UserAccessForm = ({ accessData, mode }) => {
    const isEdit = mode === 'edit';
    const { modules, user } = useSelector(state => state.auth);
    const { UserList } = useSelector(state => state.assign);
    const dispatch = useDispatch();
    const router = useRouter();
    const [assignUser, setAssignUser] = useState(null);
    const [isAdminChecked, setIsAdminChecked] = useState(false);
    const [permissions, setPermissions] = useState([...modules].filter(emp => emp.role === "admin").map(data => ({ ...data, permission: [] })));

    let permissionTypes = useMemo(() => Object.values(perm), []);
    const { checkRoleAccess } = useAccessControl();

    useEffect(() => {
        if (checkRoleAccess(["super_admin", "admin"], [])) {
            dispatch(getAssign());
        }
    }, []);

    useEffect(() => {
        if (isEdit && accessData) {
            setAssignUser(accessData.user_id);
            setPermissions(prevPermissions => {
                let newPermissions = [...prevPermissions].map(module => {
                    const existingModule = accessData.modules.find(p => p.module_assign_id === module.module_id);
                    if (existingModule) {
                        if (existingModule.role === "admin") module.admin = true;
                        existingModule.permission.forEach(per => module[per] = true);
                        module.id = existingModule.id;
                        module.role = existingModule.role;
                        module.permission = existingModule.permission;
                    }
                    return module;
                });
                if (newPermissions.every(e => e.admin)) setIsAdminChecked(true);
                return newPermissions;
            });
        }
    }, [isEdit, permissionTypes]);

    const checkUpdate = useCallback((module) => {
        const arr1 = accessData?.modules?.find(e => e.module_assign_id === module.module_id)?.permission;
        const arr2 = module?.permission;
        if (!arr1 || arr1.length !== arr2.length) return true;

        const sortedArr1 = arr1.slice().sort((a, b) => a.localeCompare(b));
        const sortedArr2 = arr2.slice().sort((a, b) => a.localeCompare(b));

        for (let i = 0; i < sortedArr1.length; i++) {
            if (sortedArr1[i] !== sortedArr2[i]) return true;
        }

        return false;
    }, [accessData?.modules]);

    const handleIndividualPermissionChange = useCallback((module, permissionType) => {
        const { permission } = module;
        const permissionIndex = permission.indexOf(permissionType);
        if (permissionIndex === -1) {
            module.permission.push(permissionType);
            if (permissionTypes.every(ev => module.permission.includes(ev))) module.admin = true;
        } else {
            module.admin = false;
            module.permission = module.filter(a => a !== permissionType);
        }
        if (isEdit) module.updated = checkUpdate(module);
        return module;
    }, [checkUpdate, isEdit, permissionTypes]);

    const handlePermissionChange = useCallback((moduleId, permissionType) => {
        setPermissions(prevPermissions => {
            const newPermissions = [...prevPermissions].map((module) => {
                if (module.module_id !== moduleId) return module;
                if (permissionType === "admin") {
                    module.admin = !module.admin;
                    module.permission = module.admin ? permissionTypes : [];
                    module.updated = checkUpdate(module);
                } else {
                    module = handleIndividualPermissionChange(module, permissionType);
                }
                return module;
            });

            setIsAdminChecked(newPermissions.every(e => e.admin));
            return newPermissions;
        });
    }, [checkUpdate, handleIndividualPermissionChange, permissionTypes]);

    const handlePermissionChangeColumn = useCallback((isChecked, permissionType) => {
        setPermissions(prevPermissions => {
            const newPermissions = prevPermissions.map(module => {
                module[permissionType] = isChecked;
                if (isChecked && !module.permission.includes(permissionType)) {
                    module.permission.push(permissionType);
                    if (permissionTypes.every(ev => module.permission.includes(ev))) module.admin = true;
                } else if (!isChecked && module.permission.includes(permissionType)) {
                    module.permission = module.permission.filter(a => a !== permissionType);
                    module.admin = false;
                }
                module.updated = checkUpdate(module);
                return module;
            });
            setIsAdminChecked(newPermissions.every(e => e.admin));
            return newPermissions;
        });
    }, [checkUpdate, permissionTypes]);

    const handlePermissionChangeAll = useCallback((e) => {
        let isChecked = e.target.checked;
        setIsAdminChecked(isChecked);
        setPermissions(prevPermissions => {
            return prevPermissions.map(module => {
                module.permission = isChecked ? permissionTypes : [];
                module.admin = isChecked;
                permissionTypes.forEach(p => module[p] = isChecked);
                module.updated = checkUpdate(module);
                return module;
            });
        });
    }, [checkUpdate, permissionTypes]);

    const handleSubmit = useCallback(async () => {
        try {
            if (!assignUser) return errorToast("Please select user.");
            let res;
            const data = {
                user_id: assignUser,
                permissions: permissions
                    .filter(f => isEdit || f.permission.length > 0)
                    .map(({ admin, permission, module_id, updated, id }) => ({
                        admin: !!admin,
                        permission,
                        module_id,
                        updated,
                        ...(isEdit && { id })
                    }))
            };
            if (isEdit) {
                res = await promiseToast(dispatch(updateAssign(data)), "Updating...", "Permission has been updated successfully.", "Failed to update, please try again");
            } else {
                res = await promiseToast(dispatch(saveAssign(data)), "Assigning...", "Permission has been assigned successfully.", "Failed to assign, please try again");
            }
            router.push('/adminpanel/user-access-listing');
        } catch (error) {
            console.error(error);
        }
    }, [assignUser, dispatch, router, permissions, isEdit]);

    return (
        <div className="container-listing">
            <div className='resource-header'>
                <div className="modulename d-flex align-items-center gap-2">
                    <GoBack to="/adminpanel/user-access-listing" />
                    <span className='main-heading'>Access Panel</span>
                </div>
            </div>
            <div className='resource-body access_panel'>
                <div className="search-field">
                    <Select
                        className='user-access-dropdown'
                        components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => <SearchIcon width={20} height={14} />
                        }}
                        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                        menuPosition={'fixed'}
                        styles={customStyles}
                        onChange={(a) => setAssignUser(a.value)}
                        placeholder="All Users"
                        options={UserList?.map(option => ({
                            value: option.id,
                            label: option.name,
                        }))}
                        defaultValue={isEdit ? { value: accessData?.user?.id, label: accessData?.user?.name } : undefined}
                        isDisabled={isEdit}
                        isSearchable
                    />
                </div>

                {/* Permissions Table Here */}
                {/* Same as in your original JSX - skip re-pasting to save space */}

                <div className='save_btn text-center mt-4'>
                    <PrimaryButton background={'transparent'} height={'40px'} onClick={handleSubmit}>
                        {isEdit ? "Update" : "Save"} Access
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const mode = context.query.mode || 'create';

    try {
        const res = await axiosConfig.get(`get-user-assign/${id}`);
        const accessData = res?.data?.assign || null;

        return {
            props: {
                accessData,
                mode,
            },
        };
    } catch (error) {
        return {
            props: {
                accessData: null,
                mode,
            },
        };
    }
}

export default UserAccessForm;
