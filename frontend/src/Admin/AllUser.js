import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUser,deleteUser ,clearErrors,clearMessage} from "../redux/userSlice";
import { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Confirmation } from "../BaseFiles/Confirmation";

const AllUser = () => {
  const { user,alluser ,error,message} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState();
  const [user_id, setUser_id] = useState();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (alluser) {
        setAllUsers(alluser);
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
  }, [alluser, error, message, dispatch, navigate]);

 
  const handleDelete=(id)=>{
    setUser_id(id)
  }
  function isClose(){
    setUser_id(null)
  }
  return (
    <>
      <section className="pt-2 pb-12 lg:pt-[40px] lg:pb-[90px] dark:bg-dark">
        <div className="container mx-auto">

          <div className="relative overflow-x-auto lg:px-32">
            <table className="w-full text-sm text-left rtl:text-right text-gray-900">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                   E-mail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((a) => (
                  <tr className="bg-white border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {a?.user_id}
                    </th>
                    <td className="px-6 py-4">{a?.name}</td>
                    
                    <td className="px-6 py-4">{a?.email}</td>
                    <td className="px-6 py-4">{a?.phone}</td>
                    <td className="px-6 py-4">{a?.address + " " + a?.city + " " + a?.state + " " + a?.country}</td>


                    <td className="px-6 py-4">
                    <button onClick={()=>handleDelete(a?.user_id)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm lg:px-3 me-2 mb-2"> <img className="w-8 h-8" src="delete.gif"/></button>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        {user_id &&
        <Confirmation isClose={isClose} deletefunction={deleteUser} id={user_id} />}
      </section>
    </>
  );
};

export default AllUser;
