import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Routes, Route, Link
import RSVPForm from './components/RSVPForm';
import AdminPage from './components/AdminPage';
import Admin from './components/Admin';

function HomePage() {
const [guestName, setGuestName] = useState('');
 const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminExport, setIsAdminExport] = useState(false);
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const admin = params.get('admin');
    const adminexport = params.get('adminexport');
    if (admin === 'true') setIsAdmin(true);
     if (adminexport === 'true') setIsAdminExport(true);
    if (to) {
      const decodedName = decodeURIComponent(to);
      setGuestName(decodedName);

      // Check if already RSVP'd
      fetch(`http://localhost:8080/api/rsvp/exists?name=${encodeURIComponent(decodedName)}`)
        .then(res => res.json())
        .then(data => {
          setHasRSVPed(data);
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, []);

   if (isAdmin) return <Admin />;
   if(isAdminExport) return  <AdminPage />;
   if (checking) return <p>Checking RSVP status...</p>;

  return (
    <div className="min-h-screen bg-pink-50 text-center p-6">
      <h1 className="text-4xl font-bold">Marianne and Bryan's Wedding</h1>
      <p className="text-lg mt-2">Dear {guestName || 'Guest'}, you are invited!</p>

      <div className="my-6">
        <p>Date: 01 November 2025</p>
        <p>Location: Miri</p>
      </div>

        {hasRSVPed ? (
        <p className="mt-4 text-green-600 font-semibold">You have already submitted your RSVP!</p>
      ) : (
        <RSVPForm guestName={guestName} />
      )}
    </div>
  );
}

function App() {
 return (
  <Routes>
   <Route path="/" element={<HomePage />} />
   <Route path="/adminexport" element={<AdminPage />} />
   <Route path="/admin" element={<Admin />} />
  </Routes>
 );
}

export default App;