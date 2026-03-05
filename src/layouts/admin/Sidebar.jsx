import React, { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar as ReactSideBar, Menu, MenuItem } from "react-pro-sidebar";
// import './layout.css'
import "../../assets/css/responsive.css";
import { useRouter } from "next/router";
import { Calendar, DoctorsIcon, Leads } from "../../assets/images/icons";
import HasAccess from "../../components/hasAccess/HasAccess";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { changePassword, logoutUser } from "../../store/auth/authActions";
import { InputField, PrimaryButton } from "../../components";
import { color } from "../../assets/constant";
import { errorToast, promiseToast } from "../../utils/Toast";
import Link from "next/link";
import { logoutUser } from "@/ApiActions/Admin/login/login";

const Sidebar = () => {
  const location = useRouter();
  const adjustedPath = location.pathname.split("/").slice(2);

  const dispatch = useDispatch();
  const router = useRouter();
  const { modules } = useSelector((state) => state.auth);
  // const { modules } = useAuth();
  // console.log(modules, "moduiels");

  const modalHideRef = useRef(null);
  const componentMap = useMemo(
    () => ({
      DoctorsIcon,
      Leads,
      Calendar,
    }),
    []
  );
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  let module_default = useMemo(
    () => ({
      module_slug: "doctors",
      permission: "doctors",
      icon_component: "DoctorsIcon",
      module_name: "Dashboard",
    }),
    []
  );
  const [module_new, setModule_new] = useState([]);

  useEffect(() => {
    const mode_new = [module_default, ...modules].map((data, i) => {
      const SelectedComponent =
        componentMap[data.icon_component] || DoctorsIcon;
      return {
        permissions: data.module_slug,
        to: i ? `/adminpanel/${data.module_slug}` : `/adminpanel/`,
        icon: <SelectedComponent />,
        title: data.module_name,
      };
    });
    setModule_new(mode_new);
  }, [componentMap, module_default, modules]);

  const logoutHandler = async () => {
  Swal.fire({
    text: "Are you sure, you want to log out?",
    showCancelButton: true,
    confirmButtonColor: color.colorPrimary,
    cancelButtonColor: "#fff",
    focusCancel: true,
    fontSize: "20px",
    width: "30em",
    padding: "4em 0 5.25em",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await logoutUser(); // API call
      if (response?.data?.success === 1) {
        window.location.href = "/adminpanel"; // full reload
      } else {
        Swal.fire("Logout failed", "Please try again.", "error");
      }
    }
  });
};



  // Change password
  const initialState = {
    currentPassword: "",
    newPassword: "",
    conPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const dispatch =useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.newPassword !== formData.conPassword) {
        console.error("New password and confirm password do not match");
        errorToast("New password and confirm password do not match");
        return;
      }
      const res = await promiseToast(
        dispatch(changePassword({ formData, modalHideRef }))
      );
      if (!res.error) {
        setFormData(initialState);
      }
    } catch (error) {
      console.error("Error saving user edit:", error);
    }
  };
  useEffect(() => {
    const modalElement = modalHideRef.current;

    const handleModalClose = () => {
      setFormData({
        currentPassword: "",
        newPassword: "",
        conPassword: "",
      });
    };
    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
      }
    };
  }, []);
  return (
    <>
      <div
        className="modal fade change-pasword-modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              hidden
              className="btn-close"
              data-bs-dismiss="modal"
              ref={modalHideRef}
              aria-label="Close"
            ></button>

            <div
              className="modal-body rounded"
              style={{ background: "var(--bg-gray)", padding: "20px" }}
            >
              <h5 className="modal-title text-center mb-3">
                Change Your Password
              </h5>
              <form className="input-fields" onSubmit={handleSubmit}>
                <InputField
                  type="password"
                  id="currentPassword"
                  label={"Current Password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  icon={false}
                  isPass={true}
                  placeholder="Type Current Password"
                  required
                />

                <InputField
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  label={"New Password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  icon={false}
                  isPass={true}
                  placeholder="Type new password"
                  required
                />
                <InputField
                  type="password"
                  id="conPassword"
                  name="conPassword"
                  label={"Confirm Password"}
                  value={formData.conPassword}
                  onChange={handleChange}
                  icon={false}
                  isPass={true}
                  placeholder="Type Confirm password"
                  required
                />

                <PrimaryButton type="submit">submit</PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="sidebar">
            <ReactSideBar backgroundColor="transparent">
              <Menu
                className="sidebar-menu"
                menuItemStyles={{
                  button: ({ level }) => {
                    if (level === 0) {
                      return {
                        "&:hover": {
                          backgroundColor: "#fff !important",
                          color: "#c4122f !important",
                        },
                      };
                    }
                  },
                }}
              >
                {module_new.map(({ permissions, to, icon, title }, index) => {
                  const adjustedNewPath = to.split("/").slice(2).join("/");
                  const isActive = adjustedNewPath === `${adjustedPath[0]}`;
                  return (
                    <HasAccess permissions={permissions} key={index}>
                      <MenuItem
                        component={
                          <Link
                            href={to}
                            className={isActive ? "menu_active" : ""}
                          />
                        }
                        icon={icon}
                      >
                        {" "}
                        {title}{" "}
                      </MenuItem>
                    </HasAccess>
                  );
                })}
              </Menu>
            </ReactSideBar>
          </div>
          <div className="sidebar-footer">
            <button
              className="change-password change-password-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              type="button"
              width="100%"
            >
              Change Password
            </button>
            <PrimaryButton
              type="button"
              width="100%"
              onClick={logoutHandler}
              background={"#fff"}
            >
              LOGOUT
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
