import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './AddNewCustomer.css'

const AddNewCustomer = () => {
    const navigateObject = new useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const userDetails = {
      username: useParams().username,
      role: useParams().role,
      token: useParams().token,
    };
  
    const addNewBank = async () => {
      //hit endpoint
      let response = await axios
      .post(
          `http://localhost:8080/api/v1/admin/register`,
          JSON.stringify({ firstName, lastName, email, password }),
          {
            headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${userDetails.token}`,
          },
            withCredentials: true,
          }
        )
        .catch((err) => {
          alert("Error");
          return;
        });
    };
  
    const handleClick = async (e) => {
      addNewBank();
      navigateObject(
        `/customer/${userDetails.username}/${userDetails.role}/${userDetails.token}`
      );
    };
    return (
      <>
      <section className="overflow-hidden">
        <div className="container text" style={{ width: "35%", marginTop: "10%" }}>
        <h1>Add New User</h1>
          <form>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form5Example1"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="form-label" for="form5Example1" style={{color:"#fff"}}>
                Enter First Name
              </label>
            </div>
  
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form5Example2"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="form-label" for="form5Example2" style={{color:"#fff"}}>
              Enter Last Name
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="form5Example1"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" for="form5Example1" style={{color:"#fff"}}>
                Enter Email
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form5Example1"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" for="form5Example1" style={{color:"#fff"}}>
                Enter Password
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

export default AddNewCustomer