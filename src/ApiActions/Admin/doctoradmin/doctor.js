// import axiosConfig from '@/utils/axiosConfig';
import axiosConfig from '@/utils/axiosConfig';


export const getSingleDoctorById = async (id) => {
    try {
        return axiosConfig.get(`api/admin/doctor/edit/${id}`);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const updateDoctorByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/doctor/updatedoctor/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const saveModifyModule = async (type, module_slug, masterName, id, city) => {
    try {
        let send_data = {};
        if (id) {
            send_data = { type, module_slug, masterName, id, city };
        } else {
            send_data = { type, module_slug, masterName, city };
        }
        const response = await axiosConfig.post('api/doctor/mastermodule/module', send_data);
        return await response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const getmasterList = async (type) => {
    try {
        return await axiosConfig.get(`api/doctor/mastermodule/fetchmaster`, {
            params: { type } // use query param
        });
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};



export const deleteModuleInfo = async (module_type, id) => {
    try {
        const response = await axiosConfig.post('api/doctor/mastermodule/delete-master', { module_type, id });
        return await response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
    }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await axiosConfig.delete(`api/doctor/delete?id=${id}`);
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};
