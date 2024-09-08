import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { ChromePicker } from 'react-color';

function Auth({ users, onAddUser, onSelectUser }) {
  const [newUserName, setNewUserName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleAddUser = () => {
    if (newUserName.trim()) {
      onAddUser(newUserName.trim(), selectedColor);
      setNewUserName('');
      setSelectedColor('#000000');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Training App Authentication
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="New Username"
            name="username"
            autoFocus
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <ChromePicker
            color={selectedColor}
            onChange={(color) => setSelectedColor(color.hex)}
            disableAlpha
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddUser}
          >
            Add New User
          </Button>
        </Box>
        <Typography component="h2" variant="h6" sx={{ mt: 4 }}>
          Select Existing User
        </Typography>
        <List sx={{ width: '100%' }}>
          {users.map((user) => (
            <ListItem key={user.id} button onClick={() => onSelectUser(user)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: user.color }}>{user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Auth;