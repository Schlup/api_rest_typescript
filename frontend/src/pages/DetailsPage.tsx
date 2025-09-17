import { useParams } from "react-router-dom";
import DetailsSection from "../components/DetailSection";
import { initialData } from "../data/mockData";
import { Typography } from "@mui/material";

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const selectedItem = initialData.find((item) => item.id === Number(id));

  if (!selectedItem) {
    return <Typography variant="h5">Item não encontrado.</Typography>;
  }

  return <DetailsSection selectedItem={selectedItem} />;
};

export default DetailsPage;
