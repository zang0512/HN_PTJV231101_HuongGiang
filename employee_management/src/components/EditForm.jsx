import axios from "axios";
import React, { useEffect, useState } from "react";
import { message, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../axios/axios";

export default function EditForm({ handleCloseEditForm, employeeId }) {
  const [employeeData, setEmployeeData] = useState([]);
  const loadEmployee = () => {
    const editedEmployee = baseUrl
      .get(`employee/${employeeId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // khai báo data của bản ghi cần sửa
    setEmployeeData(editedEmployee);
  };
  // load dữ liệu employee theo id
  useEffect(() => {
    loadEmployee();
  }, []);
  // set dữ liệu từ user vào ô input tương ứng
  useEffect(() => {
    formik.setValues({
      userName: employeeData?.userName || "",
      email: employeeData?.email || "",
      dateOfBirth: employeeData?.dateOfBirth || "",
      address: employeeData?.address || "",
    });
  }, [employeeData]);

  // set giá trị khởi tạo cho các ô input
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      dateOfBirth: "",
      address: "",
    },

    // hàm submit form
  });
  console.log(employeeData);
  return (
    <div>
      <div className="overlay">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Thêm mới nhân viên</h4>
            <i className="fa-solid fa-xmark" onClick={handleCloseEditForm} />
          </div>
          <div className=" justify-content-start align-items-center">
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              onChange={formik.handleChange}
              defaultValue={formik.values.userName}
              id="userName"
              type="text"
              className="form-control"
            />
            {formik.errors.name && (
              <p className="error"> {formik.errors.name} </p>
            )}
          </div>
          <div className=" justify-content-start align-items-center">
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.dateOfBirth}
              id="dateOfBirth"
              type="date"
              className="form-control"
            />
            {formik.errors.dateOfBirth && (
              <p className="error"> {formik.errors.dateOfBirth} </p>
            )}
          </div>

          <div className=" justify-content-start align-items-center">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              id="email"
              type="email"
              className="form-control"
            />
            {formik.errors.email && (
              <p className="error"> {formik.errors.email} </p>
            )}
          </div>

          <div className=" justify-content-start align-items-center">
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <textarea
              onChange={formik.handleChange}
              value={formik.values.address}
              id="address"
              rows={3}
              className="form-control"
            />
          </div>
          <div>
            <button type="submit" className="w-100 btn btn-primary">
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
