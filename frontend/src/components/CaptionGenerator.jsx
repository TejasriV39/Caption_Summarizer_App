import { useState } from 'react';
import axios from 'axios';

export default function CaptionGenerator() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    setCaption('');
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5050/caption', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCaption(res.data.caption);
    } catch (err) {
      setCaption('Failed to generate caption.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Image Caption Generator</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setCaption('');
        }}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        disabled={loading || !image}
      >
        {loading ? 'Generating...' : 'Generate Caption'}
      </button>
      {caption && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">{caption}</div>
      )}
    </div>
  );
}
