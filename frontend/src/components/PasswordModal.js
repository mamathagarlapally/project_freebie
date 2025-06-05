import React, { useState } from 'react';

export default function PasswordModal({ isOpen, onClose, onSubmit }) {
  //const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }
    setError('');
    // Pass data back to parent or handle submit here
    onSubmit({newPassword, confirmPassword });
  };

  return (
    <div className="unique-overlaying">
  <div className="unique-modal-pwd">
    <h2>Change Password</h2>


    <label>
      New Password:
      <input
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        className="unique-input"
      />
    </label>

    <label>
      Confirm New Password:
      <input
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="unique-input"
      />
    </label>

    {error && <p style={{ color: 'red' }}>{error}</p>}

    <div className="unique-buttons">
      <button className='unique-submit' onClick={handleSubmit}>Submit</button>
      <button  className = 'unique-submit' onClick={onClose} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </div>
  </div>
</div>

  );
}


