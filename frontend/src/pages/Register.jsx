import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_cnf: '',
  });

  const { name, email, password, password_cnf } = formData;

  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password_cnf) {
      toast.error('Passwords do not match');
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your name"
              required
              //   autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your email"
              required
              //   autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              className="form-control"
              placeholder="Enter password"
              required
              //   autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password_cnf"
              id="password_cnf"
              value={password_cnf}
              onChange={onChange}
              className="form-control"
              placeholder="Enter password again"
              required
              //   autoComplete="off"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
