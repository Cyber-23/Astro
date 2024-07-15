import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../BaseFiles/Spinner";
import { signupUser, clearErrors } from "../redux/userSlice";
import ErrorAlert from "../BaseFiles/ErrorAlert";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Registration() {
  const [showPass, setShowPass] = useState(false);
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    phone: "",
    address: "",
    country: "",
    pincode: "",
    state: "",
    city: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("phone is required"),
    address: Yup.string().required("address is required"),
    country: Yup.string().required("country is required"),
    pincode: Yup.string().required("pincode is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(signupUser(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);

      return () => clearTimeout(timer);
    }

  }, [error, dispatch, navigate, user]);

  return (
    <>
      <div className="md:flex regbg md:p-8 p-2 md:py-12 md:px-12">
        <div className=" h-auto md:w-1/2 justify-center py-4 bg-blue-500 bg-opacity-10 rounded-2xl shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl text-white font-bold leading-9 tracking-tight text-white">
            Sign Up Here
          </h2>
        </div>
          <div className="sm:mx-auto sm:w-full px-12">
            <form className="space-y-2 " onSubmit={formik.handleSubmit}>
              <div className="md:flex gap-x-4 justify-between ">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.name}*
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.email}*
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex gap-x-4 justify-between ">
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.phone}*
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={showPass ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
                    >
                      {/* {!showPass ? (
                        <FaRegEye
                          className="h-6 w-6 text-gray-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaRegEyeSlash
                          className="h-6 w-6 text-gray-600"
                          aria-hidden="true"
                        />
                      )} */}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.password}*
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-4  text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                    {formik.errors.address}*
                  </p>
                )}
              </div>

              <div className="md:flex gap-x-4 justify-between ">
                <div className="w-full">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    city
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.city}*
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    state
                  </label>
                  <div className="mt-2">
                    <input
                      id="state"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.state && formik.errors.state && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.state}*
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex gap-x-4 justify-between ">
                <div className="w-full">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    country
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.country && formik.errors.country && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.country}*
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    pincode
                  </label>
                  <div className="mt-2">
                    <input
                      id="pincode"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.pincode && formik.errors.pincode && (
                    <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                      {formik.errors.pincode}*
                    </p>
                  )}
                </div>
              </div>

              {error && <ErrorAlert error={error} />}
              <div>
                <button
                  type="submit"
                  className={`flex w-full uppercase tracking-widest justify-center rounded ${
                    loading ? "bg-indigo-200" : "bg-indigo-600"
                  } px-3 py-1.5 px-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {loading ? <Spinner /> : "Registration"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-white text-sm ">
              Already a member?{" "}
              <Link
                to="/Login"
                className="font-semibold leading-6 text-white"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
