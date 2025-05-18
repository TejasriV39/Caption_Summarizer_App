import Navbar from '../components/Navbar';
import Summarizer from '../components/Summarizer';
import CaptionGenerator from '../components/CaptionGenerator';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        Caption & Summarizer Web App
      </h1>
      <Summarizer />
      <hr className="my-8" />
      <CaptionGenerator />
    </div>
  );
}
