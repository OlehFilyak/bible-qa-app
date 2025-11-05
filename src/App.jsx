// src/App.jsx
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import ChapterPage from "./pages/ChapterPage";
import data from "./data/questions.json";

// Знаходимо мінімальний номер глави з даних
const chapters = Array.isArray(data)
    ? data.map(c => Number(c.chapter)).filter(n => !Number.isNaN(n))
    : [];
const minChapter = chapters.length ? Math.min(...chapters) : 1;

function App() {
    return (
        <div className="container">
            {/* HashRouter надійно працює на GitHub Pages */}
            <HashRouter>
                <Routes>
                    {/* За замовчуванням — перша доступна глава */}
                    <Route path="/" element={<Navigate to={`/chapter/${minChapter}`} replace />} />
                    <Route path="/chapter/:chapterId" element={<ChapterPage />} />
                    {/* Фолбек на першу главу */}
                    <Route path="*" element={<Navigate to={`/chapter/${minChapter}`} replace />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
