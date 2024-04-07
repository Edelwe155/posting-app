import React from "react";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PostPage } from "./pages/PostPage";
import { RepositoryPage } from "./pages/RepoPage";
import { PageWrapper } from "./elements/sectionWrappers/pageWrapper";
import axios from "axios";
import { RegisterPage } from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { UserContext, UserContextProvider } from "../context/userContext";
import { useContext } from "react";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/post",
    element: (
      <PageWrapper>
        <PostPage />
      </PageWrapper>
    ),
  },
  {
    path: "/repo",
    element: (
      <PageWrapper>
        <RepositoryPage />
      </PageWrapper>
    ),
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
