import { Outlet } from "react-router-dom";

const Layout = ({ pageMsg }) => {
  return (
    <>
      <Outlet />
      <center><p>{pageMsg}</p></center>
    </>
  )
};

export default Layout;
