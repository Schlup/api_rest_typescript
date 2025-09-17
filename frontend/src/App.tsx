import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./themes/theme";

import DetailsPage from "./pages/DetailsPage";
import ListPage from "./pages/ListPage";
import PostPage from "./pages/PostPage";
import RootLayout from "./pages/RootLayout";

// 1. Crie o roteador com a definição das rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ListPage /> }, // Rota principal: /
      { path: "post", element: <PostPage /> }, // Rota de post: /post
      { path: "item/:id", element: <DetailsPage /> }, // Rota de detalhes: /item/1, /item/2, etc.
    ],
  },
]);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
