import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect,useRef } from 'react';

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
    photo:null,
    email: '',
    contactno: '',
    oldpwd: '',
    newpwd: '',
    confirmpwd: ''
  });

  useEffect (()=>{
    const fetchemail = async()=>{
        try{
          const res = await axios.get('http://localhost:5000/fetchemail',{
            params: { username: uname }
          });
          setEmail(res.data);
        } catch(err){
          console.error(err);
        }
    }
    if(uname){
      fetchemail();
    }
  },[uname]);

   useEffect (()=>{
    const fetchcontact = async()=>{
        try{
          const res = await axios.get('http://localhost:5000/fetchcontact',{
            params: { username: uname }
          });
          setContact_no(res.data);
        } catch(err){
          console.error(err);
        }
    }
    if(uname){
      fetchcontact();
    }
  },[uname]);

  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = async(e) => {
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
      await axios.post('http://localhost:5000/api/uploadprofilepic', formDataToSend,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
    } catch(err){
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
  }

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
          console.log("Fetched username:", data.username);
          setUname(data.username);
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className='profile-page'>
        <div className='profile-pic'>
          <div className='profile-photo'>
            {uname && (<img
                  src={`http://localhost:5000/api/imaging/${uname}`} 
                  alt = ""
                  style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                />)}
              <button onClick = {handleClick} className="icon-btn">
              <FontAwesomeIcon icon={faCamera} />
            </button>
             <input type = "file" ref = {fileInputRef} onChange={handleFileChange} style={{display: 'none'}} accept = "image/*"></input>
          </div>
          <div>
            
          </div>
          

        </div>
        <div className='profile-info'>
          <div className='profile-heading'><b>Edit Profile</b></div>
          <br></br><br></br>
          <label><b>Username:    </b>{uname}</label>
          <br></br><br></br>
          <div className='uname-label'>
            <div className='cont-info'><b>Contact Number:     </b> {contact_no}
            {contactedit ? (<div><input name='contactno' onChange={handleChange} className='edit-email'></input><button onClick={handleContact}>save</button></div>) : (formdata.contactno)}
            {showicon ? (<div><button onClick={handlecontactno} className='uname-btn'><FontAwesomeIcon icon={faPencilAlt} /></button></div>) : (null)}
            </div><br></br><br></br>
            <div className='cont-info'><b>emailid:    </b>{email}
            {editable ? (<div><input name='email' onChange={handleChange} className='edit-email'></input><button onClick={handleEmail}>save</button></div>) : (null)}
            {showicon2 ? (<div><button onClick={handleEdit} className='uname-btn'><FontAwesomeIcon icon={faPencilAlt} /></button></div>) : (null)}
            </div><br></br><br></br>
          </div>
          <div className='change-pwd'>
            <label><b>Change password?</b></label><br></br>
            {showicon3 ? (<button onClick={handlePwd} className='change-password'><FontAwesomeIcon icon={faPencilAlt} /></button>):(null)}
            
            {pwd ? (<div className='style-pwd'><form onSubmit={handleSubmit} >
              <label>old password</label><br></br>
              <input name='oldpwd' onChange={handleChange} type='password'></input><br></br>
              <label>new password</label><br></br>
              <input name='newpwd' onChange={handleChange} type='password'></input> <br></br>
              <label>confirm new password</label><br></br>
              <input name='confirmpwd' onChange={handleChange} type='password'></input><br></br>
              <button type='submit' className='btn'>Change</button>
            </form></div>) : (null)}

          </div>

        </div>
      </div>
    </>
  )
}