import React, { useEffect, useState } from "react";
import NavBar from "../../Layout/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";
import Paginate from "../../Layout/Pagination/Paginate";
import Loader from "../../Layout/Loader";

const AdminDashboard = () => {
  const navigateObject = new useNavigate();

  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const [rendered, setRendered] = useState(false);
  const [loader, setLoader] = useState(true);

  const userDetails = {
    username: useParams().username,
    role: useParams().role,
    token: useParams().token,
  };
  const [banks, setBanks] = useState([]);

  const getAllBanks = async () => {
    console.log("limit: ", limit);
    console.log("offset: ", offset);
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/admin/getAllBanks/${offset}/${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      setBanks(response.data);
    } catch (error) {
      alert("Error");
      return;
    }
  };

  const handleDelete = async (bankId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/bank/delete/${bankId}`,
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      getAllBanks();
    } catch (error) {
      alert("Can not delete");
    }
  };

  const handleUpdate = async (bankId, bankName, abbriviation) => {
    navigateObject(
      `/update/${userDetails.username}/${userDetails.role}/${userDetails.token}/${bankId}/${bankName}/${abbriviation}`
    );
  };

  // const userRows = banks.length > 0 && banks.map((bank, index) => {
  //   console.log(bank);
  //   return (
  //     <tr class="table-success">
  //       <td>{index + 1}</td>
  //       <td>{bank.bankId}</td>
  //       <td>{bank.bankName}</td>
  //       <td>{bank.abbriviation}</td>
  //       <td>{bank.accounts.length}</td>
  //       <td>
  //         <button type="button" class="btn btn-outline-secondary">
  //           Update
  //         </button>
  //       </td>
  //       <td>
  //         <button
  //           type="button"
  //           class="btn btn-outline-danger"
  //           onClick={() => handleDelete(bank.bankId)}
  //         >
  //           Delete
  //         </button>
  //       </td>
  //     </tr>
  //   );
  // });

  const handleClick = async (e) => {
    navigateObject(
      `/addnew/${userDetails.username}/${userDetails.role}/${userDetails.token}`
    );
  };

  useEffect(() => {
    getAllBanks();
    setRendered(true);
    setLoader(false);
  }, [limit, offset]);

  if (loader === true) {
    return <Loader />;
  } else {
    return (
      <>
        <NavBar user={userDetails} />

        <section className="overflow-hidden">
          <div className="container ">
            <div className="row">
              <div className="col">
                <Paginate
                  totalCount={banks.length}
                  limit={limit}
                  setLimit={setLimit}
                  offset={offset}
                  setOffset={setOffset}
                />
                <button
                  type="button"
                  onClick={handleClick}
                >
                  Add new Bank
                </button>
              </div>
            </div>

            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">Bank ID</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">Abbriviation</th>
                  <th scope="col">Total Accounts</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              {/* <tbody>{userRows}</tbody> */}
              <tbody>
                {banks.length > 0 &&
                  banks.map((bank, index) => {
                    console.log(bank);
                    return (
                      <tr class="table-success">
                        <td>{index + 1}</td>
                        <td>{bank.bankId}</td>
                        <td>{bank.bankName}</td>
                        <td>{bank.abbriviation}</td>
                        <td>{bank.accounts.length}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            onClick={() =>
                              handleUpdate(
                                bank.bankId,
                                bank.bankName,
                                bank.abbriviation
                              )
                            }
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            onClick={() => handleDelete(bank.bankId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {rendered && !banks.length && (
                  <tr>
                    <td colSpan="7">No Available Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
};

export default AdminDashboard;
