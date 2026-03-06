function showScreen(id) {
    const currentActive = document.querySelector('.screen.active');
    if (currentActive) {
        currentActive.style.opacity = '0';
        currentActive.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            currentActive.classList.remove('active');
            activateNewScreen(id);
        }, 300);
    } else {
        activateNewScreen(id);
    }
}

function activateNewScreen(id) {
    const target = document.getElementById(id);
    if (target) {
        target.style.opacity = '0';
        target.style.transform = 'translateY(20px)';
        target.classList.add('active');

        // Force reflow
        target.offsetHeight;

        target.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        window.scrollTo(0, 0);

        // Re-run reveal check
        revealElements();
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

        // Redireciona direto para a página de vendas após concluir a análise
        setTimeout(() => {
            window.location.href = 'vendas.html';
        }, 1000); // 1 segundo extra para o usuário ver a confirmação
    }, 2500); // 2.5 seconds analyzing
}
