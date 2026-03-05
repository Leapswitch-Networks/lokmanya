import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadingStyle = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

const successStyle = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}


const errorStyle = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

const Err = ({ res }) => {
  return (
    <>
      {res?.data?.error?.map((items, index) => {
        return (
          <p className="mb-0" key={index}>{items.msg}</p>
        )
      })
      }
    </>
  );
}

export const successToast = (message) => toast.success(message, successStyle);

export const errorToast = (message) => toast.error(message, errorStyle);

export const promiseToast = async (func, loading, success, error) => {
  try {
    let res = await toast.promise(
      typeof func.unwrap === 'function' ? func.unwrap : func,
      {
        pending: {
          render() {
            return loading || 'Hold on...';
          },
          ...loadingStyle
        },
        success: {
          render({ data }) {
            if (success === 'function') return success();
            return success || data?.message || 'success';
          },
          ...successStyle
        },
        error: {
          render(res) {
            console.log(res, 'at promnise error');
            if (Array.isArray(res?.data?.error)) return <Err res={res} />;
            return error || res?.data?.message || 'something went wrong';
          },
          ...errorStyle
        }
      }
    );
    return res;
  } catch (error) { return error }
};
