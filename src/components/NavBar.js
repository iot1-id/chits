import React, {useState} from "react";
import "../css/navbar.css"
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

function NavBar() {
    const [toggle, setToggle] = useState(false)
    let history = useHistory();
  return (
    <div >
      <nav >
        <div className="logo">Chit Funds</div>
        {/* <div className="content"> */}
        <ul
          className="nav-links"
          style={{ transform: toggle ? "translateX(0px)" : "" , float:"right"}}
        >
          {/* {if (user===admin){

        }} */}
          <li>
            <a href="/current">Current Groups</a>
          </li>
          <li>
            <a href="/">Create Group</a>
          </li>
          <li>
            <button
              
              className="btn-grad2"
              onClick={() => {
                auth.signOut().catch((e) => {
                  console.error("Sign Out Error", e);
                });
                history.push("/");
              }}
            >
                Signout
            </button>
          </li>
          {/* <li>
            <a>Signout</a>
          </li>
          <li>
            <a>Signout</a>
          </li> */}
        </ul>
        <i
          onClick={() => setToggle(!toggle)}
          className="fas fa-bars burger"
        ></i>
        {/* </div> */}
      </nav>
    </div>
  );
}

export default NavBar;
