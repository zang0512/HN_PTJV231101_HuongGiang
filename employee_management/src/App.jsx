import "./App.css";
import Form from "./components/Form";
import Table from "./pages/ListEmployee";

function App() {
  return (
    <>
      <link rel="stylesheet" href="./index.css" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />
      {/* Link font awesome end*/}
      <>
        <div className="w-[80%] m-auto mt-4 h-[100vh]">
          <main className="main">
            {/* Danh sách nhân viên */}
            <Table />
            <footer className="d-flex justify-content-end">
              <div className="d-flex align-items-center gap-3">
                <select className="form-select">
                  <option selected="">Hiển thị 10 bản ghi trên trang</option>
                  <option>Hiển thị 20 bản ghi trên trang</option>
                  <option>Hiển thị 50 bản ghi trên trang</option>
                  <option>Hiển thị 100 bản ghi trên trang</option>
                </select>
              </div>
            </footer>
          </main>
        </div>
        {/* Form thêm mới nhân viên */}

        {/* Modal xác nhận chặn tài khoản */}

        {/* Modal xác nhận xóa tài khoản */}
      </>
    </>
  );
}

export default App;
