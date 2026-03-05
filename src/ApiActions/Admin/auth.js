export const verify = async (slug) => {
    try {
       return axiosConfig.get(`api/verify/user/`);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
        );
    }
};