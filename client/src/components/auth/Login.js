import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext"
import Axios from "axios";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [idnumber, setId] = useState("");
    const [error, setError] = useState("");
    const [status, setStatusBase] = useState("");

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        console.log(props.userData);
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        try {
            if (email && password && idnumber) {
                const loginUser = { email, password, idnumber };
                const loginRes = await Axios.post("/users/login", loginUser);
                props.setUserData({
                    token: loginRes.data.token,
                    user: loginRes.data.user,
                });

                localStorage.setItem("auth-token", loginRes.data.token);
                history.push("/calendar");
            } else {
                setStatusBase({
                    msg: "Error - Email && Password\n cannot be empty",
                    key: Math.random(),
                });
            }
        } catch (err) {
            err.response.msg && setError(err.response.msg);
        }
    };
    return (
        <div className="container-fluid-0">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form className="row g-3 needs-validation" noValidate>

                        <div className="col-md-4">
                            <label htmlFor="validationCustomUsername" className="form-label">Username</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required onChange={(e) => setUserName(e.target.value)} />
                                <div className="invalid-feedback">
                                    Please choose a username.
                         </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="validationCustom04" className="form-label">Password</label>
                            <input type="password" className="form-control" id="validationCustom03" required onChange={(e) => setPassword(e.target.value)} />
                            <div className="invalid-feedback">
                                Please select a valid state.
                       </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom05" className="form-label">ID</label>
                            <input type="text" className="form-control" id="validationCustom05" required onChange={(e) => setId(e.target.value)} />
                            <div className="invalid-feedback">
                                Please provide a valid ID.
                        </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom05" className="form-label">Email</label>
                            <input type="email" className="form-control" id="validationCustom05" required onChange={(e) => setEmail(e.target.value)} />
                            <div className="invalid-feedback">
                                Please provide a valid email.
                        </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit" onClick={submit}>Submit form</button>
                        </div>
                    </form>
                </div>
                <div className="col-3"></div>

            </div>
        </div>

    )
}

export default Login
