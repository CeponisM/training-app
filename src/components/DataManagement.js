import React from 'react';
import { Container, Typography, Paper, Button, Grid } from '@mui/material';

function DataManagement({ users, courses, userProgress }) {
  const handleExport = () => {
    const data = {
      users,
      courses,
      userProgress
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'training_app_backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          localStorage.setItem('users', JSON.stringify(data.users));
          localStorage.setItem('courses', JSON.stringify(data.courses));
          localStorage.setItem('userProgress', JSON.stringify(data.userProgress));
          alert('Data imported successfully. Please refresh the page.');
        } catch (error) {
          alert('Error importing data. Please try again.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Data Management</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Export Data</Typography>
            <Button variant="contained" onClick={handleExport}>
              Export Backup
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Import Data</Typography>
            <input
              accept=".json"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImport}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Import Backup
              </Button>
            </label>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DataManagement;