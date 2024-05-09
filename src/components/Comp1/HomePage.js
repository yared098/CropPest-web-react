import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const pages = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];

function HomePage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const renderPage = (pageIndex) => {
    return (
      <div>
        <Typography variant="h4" component="h2" gutterBottom>
          {pages[pageIndex]}
        </Typography>
        <Typography>
          Content for {pages[pageIndex]}
        </Typography>
      </div>
    );
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            React Drawer App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {pages.map((text, index) => (
            <ListItem button key={text} onClick={() => {
              setDrawerOpen(false); // close the drawer when a page is selected
              console.log(`Navigating to ${text}`);
            }}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* Example of rendering pages */}
      {renderPage(0)}  {/* You might want to update this based on actual navigation logic */}
    </div>
  );
}

export default HomePage;
