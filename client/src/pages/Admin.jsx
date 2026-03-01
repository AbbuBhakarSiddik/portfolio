import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";

import PortfolioSettings from "../components/admin/PortfolioSettings";
import ManageProjects from "../components/admin/ManageProjects";
import ManageCertificates from "../components/admin/ManageCertificates";

function Admin() {
  const [tab, setTab] = useState(0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Portfolio Settings" />
        <Tab label="Projects" />
        <Tab label="Certificates" />
      </Tabs>

      <Box hidden={tab !== 0}>
        <PortfolioSettings />
      </Box>

      <Box hidden={tab !== 1}>
        <ManageProjects />
      </Box>

      <Box hidden={tab !== 2}>
        <ManageCertificates />
      </Box>
    </Container>
  );
}

export default Admin;