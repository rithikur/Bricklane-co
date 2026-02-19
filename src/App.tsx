import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import HelpPage from './pages/HelpPage';
import WishlistPage from './pages/WishlistPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPropertyForm from './pages/AdminPropertyForm';
import { PropertyProvider } from './context/PropertyContext';
import AuthPage from './pages/AuthPage';
import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor';

function App() {
  return (
    <PropertyProvider>
      <Router>
        {/* Custom cursor — only renders on non-touch devices */}
        <CustomCursor />
        {/* Smooth scroll wraps all content */}
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/property/new" element={<AdminPropertyForm />} />
            <Route path="/admin/property/edit/:id" element={<AdminPropertyForm />} />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
          </Routes>
        </SmoothScroll>
      </Router>
    </PropertyProvider>
  );
}

export default App;
