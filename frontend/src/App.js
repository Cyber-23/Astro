import "./App.css";
import Registration from "./pages/Registration";
import HomeLayout from "./UIUX/Comman/HomeLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./BaseFiles/PrivateRoutes";
import Home from "./UIUX/Home";
import { useDispatch, useSelector } from "react-redux";
import AboutUS from "./UIUX/HomePage/AboutUs";
import Blogs from "./UIUX/HomePage/Blogs";
import ContactUs from "./UIUX/HomePage/ContactUs";
import AppointmentForm from "./UIUX/HomePage/AppointmentForm";
import UserProfile from "./UIUX/HomePage/UserProfile";
import Layout from "./BaseFiles/Layout";
import AllAppointment from "./Admin/AllAppointment";
import AllUsers from "./Admin/AllUser";
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route
          path={`/`}
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
        <Route
          path={`/aboutus`}
          element={
            <HomeLayout>
              <AboutUS />
            </HomeLayout>
          }
        />
        <Route
          path={`/blogs`}
          element={
            <HomeLayout>
              <Blogs />
            </HomeLayout>
          }
        />
        <Route
          path={`/contactus`}
          element={
            <HomeLayout>
              <ContactUs />
            </HomeLayout>
          }
        />
        <Route
          path={`/appointment`}
          element={
            <HomeLayout>
              <AppointmentForm />
            </HomeLayout>
          }
        />
        <Route
          path={`/profile`}
          element={
            <HomeLayout>
              <UserProfile />
            </HomeLayout>
          }
        />

        <Route
          path={`/allusers`}
          element={
            <Layout>
              <AllUsers />
            </Layout>
          }
        />
        <Route
          path={`/allappointments`}
          element={
            <Layout>
              <AllAppointment />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
