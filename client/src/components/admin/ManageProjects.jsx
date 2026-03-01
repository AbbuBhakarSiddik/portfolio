import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import api from "../../services/api";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    liveLink: "",
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ Proper reload function
  const reloadProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error("Failed to reload projects", err);
    }
  };

  // ✅ Proper React 18 safe effect
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get("/projects");
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    loadProjects();
  }, []);

  const handleOpen = (project = null) => {
    setEditingProject(project);

    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        liveLink: project.liveLink,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        liveLink: "",
      });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setImage(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("liveLink", formData.liveLink);
    if (image) data.append("image", image);

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, data, {
          headers: { Authorization: token },
        });
      } else {
        await api.post("/projects", data, {
          headers: { Authorization: token },
        });
      }

      await reloadProjects();   // ✅ fixed
      handleClose();
    } catch (err) {
      console.error("Failed to save project", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`, {
        headers: { Authorization: token },
      });

      await reloadProjects();  // ✅ fixed
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Project
      </Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} key={project._id}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography sx={{ mt: 1 }}>
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleOpen(project)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(project._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {editingProject ? "Edit Project" : "Add Project"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            sx={{ mb: 2 }}
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={formData.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Live Link"
            name="liveLink"
            sx={{ mb: 2 }}
            value={formData.liveLink}
            onChange={handleChange}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageProjects;