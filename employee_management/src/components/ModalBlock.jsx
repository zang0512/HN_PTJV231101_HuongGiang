import React from "react";

export default function ModalBlock({
  handleCloseBlock,
  handleToggle,
  typeModal,
}) {
  return (
    <div>
      <div className="overlay" hidden="">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark" onClick={handleCloseBlock} />
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn {typeModal} tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light" onClick={handleCloseBlock}>
              Hủy
            </button>
            <button className="btn btn-danger" onClick={handleToggle}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
