import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const UpdateBank = () => {
    const navigateObject = new useNavigate();
    const [name, setBankName] = useState("");
    const [abbriviation, setAbbriviation] = useState("");
  
    const userDetails = {
      username: useParams().username,
      role: useParams().role,
      token: useParams().token,
      bankId:useParams().bankId,
      name:useParams().name,
      abbriviation:useParams().abbriviation
    };
    // console.log(userDetails);
  
    const updateBank = async () => {
        //hit endpoint
        let response = await axios
        .put(
            `http://localhost:8080/api/v1/admin/update/bank/${userDetails.bankId}`,
            JSON.stringify({ name, abbriviation }),
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
        `/admindashboard/${userDetails.username}/${userDetails.role}/${userDetails.token}`
      );
    };
    return (
      <>
      <section className="overflow-hidden">
        <div className="container text" style={{ width: "35%", marginTop: "10%" }}>
        <h1>Update Bank Details</h1>
          <form>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form5Example1"
                className="form-control"
                placeholder={userDetails.name}
                onChange={(e) => setBankName(e.target.value)}
              />
              <label className="form-label" for="form5Example1" style={{color:"#fff"}}>
                Bank Name
              </label>
            </div>
  
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form5Example2"
                className="form-control"
                placeholder={userDetails.abbriviation}
                onChange={(e) => setAbbriviation(e.target.value)}
              />
              <label className="form-label" for="form5Example2" style={{color:"#fff"}}>
                Abbriviation
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

export default UpdateBank