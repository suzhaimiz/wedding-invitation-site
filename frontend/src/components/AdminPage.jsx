import { useEffect, useState } from 'react';

function AdminPage() {
 const [rsvps, setRsvps] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  const fetchRsvps = async () => {
   try {
    setIsLoading(true);
    const response = await fetch('http://localhost:8080/api/rsvp/all');
    if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setRsvps(data);
    setError(null);
   } catch (e) {
    console.error("Failed to fetch RSVPs:", e);
    setError(e.message);
   } finally {
    setIsLoading(false);
   }
  };
  fetchRsvps();
 }, []);

 const handleExportXlsx = () => {
  // Directly link to the backend endpoint for download
  window.location.href = 'http://localhost:8080/api/rsvp/export/excel';
 };

 if (isLoading) return <p className="p-6 text-center">Loading guest list...</p>;
 if (error) return <p className="p-6 text-center text-red-500">Error loading guest list: {error}</p>;

 return (
  <div className="p-6 bg-gray-100 min-h-screen">
   <div className="container mx-auto">
    <div className="flex justify-between items-center mb-6">
     <h2 className="text-3xl font-bold text-gray-700">Admin - Guest List</h2>
     <button
      onClick={handleExportXlsx}
      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
     >
      Export as XLSX
     </button>
     
    </div>


    {rsvps.length === 0 ? (
     <p className="text-gray-600">No RSVPs received yet.</p>
    ) : (
     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
       <thead>
        <tr>
         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Name
         </th>
         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Attending
         </th>
         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          ID (for reference)
         </th>
        </tr>
       </thead>
       <tbody>
        {rsvps.map((rsvp) => (
         <tr key={rsvp.id}>
          <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
           <p className="text-gray-900 whitespace-no-wrap">{rsvp.name || 'N/A'}</p>
          </td>
          <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
           <p className="text-gray-900 whitespace-no-wrap">{rsvp.attending}</p>
          </td>
          <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
           <p cassName="text-gray-900 whitespace-no-wrap">{rsvp.id}</p>
          </td>
            
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    )}
   </div>
  </div>
 );
}

export default AdminPage;