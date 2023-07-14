import React, { useState } from 'react';
import { TextField, Button, Card, Snackbar, Alert } from '@mui/material';

function Add() {
  const baseURL = 'https://64abc0fa9edb4181202e7661.mockapi.io/staffManagement';
  const [createdAt, setCreatedAt] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      createdAt: createdAt,
      name: name,
      avatar: avatar,
      age: age,
      address: address
    };

    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        setOpenSnackbar(true); // Show success popup
        // Handle success here
      })
      .catch((error) => {
        console.log(error.message);
        // Handle error here
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Hide success popup
  };

  return (
    <Card sx={{ backgroundColor: '#f5f5f5', padding: '1rem', marginBottom: '45px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          name="createdAt"
          label="createdAt"
          type="text"
          fullWidth
          variant="standard"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
        <TextField
          margin="dense"
          name="name"
          label="name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          name="avatar"
          label="avatar"
          type="text"
          fullWidth
          variant="standard"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <TextField
          margin="dense"
          name="age"
          label="Age"
          type="text"
          fullWidth
          variant="standard"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          margin="dense"
          name="address"
          label="address"
          type="text"
          fullWidth
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <Button variant="contained" size="small" type="submit" style={{ width: '150px' }}>
          Add
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Adding successful!
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default Add;
