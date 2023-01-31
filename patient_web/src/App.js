import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Video from "./components/video";
import PreVideo from "./components/preVideo";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PreVideo />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
