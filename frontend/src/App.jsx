import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CreateCompanybyId from "./components/admin/CreateCompanybyId";


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },


  // admin route start here

  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/company/create",
    element:<CreateCompany/>
  },
  {
    path:"/admin/company/create/:id",
    element:<CreateCompanybyId/>
  }

])
function App() {
  return (
    <>
    <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
