import React from "react";
import './NavBar.css';

const NavBar = ({ user }) => {
  if (user.role === "ADMIN") {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
            Welcome {user.username}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href={`/admindashboard/${user.username}/${user.role}/${user.token}`}
                  >
                    Bank
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={`/customer/${user.username}/${user.role}/${user.token}`}
                  >
                    Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={`/accounts/${user.username}/${user.role}/${user.token}`}
                  >
                    Accounts
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={`/logout`}>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Welcome {user.username}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href={`/userdashboard/${user.username}/${user.role}/${user.token}/${user.userId}`}
                >
                  Account
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={`/transaction/${user.username}/${user.role}/${user.token}/${user.userId}`}
                >
                  Transaction
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/logout`}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
