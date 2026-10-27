
/* ==========================================
   NOVA — RESPONSIVE STARFIELD & COMETS
   Smooth, corner-to-corner cosmic motion
   ========================================== */

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let stars = [];
let comets = [];
let width = 0;
let height = 0;
let animationFrame = null;
let lastCometTime = 0;
let previousFrameTime = 0;

const STAR_COUNT = 110;
const COMET_INTERVAL = 2000;

function resizeStarfield() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.1 + 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.025 + 0.008,
        phase: Math.random() * Math.PI * 2
    }));

    comets = [];
    lastCometTime = 0;
    previousFrameTime = 0;

    ctx.clearRect(0, 0, width, height);
}

function createComet(time) {
    // Travel from one corner to the opposite corner.
    // This adapts automatically to portrait and landscape screens.
    const direction = Math.random() < 0.5 ? 1 : -1;

    const startX = direction === 1 ? -20 : width + 20;
    const startY = -20;

    const endX = direction === 1 ? width + 20 : -20;
    const endY = height + 20;

    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.hypot(dx, dy);

    // Longer screens take a little longer to cross.
    const duration = Math.max(1400, Math.min(2800, distance * 2.2));

    comets.push({
        startX,
        startY,
        dx,
        dy,
        distance,
        startTime: time,
        duration,
        tailLength: Math.max(65, Math.min(145, distance * 0.09)),
        size: 1.2 + Math.random() * 1.1
    });
}

function drawComet(comet, time) {
    const progress = Math.min(
        1,
        Math.max(0, (time - comet.startTime) / comet.duration)
    );

    // Linear progress keeps the comet moving at a steady speed.
    const headX = comet.startX + comet.dx * progress;
    const headY = comet.startY + comet.dy * progress;

    const unitX = comet.dx / comet.distance;
    const unitY = comet.dy / comet.distance;

    const tailX = headX - unitX * comet.tailLength;
    const tailY = headY - unitY * comet.tailLength;

    // Fade gently at the beginning and end of the flight.
    const fadeIn = Math.min(1, progress / 0.08);
    const fadeOut = Math.min(1, (1 - progress) / 0.12);
    const opacity = Math.max(0, Math.min(fadeIn, fadeOut));

    const gradient = ctx.createLinearGradient(
        headX, headY, tailX, tailY
    );

    gradient.addColorStop(
        0,
        `rgba(245, 240, 255, ${0.95 * opacity})`
    );
    gradient.addColorStop(
        0.22,
        `rgba(169, 145, 255, ${0.65 * opacity})`
    );
    gradient.addColorStop(
        0.65,
        `rgba(107, 137, 255, ${0.24 * opacity})`
    );
    gradient.addColorStop(1, "rgba(107, 137, 255, 0)");

    ctx.save();

    ctx.lineCap = "round";
    ctx.lineWidth = comet.size;
    ctx.strokeStyle = gradient;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `rgba(160, 135, 255, ${0.65 * opacity})`;

    ctx.beginPath();
    ctx.moveTo(headX, headY);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    // Bright, small comet head.
    ctx.shadowBlur = 13;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

    ctx.beginPath();
    ctx.arc(headX, headY, comet.size * 1.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawFrame(time) {
    ctx.clearRect(0, 0, width, height);

    const delta = previousFrameTime
        ? Math.min(time - previousFrameTime, 40)
        : 16.67;

    previousFrameTime = time;

    // Twinkling background stars.
    for (const star of stars) {
        const twinkle =
            0.78 + Math.sin(time * 0.0008 + star.phase) * 0.22;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 200, 255, ${star.alpha * twinkle})`;
        ctx.fill();

        star.y += star.speed * delta;

        if (star.y > height + 2) {
            star.y = -2;
            star.x = Math.random() * width;
        }
    }

    // Spawn comets at regular intervals.
    if (!lastCometTime) {
        lastCometTime = time;
    } else if (time - lastCometTime >= COMET_INTERVAL) {
        createComet(time);
        lastCometTime = time;
    }

    // Keep each comet until its full flight is finished.
    comets = comets.filter((comet) => {
        const progress = (time - comet.startTime) / comet.duration;

        if (progress >= 1) {
            return false;
        }

        drawComet(comet, time);
        return true;
    });

    if (!reduceMotion.matches) {
        animationFrame = requestAnimationFrame(drawFrame);
    }
}

function startStarfield() {
    if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }

    previousFrameTime = 0;

    if (reduceMotion.matches) {
        comets = [];
        ctx.clearRect(0, 0, width, height);
        return;
    }

    animationFrame = requestAnimationFrame(drawFrame);
}

resizeStarfield();
startStarfield();

window.addEventListener("resize", () => {
    resizeStarfield();
    startStarfield();
});

reduceMotion.addEventListener?.("change", startStarfield);
