import React from "react";
import { Box, Button } from "@mui/material";
import type { ActiveSection, EducationalItem } from "../types";

interface NavigationProps {
  activeSection: ActiveSection;
  selectedItem: EducationalItem | null;
  onSectionChange: (section: ActiveSection) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  selectedItem,
  onSectionChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}>
      <Button
        variant={activeSection === "list" ? "contained" : "outlined"}
        onClick={() => onSectionChange("list")}
        sx={{ minWidth: 120 }}
      >
        Lista Principal
      </Button>
      <Button
        variant={activeSection === "post" ? "contained" : "outlined"}
        onClick={() => onSectionChange("post")}
        sx={{ minWidth: 120 }}
      >
        Teste POST
      </Button>
      {selectedItem && (
        <Button
          variant={activeSection === "details" ? "contained" : "outlined"}
          onClick={() => onSectionChange("details")}
          sx={{ minWidth: 120 }}
        >
          Detalhes
        </Button>
      )}
    </Box>
  );
};

export default Navigation;
