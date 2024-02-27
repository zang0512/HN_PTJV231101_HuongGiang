import axios from "axios";
import React, { useEffect, useState } from "react";
import { message, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../axios/axios";

export default function Form({ loadData, handleCloseForm }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      dateOfBirth: "",
      address: "",
      status: 1,
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Vui lòng nhập họ và tên")
        .min(3, "Tên cần dài hơn 3 ký tự"),
      email: Yup.string()
        .required("Vui lòng nhập email")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Vui lòng nhập đúng định dạng email"
        ),
      dateOfBirth: Yup.date()
        .required("Vui lòng nhập ngày sinh")
        .max(new Date(), "Ngày sinh không được lớn hơn ngày hiện tại"),
    }),

    // khi submit form
    onSubmit: async (values, onSubmitProps) => {
      // tạo tài khoản mới
      const employee = {
        userName: values.userName,
        address: values.address,
        dateOfBirth: values.dateOfBirth,
        email: values.email,
        status: 1,
      };

      // gọi api thêm mới employee
      await baseUrl
        .post("employee", employee)
        .then((res) => {
          if (res.request.status === 201) {
            notification.success({
              message: "Thành công",
              description: "Thêm mới nhân viên thành công",
            });
          }
        })
        .catch((err) => {
          if (axios.name === "AxiosError") {
            notification.error({
              message: "Lỗi hệ thống",
              description: "Lỗi thêm mới",
            });
          }
        });
      // load lại data
      loadData();
      // reset lại form
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  return (
    <div>
      <div className="overlay">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Thêm mới nhân viên</h4>
            <i className="fa-solid fa-xmark" onClick={handleCloseForm} />
          </div>
          <div className=" justify-content-start align-items-center">
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.userName}
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
