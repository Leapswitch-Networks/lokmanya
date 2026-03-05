import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPanel from "./AdminPanel";
import Login from "../login/Login";
import { verifyUserDetails } from "@/store/auth/authActions";
// import { checkAccess } from "@/app/middleware";

const AdminPage = () => {
  
	const dispatch = useDispatch();

  const { user, accessToken } = useSelector((state) => state.auth);
  // console.log("accessToken",accessToken);
  
  useEffect(() => { 
		if (accessToken) {
			dispatch(verifyUserDetails());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);
  // useEffect(() => {
  //   const isAuth = checkAccess();

  //   if (user && isAuth) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [user]);

  return <>{isAuthenticated ? <AdminPanel /> : <Login />}</>;
};

export default AdminPage;


// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import AdminPanel from "./AdminPanel";
// import Login from "../login/Login";
// 
// const AdminPage = () => {
  // const { user } = useSelector((state) => state.auth);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [user]);

  // Directly render AdminPanel for now
//   return <AdminPanel />;
// };

// export default AdminPage;


// export async function getServerSideProps(context) {
//   // const { blog_slug } = context.params;
//   // try {
//   //   const baseUrl = process.env.NEXT_PUBLIC_FILE_BASE_URL;
//   //   const response = await axios.get(`${baseUrl}/api/blog/get-blog-info-by-slug/${blog_slug}`);

//   //   return {
//   //     props: {
//   //       blogData: response.data,
//   //       baseUrl
//   //     }
//   //   };
//   // } catch (error) {
//   //   return {
//   //     notFound: true
//   //   };
//   // }
// }
