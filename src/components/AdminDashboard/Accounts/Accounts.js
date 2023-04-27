import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Accounts.css";
import NavBar from "../../../Layout/NavBar/NavBar";
import Paginate from "../../../Layout/Pagination/Paginate";

const Accounts = () => {
  const navigateObject = new useNavigate();

  const [limit, setLimit] = useState(5)
  const [offset, setOffset] = useState(0)

  const [rendered, setRendered] = useState(false);

  const userDetails = {
    username: useParams().username,
    role: useParams().role,
    token: useParams().token,
  };

  const [accounts, setAccounts] = useState([]);

  const getAllAccounts = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/admin/getAllAccounts/${offset}/${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      console.log(response.data);
      setAccounts(response.data);
    } catch (error) {
      alert("Error");
      return;
    }
  };

  const handleClick = async (e) => {
    navigateObject(
      `/addnewAccount/${userDetails.username}/${userDetails.role}/${userDetails.token}`
    );
  };

  useEffect(() => {
    getAllAccounts();
    setRendered(true);
  }, [limit,offset]);

  return (
    <>
      <NavBar user={userDetails} />
      <Paginate totalCount={accounts.length} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset}/>
      <section className=" overflow-hidden main">
        <div className="container ">
          <div className="row">
            <div className="col">
              <button
                type="button"
                onClick={handleClick}
              >
                Add new Account
              </button>
            </div>
          </div>

          <table className="table table-bordered border-primary">
            <thead>
              <tr class="table-success">
                <th scope="col">Serial No.</th>
                <th scope="col">Account Number</th>
                <th scope="col">Amount</th>
                <th scope="col">Is Active</th>
                <th scope="col">Amount</th>
                {/* <th scope="col">Update</th>
                <th scope="col">Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 && accounts.map((account, index) => {
                return (
                  <tr class="table-success">
                    <td>{index + 1}</td>
                    <td>{account.accountNo}</td>
                    <td>{account.amount}</td>
                    <td>{account.isActive === true ? "Yes" : "No"}</td>
                    <td>{account.createdOn}</td>
                    {/* <td>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        // onClick={() =>
                        //   handleUpdate(
                        //     user.userId,
                        //     user.firstName,
                        //     user.lastName,
                        //     user.email
                        //   )
                        // }
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        // onClick={() => handleDelete(user.userId)}
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                );
              })}
              {rendered && !accounts.length && <tr><td colSpan="7">No Available Data</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Accounts;
