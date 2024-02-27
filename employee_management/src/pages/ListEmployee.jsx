import React, { useEffect, useState } from "react";
import axios from "axios";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Modal, Segmented } from "antd";
import Form from "../components/Form";
import ModalDelete from "../components/ModalDelete";
import ModalBlock from "../components/ModalBlock";
import baseUrl from "../axios/axios";
import EditForm from "../components/EditForm";

export default function ListEmployee() {
  const [employee, setEmployee] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalBlock, setShowModalBlock] = useState(false);
  const [idBlock, setIdBlock] = useState(null);
  const [typeModal, setTypeModal] = useState("");
  const [idDelete, setIdDelete] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  // tạo hàm load data
  const loadData = async () => {
    // call api
    await baseUrl
      .get("employee")
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);
  // tạo hàm mở form
  const handleOpenForm = () => {
    setShowForm(true);
  };
  // tạo hàm đóng form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // hàm xử lý mở modal
  //modal block
  const handleOpenBlock = async (id) => {
    setShowModalBlock(true);
    setIdBlock(id);
    // Gọi API lấy thoonng tin một bản ghi theo id
    const findEmployee = await baseUrl.get(`employee/${id}`);
    if (findEmployee?.data.status === 1) {
      setTypeModal("chặn");
    } else {
      setTypeModal("bỏ chặn");
    }
  };
  // modal delete
  const handleOpenDelete = (id) => {
    setIdDelete(id);
    setShowModalDelete(true);
  };
  // hàm xử lý đóng modal
  // modal block
  const handleCloseBlock = () => {
    setShowModalBlock(false);
  };
  // modal delete
  const handleCloseDelete = () => {
    setShowModalDelete(false);
  };

  // Hàm xử lý chặn/bỏ chặn nhân viên
  const handleToggle = async () => {
    // Gọi API  cập nhật trạng thái nhân viên
    await baseUrl
      .patch(`employee/${idBlock}`, {
        status: typeModal === "chặn" ? 0 : 1,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // gọi hàm render lại giao diện
    loadData();
    // đóng modal block
    handleCloseBlock();
  };

  //hàm xử lý xóa nhân viên
  const handleDelete = async (id) => {
    // gọi api xóa 1 bản ghi theo id
    await baseUrl.delete(`employee/${idDelete}`);
    // gọi hàm render lại giao diện
    loadData();
    // đóng modal delete
    handleCloseDelete();
  };

  // hàm sửa thông tin nhân viên
  // mở form sửa thông tin nhân viên
  const handleOpenEditForm = () => {
    setShowEditForm(true);
  };
  // đóng form sửa thông tin nhân viên
  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };
  const handleEdit = async (id) => {
    setEmployeeId(id);
    handleOpenEditForm();
  };
  return (
    <div>
      <div className="justify-content-between">
        <Flex gap="middle" align="start" vertical>
          <Flex gap={900} justify="space-between" align="flex-start">
            <h3>Nhân viên</h3>
            <Button onClick={() => handleOpenForm()} type="primary">
              Thêm mới nhân viên
            </Button>
          </Flex>
        </Flex>
      </div>
      <div>
        <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
          <input
            style={{ width: 350 }}
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo email"
          />
          <RedoOutlined />
        </div>
      </div>{" "}
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th colSpan={3}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{employee.userName}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {employee.status === 1 ? (
                    <>
                      <div className="status status-active" />
                      <span>Đang hoạt động</span>
                    </>
                  ) : (
                    <>
                      <div className="status status-stop" />
                      <span>Ngừng hoạt động</span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <Button onClick={() => handleOpenBlock(employee.id)}>
                  {employee.status === 1 ? "Chặn" : "Bỏ chặn"}
                </Button>
              </td>
              <td>
                <Button onClick={() => handleEdit(employee.id)}>Sửa</Button>
              </td>
              <td>
                <Button onClick={() => handleOpenDelete(employee.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditForm && (
        <EditForm
          employeeId={employeeId}
          handleCloseEditForm={handleCloseEditForm}
        />
      )}
      {showForm && (
        <Form
          employeeId={employeeId}
          loadData={loadData}
          handleCloseForm={handleCloseForm}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          handleCloseDelete={handleCloseDelete}
          handleDelete={handleDelete}
        />
      )}
      {showModalBlock && (
        <ModalBlock
          handleCloseBlock={handleCloseBlock}
          handleToggle={handleToggle}
          typeModal={typeModal}
        />
      )}
    </div>
  );
}
