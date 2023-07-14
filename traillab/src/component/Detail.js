import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Card, CardContent, CardMedia, Button } from '@mui/material';

function DetailPage() {
  const [Data, setData] = useState(null);
  const { id } = useParams();
  const baseURL = `https://64abc0fa9edb4181202e7661.mockapi.io/staffManagement/${id}`; // Replace with your API endpoint for individual player detail

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!Data) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Card>
        <CardMedia component="img" height="550" image={Data.avatar} alt={Data.name} style={{objectFit:'cover'}} />
        <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
           Name: {Data.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
           Address: {Data.address}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Age: {Data.age}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create Date: {Data.createdAt}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DetailPage;
