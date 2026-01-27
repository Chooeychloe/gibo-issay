import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Gallery from "./pages/Gallery";
import RSVP from "./pages/RSVP";
import Entourage from "./pages/Entourage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-center gap-6 p-4 bg-white shadow">
        <Link to="/" className="text-indigo-900 font-semibold">
          Gallery
        </Link>
        {/* <Link to="/rsvp" className="text-indigo-900 font-semibold">
          RSVP
        </Link> */}
        <Link to="/entourage" className="text-indigo-900 font-semibold">
          Entourage
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/entourage" element={<Entourage />} />
      </Routes>
    </BrowserRouter>
  );
}
