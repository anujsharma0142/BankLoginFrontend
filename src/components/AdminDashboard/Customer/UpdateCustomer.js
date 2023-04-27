import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './UpdateCustomer.css'

const UpdateCustomer = () => {
    const navigateObject = new useNavigate();
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
  
    const userDetails = {
      username: useParams().username,
      role: useParams().role,
      token: useParams().token,
      userId:useParams().userId,
      firstName:useParams().firstName,
      lastName:useParams().lastName,
      email:useParams().email
    };
    // console.log(userDetails);
  
    const updateBank = async () => {
        //hit endpoint
        let response = await axios
        .put(
            `http://localhost:8080/api/v1/admin/update/user/${userDetails.userId}`,
            JSON.stringify({ firstName, lastName, email }),
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
      updateBank();
      navigateObject(
        `/customer/${userDetails.username}/${userDetails.role}/${userDetails.token}`
      );
    };
    return (
      <>
      <section className="overflow-hidden">
        <div className="container text" style={{ width: "35%", marginTop: "10%" }}>
        <h1>Update User Details</h1>
          <form>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form5Example1"
                className="form-control"
                placeholder={userDetails.firstName}
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
                placeholder={userDetails.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="form-label" for="form5Example2" style={{color:"#fff"}}>
                Enter Last Name
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="form5Example2"
                className="form-control"
                placeholder={userDetails.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" for="form5Example2" style={{color:"#fff"}}>
                Enter Email
              </label>
            </div>
  
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              onClick={handleClick}
            >
              Update
            </button>
          </form>
        </div>
        </section>
      </>
    );
}

export default UpdateCustomer