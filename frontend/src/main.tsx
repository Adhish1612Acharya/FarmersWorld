import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "./routes/OtherPages/ErrorPage";
import Home from "./routes/user/Home";
import "react-toastify/dist/ReactToastify.css";
import SchemeDetail from "./routes/user/SchemeDetail";
import { loader as schemeInfoLoader } from "./routes/user/SchemeDetail";
import ApplyScheme from "./routes/user/ApplyScheme";
import Login from "./routes/OtherPages/Login";
import SignUp from "./routes/OtherPages/SignUp";
import AdminHomePage from "./routes/admin/AdminHomePage";
import { loader as applySchemeLoader } from "./routes/user/ApplyScheme";
import UserApplications from "./routes/user/UserApplications";
import ApplicationDetails from "./routes/user/ApplicationDetails";
import { loader as detailsLoader } from "./routes/user/ApplicationDetails";
import { loader as adminApplicationsLoader } from "./routes/admin/Applications";
import Applications from "./routes/admin/Applications";
import ApplicationDetail from "./routes/admin/ApplicationDetail";
import { loader as adminFarmerApplicationDetailLoader } from "./routes/admin/ApplicationDetail";
import { Provider } from "react-redux";
import { store } from "./store/store";

let routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schemes/:id",
    element: <SchemeDetail />,
    loader: schemeInfoLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schemes/:id/apply",
    element: <ApplyScheme />,
    loader: applySchemeLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminHomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schemes/applications",
    element: <UserApplications />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schemes/applications/:applicationId",
    element: <ApplicationDetails />,
    loader: detailsLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/schemes/:schemeId/applications",
    element: <Applications />,
    loader: adminApplicationsLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/schemes/:schemeId/applications/:applicationId",
    element: <ApplicationDetail />,
    loader: adminFarmerApplicationDetailLoader,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        bodyClassName="toastBody"
        style={{ marginTop: "5rem" }}
      />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

      {/* <App /> */}
    </>
  );
} else {
  console.error("Root element not found");
}
