import axiosConfig from '@/utils/axiosConfig';

export const AddHyperlocalArea = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/hyperlocal/mastermodule/area/add-hyperlocal-area`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const fetchAllHyperlocalCity = async () => {
   try {
    const response = await axiosConfig.get('api/admin/hyperlocal/mastermodule/area/get-hyperlocal-area');
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};



export const getHyperlocalAreaByID = async (id) => {  
    try {
        return await axiosConfig.get(`api/admin/hyperlocal/mastermodule/area/gethyperlocalarea/${id}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const updateHyperlocalAreaByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/hyperlocal/mastermodule/area/updateHyperlocal/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const AddHyperlocalCategory = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/hyperlocal/mastermodule/category/add-hyperlocal-category`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};


export const getHyperlocalcategoryList = async () => {
   try {
    const response = await axiosConfig.get('api/admin/hyperlocal/mastermodule/category/get-hyperlocal-category');
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

// ✅ Accept `filters` and pass as query parameters
export const getHyperlocalListAll = async (filters = {}) => {
  try {
    const response = await axiosConfig.get('api/admin/hyperlocal/get-hyperlocal-list', {
      params: filters, // ✅ attaches filters as query params
    });
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};


//BEST Hospital

export const addHyperlocalNearMe = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/hyperlocal/bestHospital/add-hyperlocal-besthospital`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};


export const getBestHospitalHyperlocalSingle = async (id) => {  
    try {
        return await axiosConfig.get(`api/admin/hyperlocal/bestHospital/getSingle/${id}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const updateBestHospitalHyperlocalByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/hyperlocal/bestHospital/updateSingle/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

//BEST Treatment
export const addBestTreatmentHyperlocal = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/hyperlocal/bestTreatment/add-hyperlocal-besttreatment`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};



export const getBestTreatmentHyperlocalSingle = async (id) => {  
    try {
        return await axiosConfig.get(`api/admin/hyperlocal/bestTreatment/getSingle/${id}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};



export const updateBestTreatmentHyperlocalByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/hyperlocal/bestTreatment/updateSingle/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};



//BEST DOCTORS
export const addBestDoctorHyperlocal = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/hyperlocal/bestDoctor/add-hyperlocal-bestdoctor`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};



export const getBestDoctorHyperlocalSingle = async (id) => {  
    try {
        return await axiosConfig.get(`api/admin/hyperlocal/bestDoctor/getSingle/${id}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};



export const updateBestDoctorHyperlocalByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/hyperlocal/bestDoctor/updateSingle/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


// FONTEND APIS

export const getBestHospitalHyperlocalSingleFrontend = async (slug) => {  
    try {
        return await axiosConfig.get(`api/hyperlocal/best-hospital/${slug}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const getBestTreatmentHyperlocalSingleFrontend = async (slug) => {  
    try {
        return await axiosConfig.get(`api/hyperlocal/best-treatment/${slug}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const getBestDoctorsHyperlocalSingleFrontend = async (slug) => {  
    try {
        return await axiosConfig.get(`api/hyperlocal/best-doctors/${slug}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

