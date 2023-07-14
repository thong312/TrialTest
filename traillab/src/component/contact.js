import React, { useState } from 'react';
import { Container, Typography, TextField, TextareaAutosize, Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styling for the form container
const FormContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
});

// Custom styling for the form
const StyledForm = styled('form')({
  width: '600px',
  textAlign: 'center',
});

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulating an asynchronous request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <Container style={{marginBottom:'135px', marginTop:'20px'}}>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit} style={{width:'100%'}}>
          <Typography variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize:'5rem'
            }}>
            Contact Us
          </Typography>
          <TextField
            id="name"
            name="name"
            label="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="phone"
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextareaAutosize
            id="message"
            name="message"
            label="Your Message"
            minRows={5}
            maxRows={10}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Enter your message here..."
            style={{ width: '100%', resize: 'none', marginBottom: '16px',height: '150px' }}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
        </StyledForm>
      </FormContainer>
    </Container>
  );
}
