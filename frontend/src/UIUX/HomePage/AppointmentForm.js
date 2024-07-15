import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import { useSelector, useDispatch } from "react-redux";
import { requestAppointment, clearErrors, clearMessage, setFormData } from "../../redux/appointmentSlice";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const { user } = useSelector((state) => state.user);
  const { error, message } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (user === null) {
      navigate("/login");
    }
  }, [error, message, dispatch, navigate, user]);

  const initialValues = {
    user_id: user?.user_id,
    name: '',
    email: '',
    phone: '',
    message: '',
    appointment_type: '' 
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().required('Required'), 
    message: Yup.string().required('Required'),
    appointment_type: Yup.string().required('Required') 
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setFormData(values)
    if (user === null) {
      navigate("/login");
    }
    // dispatch(requestAppointment(values));
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            {message && <SuccessAlert message={message} />}
            {error && <ErrorAlert error={error} />}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <Field
                type="text"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <Field
                type="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone:
              </label>
              <Field
                type="text"
                name="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Message:
              </label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4">
              <label htmlFor="appointment_type" className="block text-gray-700 text-sm font-bold mb-2">
                Appointment Type:
              </label>
              <Field
                as="select"
                name="appointment_type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select appointment type</option>
                <option value="videocall">Video Call</option>
                <option value="voicecall">Voice Call</option>
                <option value="facetoface">Face-to-Face Meeting</option>
              </Field>
              <ErrorMessage name="appointment_type" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AppointmentForm;
