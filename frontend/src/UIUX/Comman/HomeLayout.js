// import NavbarMenu from "./NavbarMenu";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Banner from "../HomePage/Banner";
import Footer from "../HomePage/Footer";
import FooterForm from "../HomePage/FooterForm";
export default function HomeLayout({ children }) {
  const currentUrl = window.location.href;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return (
    <>
      <Banner />

      <Navbar />

      <div>{children}</div>

      <div>
        {" "}
        <Footer />
        <FooterForm />
      </div>
    </>
  );
}
