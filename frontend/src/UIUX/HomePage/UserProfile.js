import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAppointment ,deleteAppointment,clearErrors,clearMessage} from "../../redux/appointmentSlice";
import { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Confirmation } from "../../BaseFiles/Confirmation";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { error, message, appointment } =
    useSelector((state) => state.appointment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userAppointment, setUserAppointment] = useState();
  const [showCard, setShowCard] = useState("all");
  const [appointment_id, setAppointment_id] = useState();

  useEffect(() => {
    let user_id = Number(user?.user_id);
    dispatch(getAppointment(user_id));
  }, [dispatch, user]);

  useEffect(() => {
    if (appointment) {
      setUserAppointment(appointment);
    }

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

    if (!user) {
      navigate("/login");
    }
  }, [appointment, error, message, dispatch, navigate, user]);

  useEffect(() => {
    if (showCard === "all") {
      setUserAppointment(appointment);
    } else {
      setUserAppointment(appointment?.filter((a) => a?.status === showCard));
    }
  }, [showCard, appointment]);

  const handleAppointment = (category) => {
    setShowCard(category);
  };
  const handleDelete=(id)=>{
    setAppointment_id(id)
  }
  function isClose(){
    setAppointment_id(null)
  }
  return (
    <>
      <section className="pt-2 pb-12 lg:pt-[40px] lg:pb-[90px] dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex lg:w-1/2 justify-center gap-x-12 pt-8 lg:mx-auto rounded-2xl shadow-2xl bg-blue-100">
            <div className="text-8xl pt-2 text-sky-600"> <FaUserAlt/> </div>
            <div className="text-justify-left -mx-4">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] max-w-[510px] ">
                  <span className="text-green-500 block text-lg font-semibold">
                    User Profile
                  </span>
                  <h2 className="text-dark mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px]">
                    {user?.name}
                  </h2>
                  <p className="text-body-color text-base dark:text-dark-6">
                  {user?.email} , {user?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-4 flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="flex flex-wrap justify-center mb-12 space-x-1">
                <li className="mb-1">
                  <button
                    onClick={() => handleAppointment("all")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "all"
                        ? "activeClasses bg-gray-700 text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    All Appointment
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleAppointment("pending")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "pending"
                        ? "activeClasses bg-gray-700 text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6  hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    Pending
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleAppointment("accept")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "accept"
                        ? "activeClasses bg-gray-700 text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6  hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    Accept
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleAppointment("decline")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "decline"
                        ? "activeClasses bg-gray-700 text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6  hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    Decline
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleAppointment("complete")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "complete"
                        ? "activeClasses bg-gray-700 text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6  hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    Complete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative overflow-x-auto lg:px-32">
            <table className="w-full text-sm text-left rtl:text-right text-gray-900">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    date time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userAppointment?.map((a) => (
                  <tr className="bg-white border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {a?.appointment_id}
                    </th>
                    <td className="px-6 py-4">{a?.status}</td>
                    <td className="px-6 py-4">
                      {a?.date} {a?.time}
                    </td>
                    <td className="px-6 py-4">{a?.message}</td>
                    <td className="px-6 py-4">
                    <button onClick={()=>handleDelete(a?.appointment_id)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm lg:px-3 me-2 mb-2"> <img className="w-8 h-8" src="delete.gif"/></button>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        {appointment_id &&
        <Confirmation isClose={isClose} deletefunction={deleteAppointment} id={appointment_id} />}
      </section>
    </>
  );
};

export default UserProfile;
