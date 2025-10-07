import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

export default function Profile() {
  const [uname, setUname] = useState('');
  const [contact_no, setContact_no] = useState('');
  const [email, setEmail] = useState('');
  const [contactedit, setContactedit] = useState(false);
  const [editable, setEditable] = useState(false);
  const [pwd, setPwd] = useState(false);
  const [showicon, setShowicon] = useState(true);
  const [showicon2, setShowicon2] = useState(true);
  const [showicon3, setShowicon3] = useState(true);
  const [formdata, setFormdata] = useState({
    photo: null,
    email: '',
    contactno: '',
    oldpwd: '',
    newpwd: '',
    confirmpwd: ''
  });

  useEffect(() => {
    const fetchemail = async () => {
      try {
        const res = await axios.get('http://localhost:5000/fetchemail', {
          params: { username: uname }
        });
        setEmail(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (uname) {
      fetchemail();
    }
  }, [uname]);

  useEffect(() => {
    const fetchcontact = async () => {
      try {
        const res = await axios.get('http://localhost:5000/fetchcontact', {
          params: { username: uname }
        });
        setContact_no(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (uname) {
      fetchcontact();
    }
  }, [uname]);

  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    //console.log('File input changed');
    const file = e.target.files[0];
    //console.log('Selected file:', file);
    const previewUrl = URL.createObjectURL(file);

    setFormdata((prevData) => ({
      ...prevData,
      photo: file,
      preview: previewUrl
    }));
    const formDataToSend = new FormData();
    formDataToSend.append("username", uname);
    formDataToSend.append("photo", file);
    try {
      await axios.post('http://localhost:5000/api/uploadprofilepic', formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    } catch (err) {
      console.error(err);
    }

  };

  const handlecontactno = () => {
    setContactedit(true);
    setShowicon(false);
  }
  const handleEdit = () => {
    setEditable(true);
    setShowicon2(false);
  };

  const handlePwd = () => {
    setPwd(true);
    setShowicon3(false);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContact = async (event) => {
    event.preventDefault();
    setContactedit(false);
    setShowicon(true);
    try {
      await axios.post('http://localhost:5000/api/changecontact', {
        username: uname,
        cont_no: formdata.contactno
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmail = async (event) => {
    event.preventDefault();
    setEditable(false);
    setShowicon2(true);
    try {
      await axios.post('http://localhost:5000/api/addemail', {
        username: uname,
        emailid: formdata.email
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPwd(false);
    setShowicon3(true);
    if (!formdata.oldpwd || !formdata.newpwd || !formdata.confirmpwd) {
    alert("Please fill in all fields before submitting.");
    return; 
  }
    try {
      const res = await axios.post('http://localhost:5000/api/oldpwdmatch', {
        username: uname,
        oldpwd: formdata.oldpwd
      });
      if (res.data.message === 'username and old password matched') {
        if (formdata.newpwd === formdata.confirmpwd) {
          await axios.post('http://localhost:5000/api/addnewpwd', {
            username: uname,
            newpwd: formdata.newpwd
          })
        } else {
          alert("passwords didn't match!");
        }
      } else {
        alert("original password didn't match!");
      }
    }
    catch (err) {
      console.error(err);
    }
    alert('Password Changed Successfully!');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {

          if (!res.ok) {
            throw new Error("Failed to fetch profile");
          }
          return res.json();
        })
        .then((data) => {
          setUname(data.username);
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="profile-page">
        {/* Profile Photo Section */}
        <div className="profile-photo-container">
          {uname ? (
            <img
              src={`http://localhost:5000/api/imaging/${uname}`}
              alt="profile"
              className="profile-pic"
            />
          ) : (
            <div className="profile-placeholder">+</div>  // optional placeholder
          )}

          <button onClick={handleClick} className="camera-btn">
            <FontAwesomeIcon icon={faCamera} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>



        {/* Profile Info Section */}
        <div className="profile-info">
          <h3 className="profile-heading">Edit Profile</h3>

          {/* Username */}
          <div className="info-row">
            <div className="label">Username</div>
            <div className="value">{uname}</div>
          </div>

          {/* Contact Number */}
          <div className="info-row">
            <div className="label">Contact Number</div>
            <div className="value">
              {contactedit ? (
                <div className="edit-wrapper">
                  <input
                    name="contactno"
                    onChange={handleChange}
                    className="edit-input"
                    defaultValue={contact_no}
                  />
                  <button onClick={handleContact} className="save-btn">
                    Save
                  </button>
                </div>
              ) : (
                formdata.contactno || contact_no
              )}
            </div>
            {showicon && (
              <div className="edit">
                <button onClick={handlecontactno} className="edit-btn">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="info-row">
            <div className="label">Email</div>
            <div className="value">
              {editable ? (
                <div className="edit-wrapper">
                  <input
                    name="email"
                    onChange={handleChange}
                    className="edit-input"
                    defaultValue={email}
                  />
                  <button onClick={handleEmail} className="save-btn">
                    Save
                  </button>
                </div>
              ) : (
                email
              )}
            </div>
            {showicon2 && (
              <div className="edit">
                <button onClick={handleEdit} className="edit-btn">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="info-row">
            <div className="label">Change Password</div>
            <div className="value">
              {pwd ? (
                <form onSubmit={handleSubmit} className="pwd-form">
                  <input
                    name="oldpwd"
                    onChange={handleChange}
                    type="password"
                    placeholder="Old password"
                    className="edit-input"
                  />
                  <input
                    name="newpwd"
                    onChange={handleChange}
                    type="password"
                    placeholder="New password"
                    className="edit-input"
                  />
                  <input
                    name="confirmpwd"
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm password"
                    className="edit-input"
                  />
                  <button type="submit" className="save-btn">
                    Change
                  </button>
                </form>
              ) : (
                ''
              )}
            </div>
            {showicon3 && (
              <div className="edit">
                <button onClick={handlePwd} className="edit-btn">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  )
}