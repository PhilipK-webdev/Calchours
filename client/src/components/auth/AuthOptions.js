import React, { useContext } from "react";
import MyButton from "../button/MyButton";
// import { useHistory } from "react-router-dom";
// import UserContext from "../../context/UserContext";

export default function AuthOptions() {
    // const { userData, setUserData } = useContext(UserContext);

    // const history = useHistory();

    // const register = () => history.push("/register");
    // const login = () => history.push("/login");
    // const logout = () => {
    //     setUserData({ token: undefined, user: undefined });
    //     localStorage.setItem("auth-token", "");
    //     history.push("/")
    // };


    // For the future-add true/false variable to send to MyButton , what name to have 
    return (
        <nav className="navbar">
            <div className="container-fluid pt-0">
                <MyButton />
            </div>
        </nav>
    );
}
