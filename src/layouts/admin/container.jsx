import React, { useEffect } from "react";
// import Navbar from "./Navbar";
import Navbar from "@/layouts/admin/navbar";
// import Sidebar from "./Sidebar";
import Sidebar from "@/layouts/admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserDetails } from "@/store/auth/authActions";

const Container = ({ children }) => {
  
	const dispatch = useDispatch();
  const { user,accessToken } = useSelector((state) => state.auth);

  
   useEffect(() => { 
      if (accessToken) {
        dispatch(verifyUserDetails());
      }
    }, []);

  return (
    <div className="main-container">
      { user && (<><div className="main-header">
        <Navbar  />
      </div>
      <div className="content-cotainer">
        <Sidebar />
        <div className="main-content">
          <main>{children}</main>
        </div>
      </div></>) }

      { !user && (
        <div className="main-content">
          <main>{children}</main>
        </div>
      )}
    </div>
  );
};

export default Container;
