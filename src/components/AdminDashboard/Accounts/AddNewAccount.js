import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddNewAccount.css"

const AddNewAccount = () => {
    const navigateObject = new useNavigate();

    const [bankId, setBankId] = useState("")
    const [customerId, setCustomerId] = useState("");
    const [amount, setAmount] = useState("")
    
  
    const userDetails = {
      username: useParams().username,
      role: useParams().role,
      token: useParams().token,
    };

    
  
    const addNewBank = async () => {
      //hit endpoint
      if(amount <= 0) alert("Amount Should be Greater than 0")
      let response = await axios
      .post(
          `http://localhost:8080/api/v1/admin/create_acc`,
          JSON.stringify({ bankId, customerId, amount }),
          {
            headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${userDetails.token}`,
          },
            withCredentials: true,
          }
        )
        .catch((err) => {
          alert("Error Can not Find Bank Or Account ID");
          return;
        });
    };
  
    const handleClick = async (e) => {
      addNewBank();
      navigateObject(
        `/accounts/${userDetails.username}/${userDetails.role}/${userDetails.token}`
      );
    };
    return (
      <>
      <section className="overflow-hidden">
        <div className="container text" style={{ width: "35%", marginTop: "10%" }}>
        <h1>Add New Account</h1>
          <form>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form5Example1"
                className="form-control"
                onChange={(e) => setBankId(e.target.value)}
              />
              <label className="form-label" for="form5Example1" style={{color:"#fff"}}>
                Enter Bank ID
              </label>
            </div>
  
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form5Example2"
                className="form-control"
                onChange={(e) => setCustomerId(e.target.value)}
              />
              <label className="form-label" for="form5Example2" style={{color:"#fff"}}>
              Enter Customer ID
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="form5Example1"
                className="form-control"
                onChange={(e) => setAmount(e.target.value)}
              />
              <label className="form-label" for="form5Example1" style={{color:"#fff"}}>
                Enter Amount
              </label>
            </div>
  
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              onClick={handleClick}
            >
              Add
            </button>
          </form>
        </div>
        </section>
      </>
    );
}

export default AddNewAccount