import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Layout/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const UserDashboard = () => {
  const navigateObject = new useNavigate();
  const [isLoading, setLoading] = useState(0);

  const userDetails = {
    username: useParams().username,
    role: useParams().role,
    token: useParams().token,
    userId: useParams().userId,
  };

  const [userData, setUserDetails] = useState([]);

  const getAllAccounts = async () => {
    try {
      console.log(userDetails.token);
  
      let response = await axios.get(
        `http://localhost:8080/api/v1/user/details`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      setUserDetails(response.data);
      console.log("hersfdse");
      console.log(userData);
      console.log(userData['accounts']);
      setLoading(1);
    } catch (error) {
      alert("Error");
      return;
    }
  };

  const handleClick = (accountNo) => {
    navigateObject(
      `/passbook/${userDetails.username}/${userDetails.role}/${userDetails.token}/${userDetails.userId}/${accountNo}`
    );
  }

  useEffect(() => {
    getAllAccounts();
  }, []);


  return (
    (isLoading == 0)?(<>
        <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></>):
    (<>
      <NavBar user={userDetails} />
      <section className="overflow-hidden main">
        <div className="container ">
          <div className="row">
            <div className="col">
              <table className="table table-bordered border-primary">
                <thead>
                  <tr class="table-success">
                    <th scope="col">Serial No.</th>
                    <th scope="col">Account Number</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Is Active</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Show Passbook</th>
                  </tr>
                </thead>
                <tbody>
                  {userData['accounts'].map((account, index) => {
                    return (
                      <tr class="table-success">
                        <td>{index + 1}</td>
                        <td>{account.accountNo}</td>
                        <td>{account.amount}</td>
                        <td>{account.isActive === true ? "Yes" : "No"}</td>
                        <td>{account.createdOn}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            onClick={() => handleClick(account.accountNo)}
                          >
                            Passbook
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>)
  );
};

export default UserDashboard;
