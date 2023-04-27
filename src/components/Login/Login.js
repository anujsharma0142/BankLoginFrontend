import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
// import AuthContext from "./AuthContext";

const Login = () => {
  const navigateObject = new useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleMyLogin = async (e) => {
    e.preventDefault();

    if (email === "" && password === "") {
      alert("Username or Password is empty");
      return;
    }

    // console.log(email,password);

    const response = await axios
      .post(
        `http://localhost:8080/api/v1/auth/authenticate`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .catch((err) => {
        alert(err.message);
      });

    if (!response.data) {
      alert("Login Failed");
    }

    const response2 = await axios
      .get(`http://localhost:8080/api/v1/user/details`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      })
      .catch((err) => {
        alert(err.message);
      });

    console.log(response2);

    const username = response2.data.fname + " " + response2.data.lname;

    if (response2.data.role === "ADMIN") {
      navigateObject(
        `/admindashboard/${username}/${response2.data.role}/${response.data.token}`
      );
      console.log(response2.data.fname + " " + response2.data.lname);
      return;
    }

    navigateObject(
      `/userdashboard/${username}/${response2.data.role}/${response.data.token}/${response2.data.userId}`
    );
  };

  return (
    <>

    <section> 

    <div className="container-fluid">
		<div className="row main-content bg-success text-center">
			{/* <div className="col-md-4 text-center company__info">
				<span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
				<h4 className="company_title">Your Company Logo</h4>
			</div> */}
			<div className="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div className="container-fluid">
					<div className="row">
						<h2>Welcome to Banking application.</h2>
					</div>
					<div className="row">
						<form control="" className="form-group">
							<div className="row">
								<input type="email"  id="username" className="form__input" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)}/>
							</div>
							<div className="row">
								
								<input type="password" name="password" id="password" className="form__input" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  />
							</div>
							
							<div className="row">
								<button type="submit" onClick={handleMyLogin} className="btn">Login in</button>
							</div>
						</form>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</section>











      {/* <section classNameName="overflow-hidden">
        <div classNameName="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div classNameName="row gx-lg-5 align-items-center mb-5">
            <div classNameName="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                classNameName="my-5 display-5 fw-bold ls-tight"
                style={{ color: "#f3f343" }}
              >
                Bank <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>Application</span>
              </h1>
              <p
                classNameName="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Welcome to our secure banking application. At our bank, we take
                the security of your financial information very seriously.
                That's why we use state-of-the-art encryption and authentication
                measures to protect your account from unauthorized access.
                Please enter your login credentials to access your account.
              </p>
            </div>

            <div classNameName="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                classNameName="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                classNameName="position-absolute shadow-5-strong"
              ></div>

              <div classNameName="card main">
                <div classNameName="card-body px-4 py-5 px-md-5">
                  <form>
                    <div classNameName="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        classNameName="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label classNameName="form-label" for="form3Example3">
                        Email address
                      </label>
                    </div>

                    <div classNameName="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        classNameName="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label classNameName="form-label" for="form3Example4">
                        Password
                      </label>
                    </div>

                    <button
                      type="submit"
                      classNameName="btn btn-primary btn-block mb-4"
                      onClick={handleMyLogin}
                    >
                      Log in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Login;


