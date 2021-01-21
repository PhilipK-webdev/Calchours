import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext"
const Register = (props) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [idnumber, setId] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                email,
                password,
                passwordCheck,
                userName,
                firstName,
                lastName,
                idnumber
            };

            const userResponse = await Axios.post("/users/register", newUser);
            const loginRes = await Axios.post("/users/login", {
                email: userResponse.data.email,
                password: newUser.password,
                idnumber: newUser.idnumber,
            });
            setUserData({ token: loginRes.data.token, user: loginRes.data.user });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/calendar");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container-fluid-0">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form className="row g-3 needs-validation" noValidate>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label">First name</label>
                            <input type="text" className="form-control" id="validationCustom01" required onChange={(e) => setFirstName(e.target.value)} />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="validationCustom02" required onChange={(e) => setLastName(e.target.value)} />
                            <div className="valid-feedback">
                                Looks good!
                         </div>
                        </div>
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
                        <div className="col-md-6">
                            <label htmlFor="validationCustom03" className="form-label">Email</label>
                            <input type="email" className="form-control" id="validationCustom03" required onChange={(e) => setEmail(e.target.value)} />
                            <div className="invalid-feedback">
                                Please provide a valid email.
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
                            <label htmlFor="validationCustom04" className="form-label">PasswordCheck</label>
                            <input type="password" className="form-control" id="validationCustom03" required onChange={(e) => setPasswordCheck(e.target.value)} />
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

export default Register
