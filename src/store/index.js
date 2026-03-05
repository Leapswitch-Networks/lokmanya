import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import employeeReducer from './emp/empSlice';
import assignReducer from './assign/assignSlice';
import { injectStore } from '../utils/axiosConfig';

const store = configureStore({
	reducer: {
		auth: authReducer,
		employee: employeeReducer,
		assign: assignReducer,
	}
});

injectStore(store);

export default store;
