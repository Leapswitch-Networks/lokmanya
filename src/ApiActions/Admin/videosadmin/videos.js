// import axiosConfig from '@/utils/axiosConfig';
import axiosConfig from '@/utils/axiosConfig';


export const AddVideos = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/add-Videos`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};


export const getvideosAdmin = async (payload) => {
  try {
    const response = await axiosConfig.get(`api/common/get-videos-admin`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const  getvideosByIds = async (id) => {
  
    try {
       return axiosConfig.get(`api/admin/videos/${id}`);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};


export const deleteVideos = async (id) => {
  try {
    const response = await axiosConfig.delete(`api/videos/delete?id=${id}`);
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};



export const getBlogByID = async (id) => {
  
    try {
       return axiosConfig.get(`api/admin/blog/${id}`);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

export const updateBlogByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/blog/updateblog/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

export const updateVideosByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/videos/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error updating video: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};




