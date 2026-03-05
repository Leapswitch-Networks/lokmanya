import axiosConfig from '@/utils/axiosConfig';


export const fetchAllArea = async () => {
  return axiosConfig.get('api/common/get-area');
};

export const fetchAllSpecialty = async () => {
  return axiosConfig.get('api/common/get-specialty');
};
export const fetchAllexperience = async () => {
  return axiosConfig.get('api/common/get-experience');
};
export const fetchAlleducations = async () => {
  return axiosConfig.get('api/common/get-educations');
};
export const fetchAllDesignation = async () => {
  return axiosConfig.get('api/common/get-designation');
};
export const fetchAllCity = async () => {
  return axiosConfig.get('api/common/get-city');
};


// services/api.js or similar
export const fetchAllcitywiseArea = async (city) => {
  return axiosConfig.get('api/common/get-area-citywise', {
    params: { city },
  });
};


export const doctorsListFrontend = async (location, specialty,globalSearchVal) => {
  return axiosConfig.get('api/common/doctorsListfrontend', {
    params: {
      location,
      specialty,
      globalSearchVal
    },
  });
};



export const login = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/login`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const storeLeadInfo = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/addLead`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const storeLeadInfoCareer = async (data) => {
  try {
    const response = await axiosConfig.post(`api/common/add-lead-careers`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};




export const addLeadContactus = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/addLeadContactus`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};



export const getDoctorSingleById = async (slug) => {
    try {
       return axiosConfig.get(`api/common/get-doctor-singlebyid/${slug}`);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const getDoctorSingleBySlug = async (slug) => {
    try {
       return axiosConfig.get(`api/common/get-doctor-singlebyslug/${slug}`);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

export const addLeadDoctor = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/add-lead-doctor`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const addLeadDoctorSinglePage = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/add-doctor-lead`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const addBlogLead = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/addBlogLead`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const recaptchverify = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/recaptchverify`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};


export const getLeadListnew = async (filters = {}) => {
  return axiosConfig.get('api/common/leadList', {
    params: {
      ...filters
    },
  });
};

export const getLeadListDropup = async (filters = {}) => {
  return axiosConfig.get('api/common/leadListDroupUp', {
    params: {
      ...filters
    },
  });
};

export const getdoctorlistbackend = async (filters = {}) => {
  return axiosConfig.get('api/common/get-doctor', {
    params: {
      ...filters
    },
  });
};

export const getblogbackend = async (filters = {}) => {
  return axiosConfig.get('api/common/get-blog', {
    params: {
      ...filters,
    },
  });
};

export const getvideosbackend = async (filters = {}) => {
  return axiosConfig.get('api/common/get-blog-admin', {
    params: {
      ...filters,
    },
  });
};

export const getVideosFrontend = async (related_doctor = null) => {
  const params = related_doctor ? { related_doctor } : {};
  return axiosConfig.get('api/common/get-videos', { params });
};



export const exportDatalead = async (filters = {}) => {
  try {
    const response = await axiosConfig.get(`/api/common/export-data-lead`, {
      params: { ...filters },
      responseType: 'blob' // 💥 Important to get CSV blob
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      `Error exporting data: ${error.message} (Status: ${error.response?.status || 'N/A'})`
    );
  }
};



export const createLead = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/common/create-lead`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const updateLead = async (payload) => {
  try {
    const response = await axiosConfig.post('/api/common/update-lead', payload);
    return response?.data || [];
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'Something went wrong'
    );
  }
};

export const updateLeadStatus = async (payload) => {
  try {
    const response = await axiosConfig.post('/api/common/update-lead-status', payload);
    return response?.data || [];
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'Something went wrong'
    );
  }
};

export const addleadkneereplacement = async (payload) => {
  try {
    const response = await axiosConfig.post('/api/common/add-lead-kneereplacement', payload);
    return response?.data || [];
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'Something went wrong'
    );
  }
};

export const getSpecialityDoctors = async (slug) => {
    try {
        if (!slug) throw new Error("Slug is required to fetch doctors");

        const response = await axiosConfig.get(`/api/common/specialityDoctor/${slug}`, {
            validateStatus: (status) => true // accept all statuses (including 404)
        });

        if (response.status === 404) {
            return { data: null, status: 404 }; // return null data to indicate not found
        }

        return response; // full response
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            `Error fetching doctors list: ${error.message} (Status: ${error?.response?.status || 'N/A'})`
        );
    }
};





// export const StoreBlogInfo = async (payload) => {
//     try {
//         const response = await axiosConfig.post(`/blog/store`, payload);
//         return response?.data?.data || [];
//     } catch (error) {
//         throw new Error(
//             error.response?.data?.message ||
//             `Error fetching Product Category: ${error.message} (Status: ${error.response?.status || 'N/A'})`
//         );
//     }
// }

// export const FetchBlogInfo = async (blog_id) => {
//     try {
//         const response = await axiosConfig.get(`/blog/get-blog-info/${blog_id}`);
//         return response?.data?.data || [];
//     } catch (error) {
//         throw new Error(
//             error.response?.data?.message ||
//             `Error fetching Product Category: ${error.message} (Status: ${error.response?.status || 'N/A'})`
//         );
//     }
// }

// export const ModifyBlogInfo = async (payload) => {
//     try {        
//         const response = await axiosConfig.put(`/blog/modify/${payload?.blog_id}`, payload?.formVal);
//         return response?.data?.data || [];
//     } catch (error) {
//         throw new Error(
//             error.response?.data?.message ||
//             `Error fetching Product Category: ${error.message} (Status: ${error.response?.status || 'N/A'})`
//         );
//     }
// }

// export const DelBlogInfo = async (payload) => {
//     try {
//         const query = encodeURIComponent(JSON.stringify(payload));
//         const response = await axiosConfig.get(`/blog/fetch-all-data?queryParam=${query}`);
//         return response?.data?.data || [];
//     } catch (error) {
//         throw new Error(
//             error.response?.data?.message ||
//             `Error fetching Product Category: ${error.message} (Status: ${error.response?.status || 'N/A'})`
//         );
//     }
// }

// export const FetchBlogInfoBySlug = async (blog_id) => {
//     try {
//         const response = await axiosConfig.get(`/blog/get-blog-info-by-slug/${blog_id}`);
//         console.log('response- ', response);
        
//         return response?.data?.data || [];
//     } catch (error) {
//         throw new Error(
//             error.response?.data?.message ||
//             `Error fetching Product Category: ${error.message} (Status: ${error.response?.status || 'N/A'})`
//         );
//     }
// }