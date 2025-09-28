"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { includes, z } from "zod";
import { MailOutline, LockOutlined } from "@mui/icons-material"; // Ícones do MUI

// Schema de validação (sem alterações)
const loginSchema = z.object({
  email: z.string().email("Por favor, insira um email válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Lógica de submit (sem alterações)
  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      const request = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!request.ok) {
        form.setError("root.serverError", {
          message: "Email ou senha inválidos.",
        });
        setIsSubmitting(false);
        return;
      }

      router.replace("/profile");
    } catch (error) {
      console.error(error);
      form.setError("root.serverError", {
        message: "Ocorreu um erro. Tente novamente.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid>
        <Paper
          elevation={3}
          sx={{ padding: { xs: 2, sm: 4 }, borderRadius: "12px" }}
        >
          {/* O Box se torna o formulário */}
          <Box
            component="form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Cabeçalho */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Fazer Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entre com suas credenciais para acessar sua conta
              </Typography>
            </Box>

            {/* Campo de Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline color={error ? "error" : "action"} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Campo de Senha */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Senha"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined color={error ? "error" : "action"} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Exibe erro geral do formulário (ex: credenciais inválidas) */}
            {form.formState.errors.root?.serverError && (
              <Typography color="error" variant="body2" textAlign="center">
                {form.formState.errors.root.serverError.message}
              </Typography>
            )}

            {/* Botão de Envio */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2, py: 1.5 }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
