import { useState } from 'react';
import axios from 'axios';

export default function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5050/summarize', { text });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary('An error occurred while summarizing.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Text Summarizer</h2>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={6}
        placeholder="Enter your paragraph here..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSummary('');
        }}
      />
      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !text.trim()}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {summary && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">{summary}</div>
      )}
    </div>
  );
}
