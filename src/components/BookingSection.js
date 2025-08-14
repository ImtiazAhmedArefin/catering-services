// src/components/BookingSection.js
import React, { useState } from "react";
import axios from "axios";

export default function BookingSection() {
  const [form, setForm] = useState({
    country: "",
    city: "",
    palace: "",
    event_type: "",
    palace_count: "",
    menu_type: "",
    contact_no: "",
    event_date: "",
    email: ""
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await axios.post(
        "http://localhost/catering-api/booking_add.php",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 1) {
        setMessage({
          type: "success",
          text: `Booking successful! Your booking ID is ${res.data.id}.`
        });
        setForm({
          country: "",
          city: "",
          palace: "",
          event_type: "",
          palace_count: "",
          menu_type: "",
          contact_no: "",
          event_date: "",
          email: ""
        });
      } else {
        const err = res.data.errors
          ? res.data.errors.join(" ")
          : res.data.error || "Submission failed.";
        setMessage({ type: "error", text: err });
      }
    } catch (err) {
      let text = err.message;
      if (err.response?.data) {
        const d = err.response.data;
        text = d.errors
          ? d.errors.join(" ")
          : d.error || JSON.stringify(d);
      }
      setMessage({ type: "error", text });
    }
  };

  return (
    <div className="container-fluid contact py-6 wow bounceInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-0">
          {/* left image */}
          <div className="col-1">
            <img
              src="/assets/img/background-site.jpg"
              className="img-fluid h-100 w-100 rounded-start"
              style={{ objectFit: "cover", opacity: 0.7 }}
              alt=""
            />
          </div>

          {/* form column */}
          <div className="col-10">
            <div className="border-bottom border-top border-primary bg-light py-5 px-4">
              <div className="text-center">
                <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                  Book Us
                </small>
                <h1 className="display-5 mb-5">Where you want Our Services</h1>
              </div>

              {message && (
                <div
                  className={
                    message.type === "error"
                      ? "alert alert-danger"
                      : "alert alert-success"
                  }
                  role="alert"
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-4 form">
                  {/** Country **/}
                  <div className="col-lg-4 col-md-6">
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="form-select border-primary p-2"
                    >
                      <option value="">Select Country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                  {/** City **/}
                  <div className="col-lg-4 col-md-6">
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="form-select border-primary p-2"
                    >
                      <option value="">Select City</option>
                      <option value="New York">New York</option>
                      <option value="London">London</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                  </div>
                  {/** Palace **/}
                  <div className="col-lg-4 col-md-6">
                    <select
                      name="palace"
                      value={form.palace}
                      onChange={handleChange}
                      className="form-select border-primary p-2"
                    >
                      <option value="">Select Palace</option>
                      <option value="Palace A">Palace A</option>
                      <option value="Palace B">Palace B</option>
                      <option value="Palace C">Palace C</option>
                    </select>
                  </div>
                  {/** Event Type **/}
                  <div className="col-lg-4 col-md-6">
                    <select
                      name="event_type"
                      value={form.event_type}
                      onChange={handleChange}
                      className="form-select border-primary p-2"
                    >
                      <option value="">Select Event Type</option>
                      <option value="Small Event">Small Event</option>
                      <option value="Big Event">Big Event</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                  {/** No. Of Palace **/}
                  <div className="col-lg-4 col-md-6">
                    <select
                      name="palace_count"
                      value={form.palace_count}
                      onChange={handleChange}
                      className="form-select border-primary p-2"
                    >
                      <option value="">No. Of Palace</option>
                      <option value="100-200">100-200</option>
                      <option value="300-400">300-400</option>
                      <option value="500-600">500-600</option>
                      <option value="700-800">700-800</option>
                      <option value="900-1000">900-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                  {/** Menu Type **/}
                  <div className="col-lg-4 col-md-6">
                    <select
                      name="menu_type"
                      value={form.menu_type}
                      onChange={handleChange}
                      className="form-select border-primary p-2"
                    >
                      <option value="">Select Menu Type</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non Vegetarian">Non Vegetarian</option>
                    </select>
                  </div>
                  {/** Contact No **/}
                  <div className="col-lg-4 col-md-6">
                    <input
                      type="text"
                      name="contact_no"
                      value={form.contact_no}
                      onChange={handleChange}
                      className="form-control border-primary p-2"
                      placeholder="Your Contact No."
                    />
                  </div>
                  {/** Event Date **/}
                  <div className="col-lg-4 col-md-6">
                    <input
                      type="date"
                      name="event_date"
                      value={form.event_date}
                      onChange={handleChange}
                      className="form-control border-primary p-2"
                      placeholder="Select Date"
                    />
                  </div>
                  {/** Email **/}
                  <div className="col-lg-4 col-md-6">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control border-primary p-2"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  {/** Submit **/}
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-3 rounded-pill"
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* right image */}
          <div className="col-1">
            <img
              src="/assets/img/background-site.jpg"
              className="img-fluid h-100 w-100 rounded-end"
              style={{ objectFit: "cover", opacity: 0.7 }}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
