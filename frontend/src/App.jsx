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
import Adminjobs from "./components/admin/Adminjobs";
import Postjobs from "./components/admin/Postjobs";
import Applicants from "./components/admin/Applicants";
import About from "./components/About";



const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/about",
    element:<About/>
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
  },
  {
    path:"/admin/jobs",
    element:<Adminjobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<Postjobs/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
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
