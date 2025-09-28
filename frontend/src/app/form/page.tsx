import DefaultForm from "@/components/DefaultForm";
import { Grid, Typography } from "@mui/material";

export default function Page() {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"start"}
      overflow={"hidden"}
      minHeight={"100vh"}
    >
      <Grid container justifyContent={"center"}>
        <DefaultForm />
      </Grid>
    </Grid>
  );
}
