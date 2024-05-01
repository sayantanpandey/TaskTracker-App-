
import React from 'react';
import { Typography, FormGroup, FormControlLabel, Switch, Divider, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

const SettingsTab = ({ darkTheme, onThemeChange, language, onLanguageChange }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Settings
      </Typography>
      <Divider />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={darkTheme} onChange={onThemeChange} />}
          label="Dark Theme"
        />
        <Select
          value={language}
          onChange={onLanguageChange}
          label="Language"
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="French">French</MenuItem>
          <MenuItem value="Spanish">Spanish</MenuItem>
        </Select>
      </FormGroup>
    </div>
  );
};

export default SettingsTab;
