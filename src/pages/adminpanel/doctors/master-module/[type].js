import React, { useCallback, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import { CustomInput, DataTableComponent, PrimaryButton } from '@/components';
import { EditIcon } from '@/assets/images/icons';
import { useDispatch } from 'react-redux';
// import { getModuleInfo } from '@/store/master_module/master_module_action';
import GoBack from '@/components/controls/GoBack';
// import axiosConfig from '@/utils/axiosConfig';
// import { promiseToast } from '@/utils/Toast';
import DeleteIcon from '@/assets/images/icons/DeleteIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import "@/styles/mastermodule.css";
import MasterModuleLayout from '@/components/pages/adminpanel/MasterModuleLayout';
import { deleteModuleInfo, getmasterList, saveModifyModule } from '@/ApiActions/Admin/doctoradmin/doctor';
import { fetchAllCity } from '@/ApiActions/CommonApi';


const ModuleListing = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { type } = router.query;

    const ref = useRef(null);
    const [data, setData] = useState([]);
    const [moduleInfo, setModuleInfo] = useState({ id: '', masterName: '', city: '' });
    const [cities, setCities] = useState([]);
    const page_title = type ? type.replace("-", " ") : "";

    const columns = [
        {
            key: "masterName",
            name: 'masterName',
            cell: row => row.masterName,
            width: "50%"
        },
        {
            key: "action",
            name: 'Action',
            cell: row => {
                return (
                    <>
                        <Link href="/" className='action-icon' onClick={() => setModuleInfo({ id: row.id, masterName: row.masterName, city: (row.city) ? row.city : '' })} data-bs-toggle="modal" data-bs-target="#popup" ><EditIcon height={15} width={15} /></Link>
                        <Link href="javascript:void(0)" className='action-icon' onClick={() => { if (window.confirm('Delete the item?')) { deleteData(row.id) } }} ><DeleteIcon height={15} width={15} /></Link>
                    </>
                )
            },
            width: "20%",
            style: { paddingRight: 0, justifyContent: 'flex-end' },
        },
    ];

    const deleteData = async (id) => {
        const res = await deleteModuleInfo({ module_type: type, id });
        if (!res.error) fetchData();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { id, masterName, city } = moduleInfo;
        const res = await saveModifyModule({ type: type, masterName, id, city });
        if (!res.error) fetchData();
        ref.current.click();
    };

    const fetchData = useCallback(async () => {
        const return_data = await getmasterList(type); // pass type as string
        const active_data = return_data?.data; // fix response
        setData(active_data);
    }, [type]);


    const fetchCities = async () => {
        try {
            const response = await fetchAllCity()
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    useEffect(() => {
        fetchData();
        if (type === 'area') {
            fetchCities();
        }
    }, [fetchData, type]);

    const menu = ['speciality', 'area', 'experience', 'city'];
    return (
        <MasterModuleLayout menu={menu} basePath="/adminpanel/doctors/master-module">
            <div className="container-listing">
                <div className="">
                    <div className='resource-header'>
                        <div className="modulename d-flex gap-3">
                            <GoBack to={'/adminpanel/doctors'} />
                            <span className='main-heading text-capitalize'>{page_title}</span>
                        </div>
                        <div className="filter-section">
                            <PrimaryButton onClick={() => setModuleInfo({ id: '', masterName: '', city: '' })} data-bs-toggle="modal" data-bs-target="#popup" textTransform={'capitalize'} background={'#fff'} height={'35px'}>Add +</PrimaryButton>
                        </div>
                    </div>
                </div>
                <div className='resource-body'>
                    <div className="resource-body">
                        {data.length > 0 ? (
                            <DataTableComponent
                                columns={columns}
                                pagination
                                style={{ overflowX: 'auto' }}
                                data={data}
                            />
                        ) : (
                            <div className="no-data-found" style={{ textAlign: 'center' }}>
                                <p>No data found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="modal fade human-resources-modal" id="popup" tabIndex="-1" aria-labelledby="csvLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-capitalize">{page_title}</h5>
                            <button type="button" ref={ref} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <CustomInput
                                            type="text"
                                            value={moduleInfo.masterName}
                                            borderColor={'var(--color-primary)'}
                                            label="Title"
                                            onChange={(e) => setModuleInfo({ ...moduleInfo, masterName: e.target.value })}
                                        />
                                    </div>
                                    {type === 'area' && (
                                        <div className='col-md-12 mt-3'>
                                            <label htmlFor="city-select">City</label>
                                            <select
                                                id="city-select"
                                                className="form-select"
                                                value={moduleInfo.city}
                                                onChange={(e) => setModuleInfo({ ...moduleInfo, city: e.target.value })}
                                            >
                                                <option value="">Select a city</option>
                                                {cities.map((city) => (
                                                    <option key={city.id} value={city.masterName}>{city.masterName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <div className='col-md-12 text-end mt-3'>
                                        <PrimaryButton type="submit">
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterModuleLayout>
    )
}

export default ModuleListing;
