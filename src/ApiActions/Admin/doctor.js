// import axiosConfig from '@/utils/axiosConfig';
import axiosConfig from '@/utils/axiosConfig';


export const addDoctor = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/add-doctor`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};
