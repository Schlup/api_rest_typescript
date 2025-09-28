"use client";

import { Grid, Typography, TextField, Button, Box } from "@mui/material";

interface FormProps {
  name: string;
  email: string;
  message: string;
}

export default function SimpleForm() {
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       name: data.get("name"),
  //       email: data.get("email"),
  //       message: data.get("message"),
  //     });
  //     alert("Formulário enviado! Verifique o console.");
  //   };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      size={{ xs: 12 }}
    >
      <Grid container>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
            width: "50vw",
          }}
          autoComplete="off"
        >
          <Typography variant="h5" component="h1" textAlign="center">
            Relatório de Comissionamento
          </Typography>

          <TextField
            required
            id="name"
            name="name"
            label="Nome"
            variant="outlined"
            fullWidth
          />

          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />

          <TextField
            id="message"
            name="message"
            label="Mensagem"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
