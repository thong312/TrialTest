import React, { useEffect, useState } from 'react';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
function Dashboard() {
  const baseURL = 'https://64abc0fa9edb4181202e7661.mockapi.io/staffManagement';
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    avatar: '',
    age: '',
    createdAt: '',
    address: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`${baseURL}/${deleteId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        // Remove the item from the data array
        setData(data.filter((item) => item.id !== deleteId));
        setDeleteId(null);
        setConfirmDialogOpen(false);
        setSuccessMessage('Item deleted successfully!');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setConfirmDialogOpen(false);
  };

  const handleEdit = (id, initialData) => {
    setEditId(id);
    setEditData(initialData);
  };

  const handleSave = () => {
    fetch(`${baseURL}/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        // Update the item in the data array
        setData(data.map((item) => (item.id === editId ? editData : item)));
        setEditId(null);
        setEditData({
          name: '',
          avatar: '',
          age: '',
          createdAt: '',
          address: '',
        });
        setSuccessMessage('Item updated successfully!');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({
      name: '',
      avatar: '',
      age: '',
      createdAt: '',
      address: '',
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <Card sx={{ backgroundColor: '#f5f5f5', padding: '1rem' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Dashboard
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {editId === item.id ? (
                    <TextField name="name" value={editData.name} onChange={handleEditChange} fullWidth />
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell>
                  {editId === item.id ? (
                    <TextField name="avatar" value={editData.avatar} onChange={handleEditChange} fullWidth />
                  ) : (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {editId === item.id ? (
                    <TextField name="age" value={editData.age} onChange={handleEditChange} fullWidth />
                  ) : (
                    item.age
                  )}
                </TableCell>
                <TableCell>
                  {editId === item.id ? (
                    <TextField name="createdAt" value={editData.createdAt} onChange={handleEditChange} fullWidth />
                  ) : (
                    item.createdAt
                  )}
                </TableCell>
                <TableCell>
                  {editId === item.id ? (
                    <TextField name="address" value={editData.address} onChange={handleEditChange} fullWidth />
                  ) : (
                    item.address
                  )}
                </TableCell>
                <TableCell>
                  {editId === item.id ? (
                    <div>
                      <IconButton aria-label="save" onClick={handleSave}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton aria-label="cancel" onClick={handleCancelEdit}>
                        <Button variant="contained" color="secondary">
                          Cancel
                        </Button>
                      </IconButton>
                    </div>
                  ) : (
                    <IconButton aria-label="edit" onClick={() => handleEdit(item.id, item)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </Card>
  );
}

export default Dashboard;
