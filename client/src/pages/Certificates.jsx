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
import CertificateCard from "../components/CertificateCard";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const { data } = await api.get("/certificates");
        setCertificates(data);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Certificates
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
          <Grid container spacing={4}>
  {certificates.map((certificate) => (
    <Grid item xs={12} sm={6} md={4} key={certificate._id}>
      <CertificateCard certificate={certificate} baseURL={baseURL} />
    </Grid>
  ))}
</Grid>

        {/* Empty State */}
        {!loading && certificates.length === 0 && (
          <Typography>No certificates added yet 🏆</Typography>
        )}

      </Grid>
    </Container>
  );
}

export default Certificates;