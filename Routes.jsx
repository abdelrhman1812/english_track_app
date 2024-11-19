import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notes from "./src/components/Notes";
import SentenceTranslation from "./src/components/SentenceTranslation";
import Topics from "./src/components/Topics";
import WordTranslation from "./src/components/WordTranslation";
import Layout from "./src/pages/Layout/Layout";

const Routes = () => {
  const routers = createBrowserRouter(
    [
      {
        path: "",
        element: <Layout />,
        children: [
          { index: true, element: <WordTranslation /> },
          { path: "/sentences", element: <SentenceTranslation /> },
          { path: "/notes", element: <Notes /> },
          { path: "/topics", element: <Topics /> },
        ],
      },
    ],
    {
      future: {
        v7_skipActionErrorRevalidation: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return <RouterProvider router={routers} />;
};

export default Routes;
