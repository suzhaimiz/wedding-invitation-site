import { useState } from 'react';

function RSVPForm({ guestName }) {
  const [attending, setAttending] = useState('yes');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: guestName, attending }),
    });

    if (response.status === 409) {
      alert('You have already responded!');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) return <p className="mt-4">Thank you for your RSVP!</p>;

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block mb-2">Will you attend?</label>
      <select value={attending} onChange={(e) => setAttending(e.target.value)} className="p-2">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
}

export default RSVPForm;