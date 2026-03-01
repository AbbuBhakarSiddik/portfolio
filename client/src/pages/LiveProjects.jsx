import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Skeleton,
} from "@mui/material";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";

function LiveProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get("/projects");
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Live Projects
      </Typography>

      <Grid container spacing={3}>
        {/* Loading Skeleton */}
        {loading &&
          [1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton variant="rectangular" height={180} />
              <Skeleton sx={{ mt: 1 }} />
              <Skeleton width="60%" />
            </Grid>
          ))}
          <Grid container spacing={3} justifyContent="center">
  {projects.map((project) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      key={project._id}
      sx={{ display: "flex" }}
    >
      <ProjectCard project={project} baseURL={baseURL} />
    </Grid>
  ))}
</Grid>

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <Typography>No projects added yet 🚀</Typography>
        )}

        
      
      </Grid>
    </Container>
  );
}

export default LiveProjects;