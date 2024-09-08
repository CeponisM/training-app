import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Grid, Paper, Typography, LinearProgress, 
  Button, List, ListItem, ListItemText, ListItemIcon,
  Card, CardContent, CardActions, Box, Chip
} from '@mui/material';
import {
  School as CourseIcon,
  CheckCircleOutline as CompletedIcon,
  PlayCircleOutline as InProgressIcon,
  StarBorder as AchievementIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Dashboard({ user, courses, userProgress }) {
  const completedModules = userProgress?.completedModules || [];

  // Calculate overall progress
  const totalModules = courses.reduce((total, course) => total + course.modules.length, 0);
  const completionPercentage = (completedModules.length / totalModules) * 100;

  // Get in-progress and recommended courses
  const inProgressCourses = courses.filter(course => 
    course.modules.some(module => completedModules.includes(`${course.id}-${module.id}`)) &&
    !course.modules.every(module => completedModules.includes(`${course.id}-${module.id}`))
  );

  const recommendedCourses = courses
    .filter(course => !inProgressCourses.includes(course) && 
      !course.modules.every(module => completedModules.includes(`${course.id}-${module.id}`)))
    .slice(0, 3);  // Limit to 3 recommended courses

  // Calculate achievements
  const achievements = [
    { name: 'Courses Started', value: inProgressCourses.length },
    { name: 'Modules Completed', value: completedModules.length },
    { name: 'Courses Completed', value: courses.filter(course => 
      course.modules.every(module => completedModules.includes(`${course.id}-${module.id}`))
    ).length }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Recent activity (mock data - replace with real data in a full implementation)
  const recentActivity = [
    { type: 'module_completed', course: 'Introduction to Cybersecurity', module: 'Basics of Information Security' },
    { type: 'course_started', course: 'Web Development Fundamentals' },
    { type: 'achievement_earned', achievement: 'Fast Learner' }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Message */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user.name}!
            </Typography>
            <Typography variant="body1">
              You've completed {completedModules.length} out of {totalModules} modules. Keep up the great work!
            </Typography>
          </Paper>
        </Grid>

        {/* Overall Progress */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Overall Progress</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={completionPercentage} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(completionPercentage)}%`}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>Achievements</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={achievements}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {achievements.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
              {achievements.map((achievement, index) => (
                <Box key={achievement.name} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">{achievement.name}</Typography>
                  <Typography variant="h6">{achievement.value}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* In-Progress Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>In-Progress Courses</Typography>
            <List>
              {inProgressCourses.map(course => {
                const completedModulesCount = course.modules.filter(module => 
                  completedModules.includes(`${course.id}-${module.id}`)
                ).length;
                const progress = (completedModulesCount / course.modules.length) * 100;
                
                return (
                  <ListItem key={course.id} component={Link} to={`/courses/${course.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemIcon>
                      <CourseIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={course.title}
                      secondary={
                        <React.Fragment>
                          <LinearProgress variant="determinate" value={progress} sx={{ my: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {`${completedModulesCount} of ${course.modules.length} modules completed`}
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

        {/* Recommended Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Recommended Courses</Typography>
            <Grid container spacing={2}>
              {recommendedCourses.map(course => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" component={Link} to={`/courses/${course.id}`}>Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {activity.type === 'module_completed' && <CompletedIcon color="success" />}
                    {activity.type === 'course_started' && <InProgressIcon color="primary" />}
                    {activity.type === 'achievement_earned' && <AchievementIcon color="secondary" />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      activity.type === 'module_completed' ? `Completed module in ${activity.course}` :
                      activity.type === 'course_started' ? `Started ${activity.course}` :
                      `Earned achievement: ${activity.achievement}`
                    }
                    secondary={activity.type === 'module_completed' ? activity.module : null}
                  />
                  <Chip 
                    label={
                      activity.type === 'module_completed' ? 'Completed' :
                      activity.type === 'course_started' ? 'Started' : 'Achieved'
                    }
                    color={
                      activity.type === 'module_completed' ? 'success' :
                      activity.type === 'course_started' ? 'primary' : 'secondary'
                    }
                    size="small"
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

export default Dashboard;
