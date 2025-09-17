import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import {
  MenuBook as BookIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main", boxShadow: 1 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <BookIcon sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
              Demo Educacional
            </Typography>
          </Box>
          <Button component={RouterLink} to="/" color="inherit">
            Ver Lista
          </Button>
          <Button component={RouterLink} to="/post" color="inherit">
            Fazer Requisição
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
