import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
//import Footer from "./Components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <br></br><br></br>
      <div className='text-center p-4 bottom' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        Copyright @{new Date().getFullYear()}: BRC Technologies, LLC
      </div>
    </>
  )
};

export default Layout;
