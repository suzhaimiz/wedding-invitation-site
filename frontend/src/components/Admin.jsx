import { useState, useEffect } from 'react';

function Admin() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [invitees, setInvitees] = useState([]);

  const fetchInvitees = async () => {
    const res = await fetch('http://localhost:8080/api/invitee');
    const data = await res.json();
    setInvitees(data);
  };

  useEffect(() => {
    fetchInvitees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/invitee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const text = await res.text();
    setUrl(text);
    setName('');
    fetchInvitees();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter invitee name"
          className="p-2 border mr-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="p-2 bg-green-600 text-white">Generate Link</button>
      </form>
      {url && <p className="mb-4">Generated URL: <a href={url} className="text-blue-500 underline">{url}</a></p>}

      <h2 className="text-xl font-semibold mb-2">Invitee List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">URL</th>
          </tr>
        </thead>
        <tbody>
          {invitees.map((inv, idx) => (
            <tr key={inv.id} className="text-center">
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{inv.name}</td>
              <td className="p-2 border">
                <a
                  href={`http://localhost:5173/?to=${encodeURIComponent(inv.name)}`}
                  className="text-blue-500 underline"
                >
                  Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
