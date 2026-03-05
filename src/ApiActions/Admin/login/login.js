// import axiosConfig from '@/utils/axiosConfig';
import axiosConfig from '@/utils/axiosConfig';


export const logoutUser = async (payload) => {
  try {
    const response = await axiosConfig.post(`api/admin/logout`, payload);
    return response || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Something went wrong");
  }
};
