import React from 'react'

const Register = () => {
    return (
        <div className="container-fluid-0">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form className="row g-3 needs-validation" noValidate>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label">First name</label>
                            <input type="text" className="form-control" id="validationCustom01" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="validationCustom02" required />
                            <div className="valid-feedback">
                                Looks good!
                         </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustomUsername" className="form-label">Username</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                                <div className="invalid-feedback">
                                    Please choose a username.
                         </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom03" className="form-label">Email</label>
                            <input type="email" className="form-control" id="validationCustom03" required />
                            <div className="invalid-feedback">
                                Please provide a valid email.
                       </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom04" className="form-label">Password</label>
                            <input type="password" className="form-control" id="validationCustom03" required />
                            <div className="invalid-feedback">
                                Please select a valid state.
                       </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationCustom05" className="form-label">ID</label>
                            <input type="text" className="form-control" id="validationCustom05" required />
                            <div className="invalid-feedback">
                                Please provide a valid ID.
                        </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">Submit form</button>
                        </div>
                    </form>
                </div>
                <div className="col-3"></div>

            </div>

        </div>

    )

}

export default Register
