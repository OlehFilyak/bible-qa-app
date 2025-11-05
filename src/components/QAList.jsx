// src/components/QAList.jsx
import { useState } from "react";

export default function QAList({ questions }) {
    return (
        <div className="space-y-4">
            {questions.map((item, index) => (
                <QAItem key={index} index={index + 1} q={item.q} a={item.a} />
            ))}
        </div>
    );
}

function QAItem({ index, q, a }) {
    const [show, setShow] = useState(false);
    return (
        <div className="border p-4 rounded shadow">
            <p className="font-semibold">{index}. {q}</p>
            {show && <p className="mt-2 text-gray-700">{a}</p>}
            <button
                onClick={() => setShow(!show)}
                className="mt-2 text-blue-600 hover:underline"
            >
                {show ? "Згорнути відповідь" : "Показати відповідь"}
            </button>
        </div>
    );
}
