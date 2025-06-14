
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import DashboardPage from './pages/DashboardPage';
import CreatePage from './pages/CreatePage';
import NewPage from './pages/NewPage';
import Progresspage from './pages/Progresspage';
import ComplitedPage from './pages/ComplitedPage';
import CanceledPage from './pages/CanceledPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Registrationpage from './pages/Registrationpage';
import Page404 from './pages/Page404';
import Forgetpass from './components/Forgetpass';
import FullscreenLoader from './components/MasterLayout.jsx/FullscreenLoader';
import { Fragment } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Update from "./components/Update";
import SendOtp from "./components/accountRecover/SendOtp";
import VerifyOtp from './components/accountRecover/VerifyOtp';
import CreatePassword from './components/accountRecover/CreatePassword';
import Notfound from "./components/Notfound";
import { Toaster } from "react-hot-toast";
function App() {


  return (
    <Fragment>
      {/* <FullscreenLoader /> */}
      <BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Custom styles
            success: {
              style: {
                background: "black",
                color: "white",
                font: "bold",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
                font: "bold",
              },
            },
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/all"
            element={
              <PrivateRoute>
                <NewPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <PrivateRoute>
                <Progresspage />
              </PrivateRoute>
            }
          />
          <Route
            path="/completed"
            element={
              <PrivateRoute>
                <ComplitedPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cancled"
            element={
              <PrivateRoute>
                <CanceledPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <PrivateRoute>
                <Update />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<Registrationpage />} />
          {/*   <Route path="/forgetpass" element={<Forgetpass />} /> */}
          <Route path="/sendotp" element={<SendOtp />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/createpassword" element={<CreatePassword />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App

/* if (getToken()) {
  return (
    <Fragment>
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/all" element={<NewPage />} />
          <Route path="/progress" element={<Progresspage />} />
          <Route path="/completed" element={<ComplitedPage />} />
          <Route path="/cancled" element={<CanceledPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
} else {
  return (
    <Fragment>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/registration" element={<Registrationpage />} />
          <Route exact path="/forgetpass" element={<Forgetpass />} />
          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
} */