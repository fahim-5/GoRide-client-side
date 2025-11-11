import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AllVehicles from './pages/Vehicles/AllVehicles';
import VehicleDetails from './pages/Vehicles/VehicleDetails';
import AddVehicle from './pages/Vehicles/AddVehicle';
import MyVehicles from './pages/Vehicles/MyVehicles';
import UpdateVehicle from './pages/Vehicles/UpdateVehicle';
import MyBookings from './pages/Bookings/MyBookings';
import NotFound from './pages/Error/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/vehicles" element={<AllVehicles />} />
                <Route path="/vehicle/:id" element={<VehicleDetails />} />
                <Route path="/add-vehicle" element={
                  <PrivateRoute>
                    <AddVehicle />
                  </PrivateRoute>
                } />
                <Route path="/my-vehicles" element={
                  <PrivateRoute>
                    <MyVehicles />
                  </PrivateRoute>
                } />
                <Route path="/update-vehicle/:id" element={
                  <PrivateRoute>
                    <UpdateVehicle />
                  </PrivateRoute>
                } />
                <Route path="/my-bookings" element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;