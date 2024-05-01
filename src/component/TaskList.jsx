
import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onMarkTaskAsCompleted }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

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

  return (
    <List>
      {tasks.map((task, index) => (
        <div key={index} style={{ border: '1px solid #ccc', borderRadius: 4, marginBottom: '8px' }}>
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
                  <IconButton onClick={() => onDeleteTask(index)}>
                    <Delete />
                  </IconButton>
                  {!task.completed && (
                    <Button onClick={() => onMarkTaskAsCompleted(index)} startIcon={<CheckCircleOutlineIcon style={{ fontSize: 30, color: 'primary' }} />}>
                      <Typography variant="button" sx={{ fontWeight: 'bold', color: 'primary' }}>
                        Mark as Completed
                      </Typography>
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        </div>
      ))}
    </List>
  );
};


export default TaskList;
