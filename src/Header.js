import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MenuIcon from '@mui/icons-material/Menu';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import Button from 'react-bootstrap/Button';
import logo from './images/logo.png'
import { Avatar, FormControl } from '@mui/material';
import MicNoneSharpIcon from '@mui/icons-material/MicNoneSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import './css/header.css'
import axios from 'axios';
import { useDefaultContext } from "./content/DefaultContext";
import { Link } from "react-router-dom";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'

const Header = () => {
  const [show, setShow] = useState(false);
  const [signupdis, setSignupShow] = useState(false)
  const [loginStatus, setLoginStatus] = useState()
  const [user, setUser] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const signupClose = () => setSignupShow(false)
  const signupShow = () => setSignupShow(true)
  const apiKey = "AIzaSyBSss1seVF8vXxYeTHBamdwfDcHTOSXWMI"
  const { setSearchResults } = useDefaultContext();
  const { mainUser, setMainUser } = useDefaultContext();
  const search = async () => {
    let srch = document.querySelector(".searchVal")
    if (srch.value.length > 0) {
      const response = await axios.get("http://localhost/getsearchvideos.php?srch=" + srch.value)
      setSearchResults(response.data);
    }
  }

  const signin = async () => {
    setLoginStatus("")
    let email = document.querySelector(".signinEmail")
    let password = document.querySelector(".signinPassword")
    const res = await axios.get("http://localhost/login.php?email=" + email.value + "&password=" + password.value)
    if (res && res.data.data) {
      if (res.data.data) {
        setUser(res.data.data[0])
        setMainUser(res.data.data[0].email)
        console.log(res.data.data[0])
      }
      handleClose()
    } else {
      setLoginStatus(res.data.status)
      console.log(res.data.error)
    }
  }
  let signup = async () => {
    let first_name = document.querySelector(".signupFirstName").value;
    let last_name = document.querySelector(".signupLastName").value;
    let email = document.querySelector(".signupEmail").value;
    let phn_no = document.querySelector(".signupPhone").value;
    let password = document.querySelector(".signupPassword").value;
    let confirm_Password = document.querySelector(".signupConfirmPassword").value;

    if (password !== confirm_Password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost/signupuser.php?fname=${first_name}&lname=${last_name}&email=${email}&phn=${phn_no}&passwd=${password}`
      );
      if (res.data && res.data.data.email) {
        signupClose();
        setUser(res.data.data)
        setMainUser(res.data.data.email)
        console.log(res.data.data);
      }
      else {
        setLoginStatus(res.data.status)

      }
    } catch (err) {
      console.error(err);
    }
  };

  let logout = () => {
    setUser()
    setMainUser()
    setSearchResults()
  }
  const deleteAccount = async () => {
    let res = await axios.get("http://localhost/deleteuser.php?email=" + mainUser)
    if (res.data) {
      console.log(res.data)
      setUser()
      setMainUser()
      setSearchResults()
    }
  }


  return (
    <>
      <Navbar fixed="top" bg='white' className='py-1 border border-bottom  ' style={{ height: "3.4rem" }}>
        <MenuIcon className='ms-2' />
        <Link to={"/"}><Navbar.Brand className="mx-3 mt-0 d-flex align-items-center gap-3">
          <img src={logo} />
        </Navbar.Brand></Link>
        <InputGroup className="searchBar rounded-pill mx-auto">
          <Form.Control
            onChange={search}
            placeholder="Search"
            className="border-end-0 searchVal rounded-start-pill"
          />
          <Link onClick={search} to={"/"} className='h-100 py-0 mb-0'><InputGroup.Text id="basic-addon2" className='rounded-end-pill mb-0'><SearchIcon /></InputGroup.Text></Link>
          <Avatar className="ms-2 overflow-hidden rounded-circle">
            <MicNoneSharpIcon />
          </Avatar>
        </InputGroup>

        <div className="mx-3 d-flex align-items-center">
          <Button variant="outline-primary" className='rounded-pill' size="sm" onClick={handleShow}>
            <AccountCircleSharpIcon></AccountCircleSharpIcon>{user ? user.first_name : "Sign in"}
          </Button>
        </div>
      </Navbar>
      <hr></hr>
      {user ? <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome {user.first_name} {user.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <h5>Email : {user.email}</h5>
          <h5>Phone no : {user.phone}</h5>
          <p className='text-danger w-75 mx-auto mb-0 mt-1'>{loginStatus}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => logout()}>
            Logout
          </Button>
          <Button variant="danger" onClick={() => deleteAccount()}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal> : <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => {
          e.preventDefault();
          signin();
        }}>
          <Modal.Header closeButton>
            <Modal.Title>Signin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="d-flex flex-column w-75 mx-auto mb-3 ">
              <Form.Control
                type='email'
                placeholder="Email"
                className="w-100 signinEmail"
                required
              />
            </InputGroup>
            <InputGroup className="d-flex flex-column w-75 mx-auto outline-none">
              <Form.Control
                type='password'
                placeholder="Password"
                className="w-100 signinPassword"
                required
              />
            </InputGroup>
            <p className='text-danger w-75 mx-auto mb-0 mt-1'>{loginStatus}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { handleClose(); signupShow() }}>
              SignUp
            </Button>
            <Button variant="primary" type='subimit' >
              Signin
            </Button>
          </Modal.Footer>
        </Form>
      </Modal >}

      <Modal show={signupdis} onHide={signupClose}>
        <Form onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup className="d-flex flex-column w-75 mx-auto mb-3 ">
              <Form.Control
                type="text"
                placeholder="First Name"
                className="w-100 signupFirstName"
                required
              />
            </InputGroup>

            <InputGroup className="d-flex flex-column w-75 mx-auto outline-none mb-3">
              <Form.Control
                type="text"
                placeholder="Last Name"
                className="w-100 signupLastName"
                required
              />
            </InputGroup>

            <InputGroup className="d-flex flex-column w-75 mx-auto mb-3 ">
              <Form.Control
                type="email"
                placeholder="E mail"
                className="w-100 signupEmail"
                required
              />
            </InputGroup>

            <InputGroup className="d-flex flex-column w-75 mx-auto mb-3 ">
              <Form.Control
                type="tel"
                placeholder="Phone"
                className="w-100 signupPhone"
                required
                pattern="[0-9]{10}"
                inputMode="numeric"
                maxLength={10}
                title="Phone number must be exactly 10 digits"
              />

            </InputGroup>

            <InputGroup className="d-flex flex-column w-75 mx-auto outline-none mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="w-100 signupPassword"
                minLength={8}
                required
              />
            </InputGroup>

            <InputGroup className="d-flex flex-column w-75 mx-auto outline-none mb-2">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className="w-100 signupConfirmPassword"
                minLength={8}
                required
              />
            </InputGroup>

            <p className="text-danger w-75 mx-auto mb-0 mt-1">{/* Errors show here if needed */}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                signupClose();
                handleShow();
              }}
            >
              Signin
            </Button>

            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </>
  )
}

export default Header
