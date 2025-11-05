// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChapterPage from "./pages/ChapterPage";
import data from "./data/questions.json";

const chapters = Array.isArray(data)
    ? data.map(c => Number(c.chapter)).filter(n => !Number.isNaN(n))
    : [];
const minChapter = chapters.length ? Math.min(...chapters) : 1;

function App() {
    return (
        <div className="container">
            <BrowserRouter basename="/bible-qa-app">
                <Routes>
                    <Route path="/" element={<Navigate to={`/chapter/${minChapter}`} replace />} />
                    <Route path="/chapter/:chapterId" element={<ChapterPage />} />
                    {/* fallback на корінь */}
                    <Route path="*" element={<Navigate to={`/chapter/${minChapter}`} replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
