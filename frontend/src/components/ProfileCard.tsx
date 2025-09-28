"use client";

import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import {
  Logout,
  MailOutline,
  PersonOutline,
  Fingerprint,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
};

export default function UserCard({ user }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    router.replace("/");
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container size={{ xs: 11, sm: 6, md: 6, lg: 3 }}>
        <Paper
          elevation={2}
          sx={{ width: "100%", borderRadius: "12px", overflow: "hidden" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
            }}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 80, height: 80, fontSize: "2.5rem", mb: 2 }}
            >
              {getInitials(user.name)}
            </Avatar>
            <Typography variant="h5" component="h1" fontWeight="bold">
              Bem-vindo!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aqui estão suas informações de perfil
            </Typography>
          </Box>
          <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                backgroundColor: "grey.100",
                borderRadius: 2,
              }}
            >
              <PersonOutline sx={{ mr: 2, color: "text.secondary" }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Nome
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {user.name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                backgroundColor: "grey.100",
                borderRadius: 2,
              }}
            >
              <MailOutline sx={{ mr: 2, color: "text.secondary" }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                backgroundColor: "grey.100",
                borderRadius: 2,
              }}
            >
              <Fingerprint sx={{ mr: 2, color: "text.secondary" }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  ID do Usuário
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  #{user.id}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Ação de Logout */}
          <Box sx={{ p: 3, pt: 0 }}>
            <Divider sx={{ mb: 2 }} />
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<Logout />}
            >
              Sair
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
