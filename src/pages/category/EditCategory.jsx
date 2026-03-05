'use client'; // Only for app directory. Remove if you're using pages directory.

import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import axiosConfig from "../../utils/axiosConfig";
import { CustomInput } from "../../components";
import { errorToast, successToast } from "../../utils/Toast";
import { customStyles } from "../../components/controls/StatusStyle";

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  const initialState = {
    categoryName: "",
    status: "published",
    parent: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const fetchData = useCallback(async () => {
    if (!id) return; // Wait for id from router.query
    try {
      const categoryResponse = await axiosConfig.get(`/get-category/${id}`);
      const categoryData = categoryResponse.data;

      const departmentResponse = await axiosConfig.get("/categoryList");
      const departments = departmentResponse.data
        .filter((dept) => dept.id !== parseInt(id))
        .map((dept) => ({
          value: dept.id,
          label: dept.categoryName,
        }));

      setDepartmentOptions(departments);
      setFormData({
        categoryName: categoryData.categoryName,
        status: categoryData.status || "published",
        parent: categoryData.parent || null,
      });
    } catch (error) {
      console.error("Error fetching category or departments:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleParentChange = (selectedOption) => {
    setFormData({ ...formData, parent: selectedOption ? selectedOption.value : null });
  };

  const handleDropdownChange = (selectedOption) => {
    setFormData({ ...formData, status: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryName: formData.categoryName,
      parent: formData.parent,
      status: formData.status,
    };

    try {
      const response = await axiosConfig.put(`/updateCategory/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        successToast("Category updated successfully");
        router.push("/adminpanel/blog/master-module/category");
      }
    } catch (error) {
      errorToast("There was an error updating the category");
      console.error("Error updating the category:", error);
    }
  };

  const statusOptions = [
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <div className="full-container">
      <div className="section-header">
        <button onClick={() => router.back()} className="btn-back">Go Back</button>
        <span className="main-heading heading-both">Edit Category</span>
      </div>
      <div className="section-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <CustomInput
                    label={"Category Name"}
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    placeholder="Enter Category Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <div className="input-outer">
                    <label htmlFor="parent">Parent Category</label>
                    <Select
                      name="parent"
                      value={departmentOptions.find(opt => opt.value === formData.parent)}
                      onChange={handleParentChange}
                      options={departmentOptions}
                      className="basic-single-select"
                      classNamePrefix="select"
                      placeholder="Select Parent Category"
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="status-sec">
                <div className="input-outer">
                  <label htmlFor="status" style={{ marginLeft: "0px" }}>
                    Status
                  </label>
                  <div className="profile-submit-section" style={{ display: "flex" }}>
                    <Select
                      name="status"
                      value={statusOptions.find(opt => opt.value === formData.status)}
                      onChange={handleDropdownChange}
                      options={statusOptions}
                      className="basic-select form_status"
                      classNamePrefix="select"
                      styles={customStyles}
                    />
                    <button type="submit" className="btn-submit">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
