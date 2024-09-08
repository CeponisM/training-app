import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, LinearProgress } from '@mui/material';

function CourseCatalog({ user, courses, userProgress }) {
  const completedModules = userProgress?.completedModules || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Course Catalog
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => {
          const totalModules = course.modules.length;
          const completedCourseModules = course.modules.filter(module => 
            completedModules.includes(module.id)
          ).length;
          const progress = (completedCourseModules / totalModules) * 100;

          return (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {totalModules} modules
                  </Typography>
                  <LinearProgress variant="determinate" value={progress} sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {progress.toFixed(0)}% Complete
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/learn/${course.id}/${course.modules[0].id}`}>
                    {progress > 0 ? 'Continue' : 'Start'} Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default CourseCatalog;