import React, {useEffect,
  useReducer,
  useRef,
  useState,
  useContext,
} from "react";
import "./Login.css";
import AuthContext from "../../contex/AuthProvider";
import axios from "axios";

export const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleMyLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/authenticate`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status == 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <div>
          <div className="container">
            <section className="text-center text-lg-start">
              <div className="card shadow mb-3">
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-lg-4 d-none d-lg-flex">
                    <img
                      src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                      alt="Trendy Pants and Shoes"
                      className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 card-img-top"
                    />
                  </div>
                  <div className="col-lg-8">
                    <div className="card-body py-5 px-md-5">
                      <form onSubmit={handleMyLogin}>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example1">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="form2Example1"
                            className="form-control"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example2">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example2"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                          />
                        </div>
                        <button
                          onClick={handleMyLogin}
                          className="btn btn-primary btn-block mb-4"
                        >
                          Sign in
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
