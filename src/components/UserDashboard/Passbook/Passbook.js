import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Passbook.css"
import NavBar from "../../../Layout/NavBar/NavBar";

const Passbook = () => {
    const navigateObject = new useNavigate();

    const userDetails = {
      username: useParams().username,
      role: useParams().role,
      token: useParams().token,
      userId: useParams().userId,
      accountNo: useParams().accountNo
    };
  
    console.log(userDetails);
    const [transactions, setTransactions] = useState([]);
  
    const getAllTransactions = async () => {
      try {
        let response = await axios.get(
          `http://localhost:8080/api/v1/admin/transactions/${userDetails.accountNo}`,
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              Authorization: `Bearer ${userDetails.token}`,
            },
          }
        );
        console.log(response.data);
        setTransactions(response.data);
        console.log(transactions);
      } catch (error) {
        alert("Error No Data Found");
        return;
      }
    };
  
    useEffect(() => {
        getAllTransactions();
    }, []);
  
    return (
      <>
        <NavBar user={userDetails} />
        <section className="overflow-hidden main">
          <div className="container">
            <div className="row">
              <div className="col">
                <table className="table table-bordered border-primary">
                  <thead>
                    <tr class="table-success">
                      <th scope="col">Serial No.</th>
                      <th scope="col">Trasaction Id</th>
                      <th scope="col">Transaction Type</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Sender Account Number</th>
                      <th scope="col">Receiver Account Number</th>
                      <th scope="col">Transaction date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => {
                      return (
                        
                        <tr class="table-success">
                          <td>{index + 1}</td>
                          <td>{transaction.tid}</td>
                          <td>{transaction.transactionType}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.status}</td>
                          <td>{transaction.senderAccNO}</td>
                          <td>{transaction.reciverAccNO}</td>
                          <td>{transaction.createdOn}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Passbook