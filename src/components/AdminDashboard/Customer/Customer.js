import React, { useEffect, useState } from 'react'
import NavBar from '../../../Layout/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Paginate from '../../../Layout/Pagination/Paginate';

const Customer = () => {
  const navigateObject = new useNavigate();

  const [limit, setLimit] = useState(5)
  const [offset, setOffset] = useState(0)

  const [rendered, setRendered] = useState(false);

  const userDetails = {
    username: useParams().username,
    role: useParams().role,
    token: useParams().token,
  };
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/admin/getAllUsers/${offset}/${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      alert("Error");
      return;
    }
  };

  const handleDelete = async (userId,role) => {
    if(role !== "ADMIN"){
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/user/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      getAllUsers();
    } catch (error) {
      alert("Can Not Delete User With Accounts")
    }
  }else{
    alert("Can not Delete Admin Accounts")
  }
  };

  const handleUpdate = async (userId,firstName,lastName,email) => {
    navigateObject(
      `/updateCustomer/${userDetails.username}/${userDetails.role}/${userDetails.token}/${userId}/${firstName}/${lastName}/${email}`
    );
  };

  const handleClick = async (e) => {
    navigateObject(
      `/addnewCustomer/${userDetails.username}/${userDetails.role}/${userDetails.token}`
    );
  };

  useEffect(() => {
    getAllUsers();
    setRendered(true);
  }, [limit,offset]);

  return (
    <>
      <NavBar user={userDetails} />
      <Paginate totalCount={users.length} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset}/>
      <section className="overflow-hidden">
        <div className="container ">
          <div className="row">
            <div className="col">
              <button
                type="button"
               
                onClick={handleClick}
              >
                Add new User
              </button>
            </div>
          </div>

          <table className="table table-bordered border-primary">
            <thead>
              <tr class="table-success">
              <th scope="col">Serial No.</th>
                <th scope="col">User ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">email</th>
                <th scope="col">Role</th>
                <th scope="col">Total Accounts</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 && users.map((user, index) => {
                {/* console.log(bank); */}
                return (
                  <tr class="table-success">
                    <td>{index + 1}</td>
                    <td>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.accounts.length}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        onClick={() => handleUpdate(user.userId,user.firstName,user.lastName,user.email)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => handleDelete(user.userId,user.role)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rendered && !users.length && <tr><td colSpan="7">No Available Data</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Customer