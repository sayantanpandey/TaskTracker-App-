
import React from 'react';
import { List, ListItem, ListItemText,ListItemIcon, Checkbox,ListItemSecondaryAction, IconButton, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
const CompletedTasksTab = ({ tasks, onDeleteCompletedTask }) => {
  if (!tasks || tasks.length === 0) {
    return <div>No completed tasks</div>;
  }
  return (
    
    <List>
      <Typography variant="h6" gutterBottom>
        Completed Tasks 
      </Typography>
      {tasks.map((task, index) => (
         <Box key={index} sx={{ border: '1px solid #ccc', borderRadius: 4, marginBottom: 1 }}>
        <ListItem key={index}>
          <ListItemIcon>
            <Checkbox
              checked={true} 
              disabled
              color="primary" style={{ color: '#16a34a' }}
              icon={<CheckCircleOutlineIcon />}
            />
          </ListItemIcon>
          <ListItemText primary={task.name} secondary={task.description} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => onDeleteCompletedTask(index)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        </Box>
      ))}
    </List>
  );
};

export default CompletedTasksTab;
