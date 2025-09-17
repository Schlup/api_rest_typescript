import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EducationalList from "../components/EducationalList";
import { initialData } from "../data/mockData";
import type { EducationalItem } from "../types";

const ListPage: React.FC = () => {
  const [data] = useState<EducationalItem[]>(initialData);
  const navigate = useNavigate();

  const handleItemClick = (item: EducationalItem): void => {
    navigate(`/item/${item.id}`);
  };

  return <EducationalList data={data} onItemClick={handleItemClick} />;
};

export default ListPage;
