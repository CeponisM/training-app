import React from 'react';
import { Container, Typography, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, LinearProgress } from '@mui/material';
import { EmojiEvents, Star, TrendingUp } from '@mui/icons-material';

function Gamification({ user, userProgress, courses }) {
  const completedModules = userProgress?.completedModules || [];
  const totalModules = courses.reduce((total, course) => total + course.modules.length, 0);
  const completionPercentage = (completedModules.length / totalModules) * 100;

  const calculateLevel = () => Math.floor(completedModules.length / 5) + 1;

  const achievements = [
    { 
      name: 'Getting Started', 
      description: 'Complete your first module', 
      achieved: completedModules.length > 0,
      icon: <Star />
    },
    { 
      name: 'Fast Learner', 
      description: 'Complete 10 modules', 
      achieved: completedModules.length >= 10,
      icon: <TrendingUp />
    },
    { 
      name: 'Course Master', 
      description: 'Complete all modules in a course', 
      achieved: courses.some(course => 
        course.modules.every(module => completedModules.includes(module.id))
      ),
      icon: <EmojiEvents />
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Your Progress</Typography>
            <Typography variant="h4" gutterBottom>Level {calculateLevel()}</Typography>
            <LinearProgress variant="determinate" value={completionPercentage} sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {completionPercentage.toFixed(1)}% Complete ({completedModules.length} of {totalModules} modules)
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Achievements</Typography>
            <List>
              {achievements.map((achievement, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {achievement.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={achievement.name}
                    secondary={achievement.description}
                    primaryTypographyProps={{ 
                      style: { color: achievement.achieved ? 'inherit' : 'text.disabled' } 
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Gamification;