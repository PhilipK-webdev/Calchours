import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Button from 'react-bootstrap/Button'
import ButtonGroup from "react-bootstrap/ButtonGroup"
export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({ token: undefined, user: undefined });
        localStorage.setItem("auth-token", "");
        history.push("/")
    };

    return (
        <nav className="navbar">
            <div className="container-fluid pt-0">
                <ButtonGroup>
                    {userData.user ? (
                        <Button


                            color="primary"
                            onClick={logout}
                        >
                            LOGOUT
                        </Button>
                    ) : (
                            <>
                                <Button

                                    color="primary"
                                    onClick={register}
                                >
                                    REGISTER
            </Button>
                                <Button

                                    color="primary"
                                    onClick={login}
                                >
                                    LOGIN
            </Button>
                            </>
                        )}
                </ButtonGroup>
            </div>
        </nav >
    );
}
