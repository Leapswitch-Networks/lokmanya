import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../utils/axiosConfig";

export const getEMP = createAsyncThunk("emp/get", async ({ page, size, filterData }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post(`get-employee?page=${page}&per_page=${size}`, filterData);
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
    }
  }
);

export const saveEmp = createAsyncThunk(
  "emp/save",
  async (
    { name, email, phone },
    { rejectWithValue }
  ) => {
    try {
      let send_data = {};      
        send_data = { name, email, phone};     
      const response = await axiosConfig.post("add-user", send_data);
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
    }
  }
);

export const updateEmp = createAsyncThunk("emp/update", async ({ login_user_id, user_info, achievement, bank, education, govt_docs, mawze, office, project, skill }, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post("update-employee", { login_user_id, user_info, achievement, bank, education, govt_docs, mawze, office, project, skill });
    return await response.data;
  } catch (error) {
    console.log(error, 't update emp');
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
}
);

export const verifyUser = createAsyncThunk(
  "emp/verify",
  async ({ email_verify, token }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post("verify-email", {
        email_verify,
        token,
      });
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
    }
  }
);

export const FetchHRRole = createAsyncThunk("emp/fetch-hr-role", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get("fetch-hr-role");
    return await response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
}
);

export const getEmpInfo = createAsyncThunk("emp/get-employee-info", async ({ id, login_user_id }, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post("get-employee-info", { id, login_user_id });
    return await response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});

export const saveModifyRespInfo = createAsyncThunk("emp/save-modify-res-info", async ({ row_id, user_id, initiative_name, status, start_date, end_date }, { rejectWithValue }) => {
  try {
    let send_data = {};
    if (row_id) {
      send_data = { id: row_id, user_id, initiative_name, status, start_date };
    } else {
      send_data = { user_id, initiative_name, status, start_date };
    }
    if (status === 'past') send_data.end_date = end_date;
    const response = await axiosConfig.post("save-modify-initiative-responsibility", send_data);
    return await response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});

export const saveModifyJamiatInfo = createAsyncThunk("emp/save-modify-jamiat-info", async ({ row_id, user_id, jamiat_name, status, start_date, end_date }, { rejectWithValue }) => {
  try {
    let send_data = {};
    if (row_id) {
      send_data = { id: row_id, user_id, jamiat_name, status, start_date };
    } else {
      send_data = { user_id, jamiat_name, status, start_date };
    }

    if (status ==='past') send_data.end_date = end_date;
    const response = await axiosConfig.post("save-modify-jamiat-info", send_data);
    return await response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});