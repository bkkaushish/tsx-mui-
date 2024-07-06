import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import DepartmentList from '../components/Department';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }


const Home: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page');
      navigate('/');
    }
    else{
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 130 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={posts} columns={columns} autoPageSize />
      </div>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <DepartmentList />
    </Container>
  );
};

export default Home;