import confetti from 'canvas-confetti';

export const runFireworks = () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;

    var defaults = {
        startVelocity: 30, spread: 360, ticks: 60, zIndex: 0
    }

    function randomImage(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeleft = animationEnd - Date.now();

        if (timeleft <=0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeleft / duration);

        confetti(Object.assign({}, defaults, {particleCount, origin: { x: randomImage(0.1, 0.3), y: Math.random() - 0.2}}));
        
        confetti(Object.assign({}, defaults, {particleCount, origin: { x: randomImage(0.1, 0.3), y: Math.random() - 0.2}}));
    }, 250)
}