import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Transaction.css";
import NavBar from "../../../Layout/NavBar/NavBar";

const Transaction = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    username: useParams().username,
    role: useParams().role,
    token: useParams().token,
    userId: useParams().userId,
  };

  const [senderAccountId, setSenderAccountId] = useState("");
  const [receiverAccountId, setReceiverAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senderAccountId === "" || receiverAccountId === "" || amount === "") {
      alert("senderAccountId or receiverAccountId or amount is empty");
      return;
    }

    if(senderAccountId <=0 || receiverAccountId <=0 ) alert("Account Number Not Correct")

    if(amount <= 0) alert("Amount should be Greater than 0")

    if (transactionType === "transfer") {
        console.log(senderAccountId,receiverAccountId,amount);
      const response = await axios
        .post(
          `http://localhost:8080/api/v1/transactions/${transactionType}`,
          JSON.stringify({ senderAccountId, receiverAccountId, amount }),
          {
            headers: {
                "Content-Type": "application/json",
                withCredentials: true,
                Authorization: `Bearer ${userDetails.token}`,
              },
          }
        )
        .catch((err) => {
          alert("Invalid Choose Correct Account Number");
        });

      if (!response.data) {
        alert("Login Failed");
      }
      navigateObject(
        `/userdashboard/${userDetails.username}/${userDetails.role}/${userDetails.token}/${userDetails.userId}`
      );
    }else if (transactionType === "deposit") {
        console.log(senderAccountId,amount);
        const accountId = senderAccountId;
      const response = await axios
        .post(
          `http://localhost:8080/api/v1/transactions/${transactionType}`,
          JSON.stringify({ accountId, amount }),
          {
            headers: {
                "Content-Type": "application/json",
                withCredentials: true,
                Authorization: `Bearer ${userDetails.token}`,
              },
          }
        )
        .catch((err) => {
          alert("Invalid Choose Correct Account Number");
        });

      if (!response.data) {
        alert("Login Failed");
      }
      navigateObject(
        `/userdashboard/${userDetails.username}/${userDetails.role}/${userDetails.token}/${userDetails.userId}`
      );
    }
    const accountId = senderAccountId;
      const response = await axios
        .post(
          `http://localhost:8080/api/v1/transactions/${transactionType}`,
          JSON.stringify({ accountId, amount }),
          {
            headers: {
                "Content-Type": "application/json",
                withCredentials: true,
                Authorization: `Bearer ${userDetails.token}`,
              },
          }
        )
        .catch((err) => {
          alert("Invalid Choose Correct Account Number");
        });

      if (!response.data) {
        alert("Login Failed");
      }
      navigateObject(
        `/userdashboard/${userDetails.username}/${userDetails.role}/${userDetails.token}/${userDetails.userId}`
      );
  };

  return (
    <>
      <NavBar user={userDetails} />
      <section className="overflow-hidden main">
        <div className="container ">
          <div className="row">
            <div className="col">
              <h1>Transaction</h1>
              <form>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form5Example1"
                    class="form-control"
                    onChange={(e) => setSenderAccountId(e.target.value)}
                  />
                  <label class="form-label" for="form5Example1" style={{color:"#fff"}}>
                    Enter Sender Account Number
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="form5Example2"
                    class="form-control"
                    onChange={(e) => setReceiverAccountId(e.target.value)}
                  />
                  <label class="form-label" for="form5Example2" style={{color:"#fff"}}>
                    Enter Receiver Account Number
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="form5Example2"
                    class="form-control"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <label class="form-label" for="form5Example2" style={{color:"#fff"}}>
                    Enter Amount
                  </label>
                </div>

                <div class="col-12">
                  <label class="visually-hidden" for="inlineFormSelectPref" style={{color:"#fff"}}>
                    Transaction Types
                  </label>
                  <select
                    class="select"
                    onChange={(e) => setTransactionType(e.target.value)}
                  >
                    <option value="deposit">deposit</option>
                    <option value="withdraw">withdraw</option>
                    <option value="transfer">transfer</option>
                  </select>
                </div>
                <br />

                <button
                  type="submit"
                  class="btn btn-primary btn-block mb-4"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transaction;
