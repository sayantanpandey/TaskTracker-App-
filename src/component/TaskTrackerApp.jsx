import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  Tab,
  Tabs,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import CompletedTasksTab from "./CompletedTasksTab";
import SettingsTab from "./SettingsTab";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
const TaskTrackerApp = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleEditTask = (index, editedName, editedDescription) => {
    const newTasks = [...tasks];
    newTasks[index] = { name: editedName, description: editedDescription };
    setTasks(newTasks);
  };

  const handleMarkTaskAsCompleted = (index) => {
    const newTasks = [...tasks];
    const completedTask = newTasks.splice(index, 1)[0];
    setTasks(newTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleDeleteCompletedTask = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks.splice(index, 1);
    setCompletedTasks(newCompletedTasks);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#008080", // Teal color
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
          >
            Task Tracker
          </Typography>
          <IconButton onClick={handleThemeChange} sx={{ color: "inherit" }}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Tabs
    value={tabValue}
    onChange={handleChangeTab}
    indicatorColor="primary"
    textColor="inherit"
    sx={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Change direction to column on mobile
      alignItems: "center",
      justifyContent: isMobile ? "center" : "space-between", // Center tabs on mobile
    }}
  >
    <Tab
      label={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PlaylistAddCheckIcon sx={{ fontSize: isMobile ? 18 : 24 }} /> {/* Adjusted icon size */}
          Tasks
        </Box>
      }
      sx={{
        flex: isMobile ? "1 1 auto" : "0 1 auto", // Allow tabs to grow on mobile
        fontWeight: tabValue === 0 ? "bold" : "normal",
        color: "white",
        "&.Mui-selected": {
          color: "white",
        },
        fontSize: isMobile ? 12 : 16, // Adjusted font size for mobile
         // Add space between tabs on mobile
        marginRight: isMobile ? 0 : 10, // Adjust margin for tabs on mobile
      }}
    />
    <Tab
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: isMobile ? 14 : 20,
              marginRight: isMobile ? 0.5 : 1,
            }}
          />
          <span style={{ marginLeft: isMobile ? -1 : 3 }}>
            {/* Adjusted margin for mobile */}
            Completed Tasks
            <span
              style={{
                marginLeft: 3,
                fontSize: isMobile ? 12 : 16,
                fontWeight: "bold",
              }}
            >
              ({completedTasks.length})
            </span>
          </span>
        </Box>
      }
      sx={{
        flex: isMobile ? "1 1 auto" : "0 1 auto", // Allow tabs to grow on mobile
        fontWeight: tabValue === 1 ? "bold" : "normal",
        color: "white",
        "&.Mui-selected": {
          color: "white",
        },
        fontSize: isMobile ? 12 : 16, // Adjusted font size for mobile
        // Add space between tabs on mobile
        marginRight: isMobile ? 0 : 10, // Adjust margin for tabs on mobile
      }}
    />

    <Tab
      label={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SettingsIcon
            sx={{
              fontSize: isMobile ? 14 : 20,
              marginRight: isMobile ? 0 : 1,
            }}
          />
          Settings
        </Box>
      }
      sx={{
        flex: isMobile ? "1 1 auto" : "0 1 auto", // Allow tabs to grow on mobile
        fontWeight: tabValue === 2 ? "bold" : "normal",
        color: "white",
        "&.Mui-selected": {
          color: "white",
        },
        fontSize: isMobile ? 12 : 16, // Adjusted font size for mobile
        // Add space between tabs on mobile
        marginRight: isMobile ? 0 : 10, // Adjust margin for tabs on mobile
      }}
    />
  </Tabs>
</Box>

      </AppBar>
      <Container sx={{ mt: 8 }}>
        <Box
          sx={{ bgcolor: darkMode ? "#333" : "#f4f4f4", p: 3, borderRadius: 8 }}
        >
          {tabValue === 0 && (
            <>
              <TaskForm onAddTask={handleAddTask} />
              <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onMarkTaskAsCompleted={handleMarkTaskAsCompleted}
              />
            </>
          )}
          {tabValue === 1 && (
            <CompletedTasksTab
              tasks={completedTasks}
              onDeleteCompletedTask={handleDeleteCompletedTask}
            />
          )}
          {tabValue === 2 && (
            <SettingsTab
              darkMode={darkMode}
              onThemeChange={handleThemeChange}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TaskTrackerApp;
