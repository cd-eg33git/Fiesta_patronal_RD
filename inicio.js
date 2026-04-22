(function () {
    const feriaStart = new Date(2026, 5, 22, 0, 0, 0);
    const feriaEnd = new Date(2026, 5, 25, 23, 59, 59);
    const day22Start = new Date(2026, 5, 22, 0, 0, 0);
    const day22End = new Date(2026, 5, 22, 23, 59, 59);
    const strongDaysStart = new Date(2026, 5, 23, 0, 0, 0);
    const strongDaysEnd = new Date(2026, 5, 24, 23, 59, 59);
    const closeDayStart = new Date(2026, 5, 25, 0, 0, 0);
    const closeDayEnd = new Date(2026, 5, 25, 23, 59, 59);
    const afterFair = new Date(2026, 5, 26, 0, 0, 0);

    const title = document.getElementById('estado-feria-titulo');
    const text = document.getElementById('estado-feria-texto');
    const panelTitle = document.getElementById('panel-title');
    const panelText = document.getElementById('panel-text');
    const countdownCard = document.getElementById('countdown-card');
    const fxRoot = document.getElementById('fx-root');

    if (!title || !text || !panelTitle || !panelText || !countdownCard || !fxRoot) {
        return;
    }

    const now = new Date();
    let timer;

    function setCountdown(diff) {
        const totalSeconds = Math.max(0, Math.floor(diff / 1000));
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        document.getElementById('dias').textContent = String(days);
        document.getElementById('horas').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutos').textContent = String(minutes).padStart(2, '0');
        document.getElementById('segundos').textContent = String(seconds).padStart(2, '0');
    }

    function updateCountdown() {
        const diff = feriaStart.getTime() - Date.now();
        if (diff <= 0) {
            countdownCard.querySelector('.countdown-label').textContent = 'La feria ya comenzó';
            setCountdown(0);
            if (timer) {
                clearInterval(timer);
            }
            return;
        }
        setCountdown(diff);
    }

    function randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    function createParticle(className, styles, removeAfter) {
        const el = document.createElement('span');
        el.className = className;
        Object.assign(el.style, styles);
        fxRoot.appendChild(el);
        window.setTimeout(() => el.remove(), removeAfter);
    }

    function launchConfetti(total, duration) {
        const colors = ['#ffd166', '#ff7b7b', '#7ce7ff', '#8eff9c', '#ffffff', '#ffa64d'];
        for (let i = 0; i < total; i += 1) {
            window.setTimeout(() => {
                createParticle(
                    'particle',
                    {
                        left: `${Math.random() * 100}%`,
                        background: randomItem(colors),
                        animationDuration: `${4 + Math.random() * 3}s`,
                        transform: `rotate(${Math.random() * 180}deg)`,
                        '--drift': `${Math.random() * 120 - 60}px`
                    },
                    7600
                );
            }, Math.random() * duration);
        }
    }

    function launchBalloons(total, duration) {
        const colors = ['#ff6b6b', '#ffd166', '#6bcBef', '#8ce99a', '#c77dff'];
        for (let i = 0; i < total; i += 1) {
            window.setTimeout(() => {
                createParticle(
                    'balloon',
                    {
                        left: `${Math.random() * 100}%`,
                        bottom: '-80px',
                        background: randomItem(colors),
                        animationDuration: `${7 + Math.random() * 4}s`,
                        '--drift': `${Math.random() * 120 - 60}px`
                    },
                    12000
                );
            }, Math.random() * duration);
        }
    }

    function launchFireworks(total, duration) {
        const colors = ['#ffd166', '#ff758f', '#7ce7ff', '#ffffff', '#ff9f1c'];
        for (let i = 0; i < total; i += 1) {
            window.setTimeout(() => {
                createParticle(
                    'firework-burst',
                    {
                        left: `${10 + Math.random() * 80}%`,
                        top: `${8 + Math.random() * 44}%`,
                        color: randomItem(colors)
                    },
                    1200
                );
            }, Math.random() * duration);
        }
    }

    function startCelebration(options) {
        const duration = options.duration || 6000;
        if (options.confetti) {
            launchConfetti(options.intense ? 160 : 110, duration);
        }
        if (options.balloons) {
            launchBalloons(options.intense ? 26 : 18, duration);
        }
        if (options.fireworks) {
            launchFireworks(options.intense ? 18 : 10, duration);
        }
    }

    function setFinishedMessage() {
        countdownCard.querySelector('.countdown-label').textContent = 'Edición finalizada';
        document.getElementById('countdown').innerHTML =
            '<div class="time-box" style="grid-column:1 / -1;"><span>Gracias</span><small>Nos vemos en una próxima edición</small></div>';
    }

    function paintState(state) {
        if (state === 'before') {
            title.textContent = 'La cuenta regresiva ya comenzó';
            text.textContent = 'Nos estamos preparando para vivir una feria llena de fe, tradición, música y convivencia familiar.';
            panelTitle.textContent = 'Preparativos en marcha';
            panelText.textContent = 'El 22 de junio de 2026 inicia oficialmente la feria. Guarda la fecha y comparte la invitación.';
            updateCountdown();
            timer = window.setInterval(updateCountdown, 1000);
            return;
        }

        countdownCard.querySelector('.countdown-label').textContent = 'Estado de la feria';
        setCountdown(0);

        if (state === 'day22') {
            document.body.classList.add('celebracion-dia-22');
            title.textContent = 'Hoy inicia la feria';
            text.textContent = 'Bienvenidos al arranque de la Feria de Rafael Delgado 2026. Que se viva con alegría, tradición y mucha participación.';
            panelTitle.textContent = 'Inicio oficial';
            panelText.textContent = 'Al entrar a la página se activa una celebración especial con confeti, globos y fuegos artificiales.';
            startCelebration({ confetti: true, balloons: true, fireworks: true, duration: 7000 });
            return;
        }

        if (state === 'strong') {
            document.body.classList.add('celebracion-dia-fuerte');
            title.textContent = 'Estamos en el mero día de la feria';
            text.textContent = 'Hoy 23 o 24 de junio de 2026 la celebración está en su punto más fuerte. Disfruta la fiesta y comparte este momento.';
            panelTitle.textContent = 'Días grandes de celebración';
            panelText.textContent = 'La entrada despliega un ambiente más intenso con fuegos, confeti y globos para resaltar los días más importantes.';
            startCelebration({ confetti: true, balloons: true, fireworks: true, duration: 9000, intense: true });
            return;
        }

        if (state === 'close') {
            document.body.classList.add('cierre-feria');
            title.textContent = 'Hoy cierra la feria';
            text.textContent = 'Gracias por acompañar la Feria de Rafael Delgado 2026. Hoy despedimos esta edición con un ambiente festivo y globos al entrar.';
            panelTitle.textContent = 'Cierre de feria';
            panelText.textContent = 'El 25 de junio mantenemos una celebración más tranquila con globos, ideal para el cierre de esta gran fiesta.';
            startCelebration({ balloons: true, duration: 7000 });
            return;
        }

        title.textContent = 'La feria ya pasó';
        text.textContent = 'La edición 2026 ya concluyó. Gracias a todas las personas que fueron parte de esta celebración en Rafael Delgado.';
        panelTitle.textContent = 'Evento finalizado';
        panelText.textContent = 'Desde el 26 de junio de 2026 ya no se muestran efectos en pantalla y el sitio queda en modo de cierre.';
        setFinishedMessage();
    }

    let state = 'after';
    if (now < feriaStart) {
        state = 'before';
    } else if (now >= day22Start && now <= day22End) {
        state = 'day22';
    } else if (now >= strongDaysStart && now <= strongDaysEnd) {
        state = 'strong';
    } else if (now >= closeDayStart && now <= closeDayEnd) {
        state = 'close';
    } else if (now >= afterFair || now > feriaEnd) {
        state = 'after';
    }

    paintState(state);
})();
