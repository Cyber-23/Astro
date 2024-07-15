import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FiMenu } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiAdminLine } from "react-icons/ri";
import { CiGlobe } from "react-icons/ci";
import { FaBriefcase } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaBookMedical } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { BiSolidOffer } from "react-icons/bi";
import { HiSpeakerphone } from "react-icons/hi";
import { FaShop } from "react-icons/fa6";
import { logoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SidebarMenu = ({ toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [companyNameVisible, setCompanyNameVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setCompanyNameVisible(!collapsed);
    toggleSidebar();
  };

  useEffect(() => {}, []);
  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <div
      className={`sidebar-wrapper ${
        collapsed && isMobile ? "collapsed" : ""
      } fixed h-full overflow-y-auto z-10`}
    >
      <Sidebar
        collapsed={collapsed}
        width="20"
        className="tracking-widest w-full font-sans text-xs text-gray-600 max-2xl:w-[270px]"
      >
        <div className="sidebar-header">
          {isMobile && (
            <div
              className="toggle-btn-mobile p-2"
              onClick={handleToggleCollapse}
            >
              <FiMenu />
            </div>
          )}
          {(!isMobile || (isMobile && !collapsed)) && (
            <Link to="/">
            <div
              className={`company-name ${companyNameVisible ? "hidden" : ""} `}
            >
              Own Basket
            </div></Link>
          )}
          {!isMobile && (
            <div className="toggle-btn p-2" onClick={handleToggleCollapse}>
              <FiMenu />
            </div>
          )}
        </div>
        {(!isMobile || (isMobile && !collapsed)) && (
          <Menu
            className="bg-[#1e293b] text-white"
            iconShape="square"
            menuItemStyles={{
              button: {
                backgroundColor: "#020617",
                "&:hover": {
                  backgroundColor: "#020617",
                },
              },
            }}
          >
            <Link to={`/admin/dashboard`}>
              <MenuItem icon={<RiAdminLine className="text-xl" />}>
                {" "}
               User Dashboard
              </MenuItem>
            </Link>
            <hr />

            <>
              <Link to={`/all/company`}>
                <MenuItem icon={<MdOutlineDashboard className="text-xl" />}>
                  Company
                </MenuItem>
              </Link>
            </>
            <hr />

            {user?.role=="admin" ? (
               <Link to={`/all/seller`}>
               <MenuItem icon={<CiGlobe className="text-xl" />}>
                 Seller List
               </MenuItem>
             </Link>
            ):("")}
           
            <>
              <hr />
              <Link to={`/all/buyer`}>
                <MenuItem icon={<MdGroups className="text-xl" />}>
                  Users List
                </MenuItem>
              </Link>

              <hr />
              
              <Link to={`/start/selling`}>
                <MenuItem icon={<FaShop className="text-xl" />}>
                  Add Company
                </MenuItem>
              </Link>
              <hr />
              {/* <Link to={`/upload/product`}>
                <MenuItem
                  icon={
                    <MdOutlineDashboard className="text-blue-600 text-xl" />
                  }
                >
                  Upload Product
                </MenuItem>
              </Link>
              <hr /> */}
            </>

            <SubMenu
              label="Products"
              icon={<FaBriefcase className="text-xl" />}
            >
              <Link to={"/indevelopment"}>
                <MenuItem>All-Categories</MenuItem>
              </Link>
              <Link to={"/indevelopment"}>
                <MenuItem>Upload-Categories</MenuItem>
              </Link>
              <Link to={`/all/products`}>
                <MenuItem>All-Products</MenuItem>
              </Link>
              <Link to={"/upload/products"}>
                <MenuItem>Upload-Products</MenuItem>
              </Link>
            </SubMenu>
            <hr />
            <SubMenu label="Order" icon={<FaCartPlus className="text-xl" />}>
              <Link to={"/orderlist"}>
                <MenuItem>Order-List</MenuItem>
              </Link>
              <Link to={"/indevelopment"}>
                <MenuItem>Order-Pending</MenuItem>
              </Link>
              <Link to={"/indevelopment"}>
                <MenuItem>Order-Return</MenuItem>
              </Link>
              <Link to={"/indevelopment"}>
                <MenuItem>Order-Complete</MenuItem>
              </Link>
            </SubMenu>
            <hr />
            <Link to={"/indevelopment"}>
              <MenuItem icon={<GrTransaction className="text-xl" />}>
                Transaction
              </MenuItem>
            </Link>
            <hr />
            <Link to={"/indevelopment"}>
              <MenuItem icon={<FaBookMedical className="text-xl" />}>
                Documentation
              </MenuItem>
            </Link>
            <hr />
            <Link to={"/indevelopment"}>
              <MenuItem icon={<BiSolidOffer className="text-xl" />}>
                Coupons
              </MenuItem>
            </Link>
            <hr />
            <Link to={"/indevelopment"}>
              <MenuItem icon={<HiSpeakerphone className="text-xl" />}>
                Promotions
              </MenuItem>
            </Link>
            <hr />
            {/* <Link to="" onClick={handleSignOut}>
              <MenuItem icon={<FiLogOut className="text-xl" />}>
                Logout
              </MenuItem>
            </Link> */}
            {/* <hr />

            <SubMenu
              label="Demo - 2"
              disabled
              icon={<BiLibrary className="text-blue-600 text-xl" />}
            >
              <Link to="/fees/entries">
                <MenuItem>Fees Collection</MenuItem>
              </Link>
              <Link to="/createfees">
                <MenuItem>Create Student Payment</MenuItem>
              </Link>
              <Link to="/createfee/structure">
                <MenuItem>Create Fees Structure</MenuItem>
              </Link>
              <Link to="/salary/box">
                <MenuItem>Salary Box</MenuItem>
              </Link>
              <Link to="/salary/create">
                <MenuItem>Create Salary Structure</MenuItem>
              </Link>
              <Link to="/salary/pay">
                <MenuItem>pay Salary</MenuItem>
              </Link>
            </SubMenu>
            <hr />
            <hr />

            <SubMenu
              label="Demo -3"
              disabled
              icon={<BiLibrary className="text-blue-600 text-xl" />}
            >
              <Link to="/fees/entries">
                <MenuItem>Fees Collection</MenuItem>
              </Link>
              <Link to="/createfees">
                <MenuItem>Create Student Payment</MenuItem>
              </Link>
              <Link to="/createfee/structure">
                <MenuItem>Create Fees Structure</MenuItem>
              </Link>
              <Link to="/salary/box">
                <MenuItem>Salary Box</MenuItem>
              </Link>
              <Link to="/salary/create">
                <MenuItem>Create Salary Structure</MenuItem>
              </Link>
              <Link to="/salary/pay">
                <MenuItem>pay Salary</MenuItem>
              </Link>
            </SubMenu>
            <hr />

            <SubMenu
              label="Demo - 4"
              disabled
              icon={<BiLibrary className="text-blue-600 text-xl" />}
            >
              <Link to="/fees/entries">
                <MenuItem>Fees Collection</MenuItem>
              </Link>
              <Link to="/createfees">
                <MenuItem>Create Student Payment</MenuItem>
              </Link>
              <Link to="/createfee/structure">
                <MenuItem>Create Fees Structure</MenuItem>
              </Link>
              <Link to="/salary/box">
                <MenuItem>Salary Box</MenuItem>
              </Link>
              <Link to="/salary/create">
                <MenuItem>Create Salary Structure</MenuItem>
              </Link>
              <Link to="/salary/pay">
                <MenuItem>pay Salary</MenuItem>
              </Link>
            </SubMenu> */}
            <hr />
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
