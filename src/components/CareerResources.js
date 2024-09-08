import React from 'react';
import { Container, Typography, Paper, Grid, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Work, School, Description } from '@mui/icons-material';

function CareerResources() {
  const jobRoles = [
    { title: 'Junior Cybersecurity Analyst', description: 'Entry-level position focusing on monitoring and analyzing security threats.' },
    { title: 'Web Developer', description: 'Creates and maintains websites and web applications.' },
    { title: 'Network Administrator', description: 'Manages an organizations computer networks.' },
  ];

  const certifications = [
    { name: 'CompTIA Security+', provider: 'CompTIA', description: 'Covers network security, compliance and operation security, threats and vulnerabilities, application, data and host security, access control and identity management, and cryptography.' },
    { name: 'Certified Ethical Hacker (CEH)', provider: 'EC-Council', description: 'Teaches how to look for weaknesses and vulnerabilities in target systems using the same knowledge and tools as a malicious hacker.' },
    { name: 'Certified Information Systems Security Professional (CISSP)', provider: 'ISC²', description: 'Proves you have what it takes to effectively design, implement and manage a best-in-class cybersecurity program.' },
  ];

  const resources = [
    { title: 'Cracking the Coding Interview', type: 'Book', description: 'Popular book for programming interview preparation.' },
    { title: 'HackerRank', type: 'Website', description: 'Platform for practicing coding skills and preparing for technical interviews.' },
    { title: 'Cybrary', type: 'Online Learning Platform', description: 'Offers free and paid cybersecurity and IT courses.' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Popular Job Roles</Typography>
            <List>
              {jobRoles.map((job, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Work />
                  </ListItemIcon>
                  <ListItemText primary={job.title} secondary={job.description} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Recommended Certifications</Typography>
            <List>
              {certifications.map((cert, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary={cert.name} secondary={`${cert.provider} - ${cert.description}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Learning Resources</Typography>
            <List>
              {resources.map((resource, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText primary={resource.title} secondary={`${resource.type} - ${resource.description}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CareerResources;