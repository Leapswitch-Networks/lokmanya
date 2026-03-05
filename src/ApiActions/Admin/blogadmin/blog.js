// import axiosConfig from '@/utils/axiosConfig';
import axiosConfig from '@/utils/axiosConfig';


export const AddBlog = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/add-blog`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};


export const getDoctorsblog = async (payload) => {
  try {
    const response = await axiosConfig.get(`api/blog/get-blog-doctor`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};

export const getCategoryblog = async (payload) => {
  try {
    const response = await axiosConfig.get(`api/blog/get-blog-category`, payload);
    return response || [];
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


export const getBlogCategoryList = async (type) => {
    try {
        return await axiosConfig.get(`api/blog/mastermodule/getcategory`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

export const addBlogCategory = async (payload) => {
    try {
        return await axiosConfig.post(`api/blog/mastermodule/addcategory`,payload);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

export const getcategoryByID = async (id) => {  
    try {
        return await axiosConfig.get(`api/blog/mastermodule/getblogcategory/${id}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching master list: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

export const updateBlogCategoryByID = async (id, data) => {

    try {
        return axiosConfig.put(`api/admin/blog/updatecategory/${id}`, data);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axiosConfig.delete(`api/blog/delete?id=${id}`);
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};
