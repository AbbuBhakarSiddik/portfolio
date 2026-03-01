import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

function ProjectCard({ project, baseURL }) {
  return (
    <Card
  sx={{
    width: "100%",
    maxWidth: 400, // 🔥 Important
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    transition: "0.3s",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
    },
  }}
>
      {project.image && (
        <CardMedia
          component="img"
          height="200"
          image={`${baseURL}${project.image}`}
          alt={project.title}
          sx={{
            objectFit: "cover",
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "text.secondary",
          }}
        >
          {project.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          href={project.liveLink}
          target="_blank"
        >
          View Project
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;