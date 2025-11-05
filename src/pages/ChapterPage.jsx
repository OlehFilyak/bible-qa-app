import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import data from "../data/questions.json";

export default function ChapterPage() {
    const { chapterId } = useParams();
    const navigate = useNavigate();

    const all = Array.isArray(data) ? data : [data];

    const chapters = useMemo(() => {
        const arr = all
            .map(c => ({ ...c, chapter: Number(c.chapter) }))
            .filter(c => !Number.isNaN(c.chapter))
            .sort((a, b) => a.chapter - b.chapter);
        return arr;
    }, [all]);

    const minChapter = chapters.length ? chapters[0].chapter : 1;
    const maxChapter = chapters.length ? chapters[chapters.length - 1].chapter : 1;

    const num = Number(chapterId || minChapter);
    const chapter = chapters.find(c => c.chapter === num) || null;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [num]);

    const [open, setOpen] = useState({});
    const toggle = (i) => setOpen(prev => ({ ...prev, [i]: !prev[i] }));

    const goPrev = () => num > minChapter && navigate(`/chapter/${num - 1}`);
    const goNext = () => num < maxChapter && navigate(`/chapter/${num + 1}`);

    if (!chapter) {
        return (
            <div className="container">
                <h2>Глава не найдена</h2>
                <button className="btn btn-danger" onClick={() => navigate(`/chapter/${minChapter}`)}>
                    На первую главу
                </button>
            </div>
        );
    }

    const questions = Array.isArray(chapter.questions) ? chapter.questions : [];

    return (
        <div className="container">
            <h1>
                {chapter.title
                    ? `Глава ${chapter.chapter}: ${chapter.title}`
                    : `Глава ${chapter.chapter}`}
            </h1>

            <div className="question-list">
                {questions.map((item, idx) => (
                    <div key={idx} className="card">
                        <div className="q">Вопрос {idx + 1}: {item.q}</div>

                        <button className="btn btn-primary" onClick={() => toggle(idx)}>
                            {open[idx] ? "Скрыть ответ" : "Показать ответ"}
                        </button>

                        {open[idx] && (
                            <div className="a">
                                <strong>Ответ:</strong> {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="nav">
                <button className="btn btn-danger" onClick={goPrev} disabled={num <= minChapter}>
                    ← Предыдущая глава
                </button>

                <button className="btn btn-danger" onClick={goNext} disabled={num >= maxChapter}>
                    Следующая глава →
                </button>
            </div>
        </div>
    );
}
