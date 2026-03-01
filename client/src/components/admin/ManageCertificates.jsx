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

function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credentialLink: "",
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCertificates = async () => {
    const { data } = await api.get("/certificates");
    setCertificates(data);
  };

  useEffect(() => {
  const loadCertificates = async () => {
    try {
      const { data } = await api.get("/certificates");
      setCertificates(data);
    } catch (err) {
      console.error("Failed to fetch certificates", err);
    }
  };

  loadCertificates();
}, []);

  const handleOpen = (certificate = null) => {
    setEditingCertificate(certificate);
    if (certificate) {
      setFormData({
        title: certificate.title,
        description: certificate.description,
        credentialLink: certificate.credentialLink,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        credentialLink: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCertificate(null);
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
    data.append("credentialLink", formData.credentialLink);
    if (image) data.append("image", image);

    if (editingCertificate) {
      await api.put(`/certificates/${editingCertificate._id}`, data, {
        headers: { Authorization: token },
      });
    } else {
      await api.post("/certificates", data, {
        headers: { Authorization: token },
      });
    }

    fetchCertificates();
    handleClose();
  };

  const handleDelete = async (id) => {
    await api.delete(`/certificates/${id}`, {
      headers: { Authorization: token },
    });
    fetchCertificates();
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Certificate
      </Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {certificates.map((certificate) => (
          <Grid item xs={12} md={6} key={certificate._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {certificate.title}
                </Typography>
                <Typography>
                  {certificate.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleOpen(certificate)}>
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDelete(certificate._id)}
                >
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
          {editingCertificate ? "Edit Certificate" : "Add Certificate"}
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
            label="Credential Link"
            name="credentialLink"
            sx={{ mb: 2 }}
            value={formData.credentialLink}
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

export default ManageCertificates;