import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Box, Container } from "@mui/material";
import { useState } from "react";
import DetailsSection from "./components/DetailSection";
import theme from "./themes/theme";
import type { ActiveSection, EducationalItem, PostData } from "./types";
import { initialData } from "./data/mockData";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import EducationalList from "./components/EducationalList";
import PostSection from "./components/PostSection";

const App: React.FC = () => {
  const [data, setData] = useState<EducationalItem[]>(initialData);
  const [selectedItem, setSelectedItem] = useState<EducationalItem | null>(
    null
  );
  const [postData, setPostData] = useState<PostData>({ subject_id: 2 });
  const [activeSection, setActiveSection] = useState<ActiveSection>("list");

  const handleGetData = (): void => {
    console.log("GET Request - Lista obtida:", data);
    setActiveSection("list");
  };

  const handlePostData = (): void => {
    console.log("POST Request:", postData);
    const foundItem = data.find((item) =>
      item.subjects.some((subject) => subject.id === postData.subject_id)
    );
    if (foundItem) {
      setSelectedItem(foundItem);
      setActiveSection("details");
    }
  };

  const handleItemClick = (item: EducationalItem): void => {
    setSelectedItem(item);
    setActiveSection("details");
  };

  const handleSectionChange = (section: ActiveSection): void => {
    setActiveSection(section);
  };

  const handlePostDataChange = (newPostData: PostData): void => {
    setPostData(newPostData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header onGetData={handleGetData} />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Navigation
            activeSection={activeSection}
            selectedItem={selectedItem}
            onSectionChange={handleSectionChange}
          />

          {activeSection === "list" && (
            <EducationalList data={data} onItemClick={handleItemClick} />
          )}

          {activeSection === "post" && (
            <PostSection
              postData={postData}
              onPostDataChange={handlePostDataChange}
              onPostSubmit={handlePostData}
            />
          )}

          {activeSection === "details" && selectedItem && (
            <DetailsSection selectedItem={selectedItem} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
