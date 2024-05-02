import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const CompletedTasksTab = ({ tasks, onDeleteCompletedTask }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(-1);

  const handleDeleteTask = (index) => {
    setTaskToDelete(index);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteCompletedTask(taskToDelete);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  if (!tasks || tasks.length === 0) {
    return <div>No completed tasks</div>;
  }

  return (
    <List>
      <Typography variant="h6" gutterBottom>
        Completed Tasks  ({tasks.length})
      </Typography>
      {tasks.map((task, index) => (
        <div key={index} style={{ border: '1px solid #ccc', borderRadius: 4, marginBottom: '8px' }}>
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
              <IconButton onClick={() => handleDeleteTask(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      ))}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-dialog-title"
        aria-describedby="delete-confirmation-dialog-description"
      >
        <DialogTitle id="delete-confirmation-dialog-title">Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default CompletedTasksTab;
