import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const TaskList = ({ tasks, completedTasks, onDeleteTask, onEditTask, onMarkTaskAsCompleted }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(-1);

  const handleEdit = (index, name, description) => {
    setEditIndex(index);
    setEditedName(name);
    setEditedDescription(description);
  };

  const handleSave = (index) => {
    onEditTask(index, editedName, editedDescription);
    setEditIndex(-1);
    setEditedName('');
    setEditedDescription('');
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditedName('');
    setEditedDescription('');
  };

  const handleDeleteTask = (index) => {
    setTaskToDelete(index);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(taskToDelete);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <div key={index} style={{ border: '1px solid #ccc', borderRadius: 4, marginBottom: '8px', paddingBottom: '20px',paddingTop:"10px" }}>
          <ListItem>
            {editIndex === index ? (
              <>
                <TextField
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  fullWidth
                />
                <TextField
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  fullWidth
                />
                <Button onClick={() => handleSave(index)}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </>
            ) : (
              <>
                <ListItemText primary={task.name} secondary={task.description} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(index, task.name, task.description)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(index)}>
                    <Delete />
                  </IconButton>
                  {task.completed && (
                    <Typography variant="body2" color="green" fontWeight="bold">
                      Task Completed
                      <CheckCircleOutlineIcon style={{ marginLeft: '4px', color: 'green' }} />
                    </Typography>
                  )}
                  {!task.completed && (
                    <Button onClick={() => onMarkTaskAsCompleted(index)} startIcon={<CheckCircleOutlineIcon style={{ fontSize: 30, color: 'primary' }} />}>
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </>
            )}
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

export default TaskList;
