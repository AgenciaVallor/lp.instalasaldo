function showScreen(id) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Show target screen
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}

function startQuiz() {
    showScreen('screen-q1');
}

function selectOption(btn, questionNumber) {
    // Determine current screen options
    const screen = document.getElementById(`screen-q${questionNumber}`);
    const options = screen.querySelectorAll('.option-btn');

    // Remove "selected" from all
    options.forEach(opt => opt.classList.remove('selected'));

    // Add "selected" to clicked
    btn.classList.add('selected');

    // After a short delay, go to next question
    setTimeout(() => {
        const nextQ = questionNumber + 1;
        if (nextQ <= 6) {
            showScreen(`screen-q${nextQ}`);
        } else {
            // Finished quiz, show analyzing
            showScreen('screen-analyzing');
            startAnalysis();
        }
    }, 400); // 400ms delay for visual feedback
}

function startAnalysis() {
    // Simulate analyzing time
    setTimeout(() => {
        // Change text or stop spinner if we want, but let's just reveal the button
        const btnContainer = document.getElementById('btn-result');
        const spinner = document.querySelector('.spinner');

        spinner.style.borderTopColor = 'var(--green)'; // Change color when done
        spinner.style.animation = 'none'; // Stop spinning
        spinner.style.transform = 'rotate(45deg)'; // Make it look like a check or just static

        // Let's replace spinner with a check icon
        spinner.outerHTML = `
            <div style="width: 60px; height: 60px; border-radius: 50%; background-color: var(--green); display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--white)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        `;

        document.querySelector('#screen-analyzing h2').textContent = "Pronto! Análise Concluída";
        document.querySelector('#screen-analyzing p').textContent = "Identificamos o seu perfil de vendedor.";

        btnContainer.style.display = 'flex';
    }, 2500); // 2.5 seconds analyzing
}
