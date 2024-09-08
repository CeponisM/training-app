import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Snackbar, Alert, CssBaseline, Box, Toolbar } from '@mui/material';

import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CourseCatalog from './components/CourseCatalog';
import LearningModule from './components/LearningModule';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Gamification from './components/Gamification';
import CareerResources from './components/CareerResources';
import CybersecuritySimulator from './components/CybersecuritySimulator';
import DataManagement from './components/DataManagement';

import enhancedCourses from './data/enhancedCourses';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    try {
      // Load data from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const storedUserProgress = JSON.parse(localStorage.getItem('userProgress')) || {};

      setUsers(storedUsers);
      setUserProgress(storedUserProgress);
    } catch (err) {
      setError('Error loading data. Please try refreshing the page.');
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    try {
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
    } catch (err) {
      setError('Error saving data. Your progress may not be saved.');
    }
  }, [users, userProgress]);

  const handleAddUser = (name, color) => {
    const newUser = { id: Date.now(), name, color };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setUserProgress(prevProgress => ({
      ...prevProgress,
      [newUser.id]: { completedModules: [] }
    }));
  };

  const handleSelectUser = (user) => {
    setCurrentUser(user);
    if (!userProgress[user.id]) {
      setUserProgress(prevProgress => ({
        ...prevProgress,
        [user.id]: { completedModules: [] }
      }));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleModuleCompletion = (courseId, moduleId) => {
    if (currentUser) {
      setUserProgress(prevProgress => {
        const updatedProgress = {
          ...prevProgress,
          [currentUser.id]: {
            ...prevProgress[currentUser.id],
            completedModules: [
              ...new Set([...prevProgress[currentUser.id].completedModules, `${courseId}-${moduleId}`])
            ]
          }
        };
        return updatedProgress;
      });
      
      setSnackbar({
        open: true,
        message: 'Module completed successfully!',
        severity: 'success'
      });
      
      // Check if the course is completed
      const course = enhancedCourses.find(c => c.id === courseId);
      if (course) {
        const allModulesCompleted = course.modules.every(module => 
          userProgress[currentUser.id].completedModules.includes(`${courseId}-${module.id}`)
        );
        if (allModulesCompleted) {
          setSnackbar({
            open: true,
            message: `Congratulations! You've completed the ${course.title} course!`,
            severity: 'success'
          });
        }
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {currentUser ? (
            <Box sx={{ display: 'flex' }}>
              <Navigation user={currentUser} onLogout={handleLogout} />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { sm: `calc(100% - 240px)` },
                  ml: { sm: `240px` },
                }}
              >
                <Toolbar /> {/* This empty Toolbar pushes content below AppBar */}
                <Routes>
                  <Route path="/" element={<Dashboard user={currentUser} courses={enhancedCourses} userProgress={userProgress[currentUser.id]} />} />
                  <Route path="/courses" element={<CourseCatalog user={currentUser} courses={enhancedCourses} userProgress={userProgress[currentUser.id]} />} />
                  <Route path="/learn/:courseId/:moduleId" element={
                    <LearningModule 
                      courses={enhancedCourses} 
                      userProgress={userProgress[currentUser.id]} 
                      onComplete={handleModuleCompletion}
                    />
                  } />
                  <Route path="/profile" element={<Profile user={currentUser} userProgress={userProgress[currentUser.id]} courses={enhancedCourses} />} />
                  <Route path="/gamification" element={<Gamification user={currentUser} userProgress={userProgress[currentUser.id]} courses={enhancedCourses} />} />
                  <Route path="/career" element={<CareerResources />} />
                  <Route path="/simulator" element={<CybersecuritySimulator />} />
                  <Route path="/data-management" element={
                    <DataManagement 
                      users={users} 
                      userProgress={userProgress}
                      onDataImport={(importedData) => {
                        setUsers(importedData.users);
                        setUserProgress(importedData.userProgress);
                        setSnackbar({
                          open: true,
                          message: 'Data imported successfully!',
                          severity: 'success'
                        });
                      }}
                    />
                  } />
                </Routes>
              </Box>
            </Box>
          ) : (
            <Routes>
              <Route path="/auth" element={<Auth users={users} onAddUser={handleAddUser} onSelectUser={handleSelectUser} />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
          )}
        </div>
      </Router>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
