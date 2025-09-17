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

interface HeaderProps {
  onGetData: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetData }) => {
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
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
            onClick={onGetData}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            GET Lista
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
