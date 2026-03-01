import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import api from "../../services/api";

function PortfolioSettings() {
  const [formData, setFormData] = useState({
    heroTitle: "",
    linkedin: "",
    github: "",
  });

  const [files, setFiles] = useState({});
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) =>
      data.append(key, formData[key])
    );

    Object.keys(files).forEach((key) =>
      data.append(key, files[key])
    );

    try {
      await api.put("/portfolio", data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Portfolio Updated 🔥");
    } catch {
      alert("Update Failed ❌");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Hero Title"
        name="heroTitle"
        sx={{ mb: 2 }}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="LinkedIn URL"
        name="linkedin"
        sx={{ mb: 2 }}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="GitHub URL"
        name="github"
        sx={{ mb: 2 }}
        onChange={handleChange}
      />

      <Typography variant="subtitle1">Profile Image</Typography>
      <input type="file" name="profileImage" onChange={handleFileChange} />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        About Image
      </Typography>
      <input type="file" name="aboutImage" onChange={handleFileChange} />


      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Resume (PDF)
      </Typography>
      <input type="file" name="resumeFile" onChange={handleFileChange} />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        CV (PDF)
      </Typography>
      <input type="file" name="cvFile" onChange={handleFileChange} />

      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3 }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default PortfolioSettings;