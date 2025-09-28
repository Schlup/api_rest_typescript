import { Badge, Grid, Link as MuiLink } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NextLink from "next/link"; // Importe o Link do Next.js

export default function Navbar() {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: "0px 16px", borderBottom: "1px solid #ddd" }}
      mb={"1%"}
    >
      <Grid container alignContent={"center"}>
        <Grid>
          <img
            src={"./weg-logo.svg"}
            alt="Weg Logo"
            style={{ width: "75px", display: "block" }}
          />
        </Grid>
        <Grid alignContent={"center"}>
          <MuiLink
            component={NextLink}
            href="/form"
            underline="hover"
            variant="body1"
          >
            Formulário
          </MuiLink>
        </Grid>
      </Grid>

      <Grid>
        <Grid container alignItems="center" gap={3}>
          <Grid container justifyContent={"center"} alignContent={"center"}>
            <Badge badgeContent={10} color="primary">
              <MailIcon
                color="action"
                style={{ width: "32px", height: "auto" }}
              />
            </Badge>
          </Grid>
          <Grid alignContent={"center"}>
            <img
              src={"./perfil.png"}
              alt="Perfil"
              style={{
                borderRadius: "100%",
                width: "50px",
                height: "auto",
                display: "block",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
