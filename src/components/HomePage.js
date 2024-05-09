import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import PeopleIcon from '@mui/icons-material/People';
import './HomePage.css';
import HistoryPage from './HistoryPage';
import FarmerPage from './FarmerPage';
import AddNews from './AddNews';
import HomeView from './HomeView';
import AddReportForm from './AddReportForm';
import ProfilePage from './ProfilePage';

function HomePage() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    location: '',
    datetime: '',
    cropType: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "news"), {
        ...formData,
        datetime: new Date(formData.datetime)
      });
      alert('News added successfully!');
      setOpenDialog(false);
      setFormData({
        title: '',
        body: '',
        location: '',
        datetime: '',
        cropType: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error submitting news.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'home':
        return <ProfilePage/>
      case 'farmer':
        return <FarmerPage />;
      case 'history':
        return <HistoryPage />;
        case 'Report':
          return <AddReportForm/>
      case 'news':
        return <AddNews/> 
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="home-container">
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button onClick={() => setSelectedPage('home')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button onClick={() => setSelectedPage('farmer')}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Farmer" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('history')}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>

          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('news')}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="Add news" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('homeview')}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="homeview" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('Report')}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="Add Report" />
          </ListItem>
          
        </List>
      </Drawer>
      <div className="content-area">
        {renderPageContent()}
      </div>
      <Fab color="primary" aria-label="add" className="fab-button" style={{ position: 'absolute', right: 20, bottom: 20 }} onClick={() => setOpenDialog(true)}>
        <AddIcon />
      </Fab>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add News</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="title" label="Title" type="text" fullWidth variant="standard" value={formData.title} onChange={handleInputChange} />
          <TextField margin="dense" name="body" label="Body" type="text" fullWidth multiline maxRows={4} variant="standard" value={formData.body} onChange={handleInputChange} />
          <TextField margin="dense" name="location" label="Location" type="text" fullWidth variant="standard" value={formData.location} onChange={handleInputChange} />
          <TextField margin="dense" name="datetime" label="Date and Time" type="datetime-local" fullWidth variant="standard" InputLabelProps={{ shrink: true, }} value={formData.datetime} onChange={handleInputChange} />
          <TextField margin="dense" name="cropType" label="Crop Type" type="text" fullWidth variant="standard" value={formData.cropType} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomePage;
