import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import HelpPage from './pages/HelpPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPropertyForm from './pages/AdminPropertyForm';
import { PropertyProvider } from './context/PropertyContext';

function App() {
  return (
    <PropertyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/property/new" element={<AdminPropertyForm />} />
          <Route path="/admin/property/edit/:id" element={<AdminPropertyForm />} />
        </Routes>
      </Router>
    </PropertyProvider>
  );
}

export default App;
