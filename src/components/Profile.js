import React from 'react';
import { Container, Typography, Paper, Grid, Avatar, LinearProgress, List, ListItem, ListItemText } from '@mui/material';

function Profile({ user, userProgress, courses }) {
  const completedModules = userProgress?.completedModules || [];
  const totalModules = courses.reduce((total, course) => total + course.modules.length, 0);
  const completionPercentage = (completedModules.length / totalModules) * 100;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, bgcolor: user.color, mb: 2 }}>
              {user.name[0]}
            </Avatar>
            <Typography variant="h5" gutterBottom>{user.name}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Overall Progress</Typography>
            <LinearProgress variant="determinate" value={completionPercentage} sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {completionPercentage.toFixed(1)}% Complete ({completedModules.length} of {totalModules} modules)
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Course Progress</Typography>
            <List>
              {courses.map(course => {
                const courseTotalModules = course.modules.length;
                const courseCompletedModules = course.modules.filter(module => 
                  completedModules.includes(module.id)
                ).length;
                const courseProgress = (courseCompletedModules / courseTotalModules) * 100;

                return (
                  <ListItem key={course.id}>
                    <ListItemText 
                      primary={course.title}
                      secondary={
                        <React.Fragment>
                          <LinearProgress variant="determinate" value={courseProgress} sx={{ mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {courseProgress.toFixed(1)}% Complete ({courseCompletedModules} of {courseTotalModules} modules)
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;