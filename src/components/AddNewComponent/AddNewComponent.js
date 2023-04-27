import React, { useRef, useState } from "react";
import "./AddNewComponent.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddNewComponent = () => {
  const navigateObject = new useNavigate();
  const [name, setBankName] = useState("");
  const [abbriviation, setAbbriviation] = useState("");

  const userDetails = {
    username: useParams().username,
    role: useParams().role,
    token: useParams().token,
  };

  const addNewBank = async () => {
    //hit endpoint
    let response = await axios
    .post(
        `http://localhost:8080/api/v1/admin/create_bank`,
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
    addNewBank();
    navigateObject(
      `/admindashboard/${userDetails.username}/${userDetails.role}/${userDetails.token}`
    );
  };
  return (
    <>
    <section className="overflow-hidden">
      <div className="container text" style={{ width: "35%", marginTop: "10%" }}>
      <h1>Add new Bank</h1>
        <form>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form5Example1"
              className="form-control"
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
            Add
          </button>
        </form>
      </div>
      </section>
    </>
  );
};

export default AddNewComponent;
