import axiosConfig from '@/utils/axiosConfig';


export const fetchAllBlog = async ({ page = 1, pageSize=15 }) => {
  return axiosConfig.get('api/blog/fetch-all-data', {
    params: {
      page,         // 👈 This must be dynamic
      pageSize,
    },
  });
};

export const FetchBlogInfoBySlug = async (slug) => {
    try {
       return axiosConfig.get(`api/blog/get-blog-info-by-slug/${slug}`);
        // return response?.data?.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            `Error fetching blog by slug: ${error.message} (Status: ${error.response?.status || 'N/A'})`
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