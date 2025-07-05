const btn  = document.querySelector('.hamburger-btn');
    const menu = document.querySelector('.hamburger-menu');

    btn.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Click outside to close
    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
        }
    });


const answers = {
    q1: "B",
    q2: "B",
    q3: "C",
    q4: "same-origin policy",
    q5: ["sandboxing", "sameOrigin"]
    };

    function gradeQuiz(formData) {
    const results = [];
    let score = 0;

    // Q1–Q3
    ["q1","q2","q3"].forEach(q => {
        const user = formData.get(q);
        const correct = answers[q];
        const ok = user === correct;
        results.push({
        q,
        type: "single",
        user: user || "None",
        correct,
        ok
        });
        if (ok) score++;
    });

    // Q4
    const user4 = (formData.get("q4")||"").trim().toLowerCase();
    const ok4 = user4 === answers.q4;
    results.push({
        q: "q4",
        type: "text",
        user: formData.get("q4"),
        correct: answers.q4,
        ok: ok4
    });
    if (ok4) score++;

    // Q5
    const user5 = formData.getAll("q5");
    // sort for comparison
    const sortedUser5 = user5.sort();
    const sortedCorrect5 = answers.q5.slice().sort();
    const ok5 = JSON.stringify(sortedUser5) === JSON.stringify(sortedCorrect5);
    results.push({
        q: "q5",
        type: "multi",
        user: user5.length ? user5.join(", ") : "None",
        correct: answers.q5.join(", "),
        ok: ok5
    });
    if (ok5) score++;

    return { results, score };
    }

    document.getElementById("quizForm").addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { results, score } = gradeQuiz(formData);

    // details
    const det = document.getElementById("details");
    det.innerHTML = "";
    results.forEach(r => {
        const div = document.createElement("div");
        div.innerHTML = `
        <p>
            <strong>Question ${r.q.slice(1)}:</strong>
            Your answer: <span class="${r.ok ? "correct" : "incorrect"}">${r.user}</span><br>
            Correct answer: <em>${r.correct}</em>
        </p>`;
        det.appendChild(div);
    });

    // show score 
    document.getElementById("score").textContent = score;
    document.getElementById("outcome").textContent = score >= 3 ? "Pass" : "Fail";

    // toggle visibility
    document.getElementById("quizForm").hidden = true;
    document.getElementById("results").hidden = false;
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
    document.getElementById("quizForm").reset();
    document.getElementById("quizForm").hidden = false;
    document.getElementById("results").hidden = true;
    });    