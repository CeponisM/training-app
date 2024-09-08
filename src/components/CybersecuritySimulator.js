import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, TextField, List, ListItem, ListItemText, Alert } from '@mui/material';

const scenarios = [
  {
    id: 1,
    title: "Phishing Attack",
    description: "You've received reports of a potential phishing campaign targeting your organization. Investigate and mitigate the threat.",
    initialState: {
      emailFiltering: false,
      userTraining: false,
      incidentResponse: false
    },
    actions: [
      { command: "analyze emails", description: "Analyze recent emails for phishing indicators" },
      { command: "enable email filtering", description: "Enable advanced email filtering" },
      { command: "conduct user training", description: "Conduct phishing awareness training for users" },
      { command: "update incident response", description: "Update incident response plan for phishing attacks" }
    ]
  },
  {
    id: 2,
    title: "Malware Outbreak",
    description: "A malware infection has been detected on multiple systems in your network. Contain and eradicate the threat.",
    initialState: {
      systemsIsolated: false,
      malwareRemoved: false,
      systemsPatched: false
    },
    actions: [
      { command: "isolate systems", description: "Isolate infected systems from the network" },
      { command: "run antivirus", description: "Run full antivirus scans on all systems" },
      { command: "update systems", description: "Apply latest security patches to all systems" },
      { command: "restore from backup", description: "Restore critical data from clean backups" }
    ]
  }
];

function CybersecuritySimulator() {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [scenarioState, setScenarioState] = useState({});

  const startScenario = (scenario) => {
    setCurrentScenario(scenario);
    setScenarioState(scenario.initialState);
    setOutput([{ type: 'info', message: `Scenario started: ${scenario.title}` }]);
  };

  const handleCommand = () => {
    if (!currentScenario) {
      setOutput([...output, { type: 'error', message: 'Please start a scenario first.' }]);
      setCommand('');
      return;
    }

    const action = currentScenario.actions.find(a => a.command === command.toLowerCase());
    if (action) {
      let newState = { ...scenarioState };
      let message = '';

      switch (action.command) {
        case 'analyze emails':
          message = 'Email analysis complete. Several suspicious emails identified.';
          break;
        case 'enable email filtering':
          newState.emailFiltering = true;
          message = 'Advanced email filtering enabled.';
          break;
        case 'conduct user training':
          newState.userTraining = true;
          message = 'Phishing awareness training conducted for all users.';
          break;
        case 'update incident response':
          newState.incidentResponse = true;
          message = 'Incident response plan updated for phishing attacks.';
          break;
        case 'isolate systems':
          newState.systemsIsolated = true;
          message = 'Infected systems isolated from the network.';
          break;
        case 'run antivirus':
          newState.malwareRemoved = true;
          message = 'Antivirus scans completed. Malware removed from infected systems.';
          break;
        case 'update systems':
          newState.systemsPatched = true;
          message = 'All systems updated with latest security patches.';
          break;
        case 'restore from backup':
          message = 'Critical data restored from clean backups.';
          break;
        default:
          message = 'Action completed.';
      }

      setScenarioState(newState);
      setOutput([...output, { type: 'success', message }]);

      if (Object.values(newState).every(Boolean)) {
        setOutput(prev => [...prev, { type: 'info', message: 'Scenario completed successfully!' }]);
        setCurrentScenario(null);
      }
    } else {
      setOutput([...output, { type: 'error', message: 'Unknown command. Try one of the available actions.' }]);
    }
    setCommand('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Advanced Cybersecurity Simulator</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '400px', overflowY: 'auto' }}>
            <List>
              {output.map((item, index) => (
                <ListItem key={index}>
                  <Alert severity={item.type} sx={{ width: '100%' }}>
                    {item.message}
                  </Alert>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Scenarios</Typography>
            {scenarios.map(scenario => (
              <Button 
                key={scenario.id} 
                variant="outlined" 
                onClick={() => startScenario(scenario)}
                disabled={currentScenario !== null}
                sx={{ mb: 1, display: 'block' }}
              >
                {scenario.title}
              </Button>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
          />
          <Button variant="contained" onClick={handleCommand} sx={{ mt: 2 }}>Execute Command</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CybersecuritySimulator;
