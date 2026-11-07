import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"; 
function Layout({ children }) {
  return (
    <>
      <Header />
      {/* <main>
        {children}
      </main> */}
    <Outlet/>
    <Footer/>
    </>
  );
}
export default Layout;