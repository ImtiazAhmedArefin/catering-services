import React, { useEffect, useState } from 'react';
import axios from './component/axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    let datas={
      email:e.target.email.value,
      password:e.target.password.value
    };
    const formData = new FormData();
    for (const property in datas) {
      formData.append(property, datas[property])
    }
    try{
      let url='login.php';
      
      let response= await axios.post(url,formData );

      if(response.data.jwt){
          /* if you want, user will be logged in until they logout*/
          //localStorage.setItem("access_token", response.data.jwt);
          //localStorage.setItem("userdata", response.data.datas);
          /* if you want, user will be logged when they close the browser*/
          sessionStorage.setItem("access_token", response.data.jwt);
          sessionStorage.setItem("userdata", response.data.datas);
            window.location.href='/admin/dashboard';
        }else{
            alert(response.data.message);
        }
    } 
    catch(e){
      console.log(e);
    }
  }

 
  return (
    <section style={{backgroundColor: "#eee"}}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{borderRadius: "25px"}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="email">Your Email</label>
                          <input type="email" id="email" name="email" className="form-control" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="password">Password</label>
                          <input type="password" autocomplete="new-password" id="password" name="password" className="form-control" />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Login</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image"/>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
}


export default Login;
