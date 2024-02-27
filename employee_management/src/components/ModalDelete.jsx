import React from "react";

export default function ModalDelete({ handleCloseDelete, handleDelete }) {
  return (
    <div>
      <div className="overlay" hidden="">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark" onClick={handleCloseDelete} />
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light" onClick={handleCloseDelete}>
              Hủy
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
