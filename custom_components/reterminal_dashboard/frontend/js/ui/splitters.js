/**
 * Handles panel resizing via draggable splitters.
 */
(function () {
    function init() {
        const leftResizer = document.getElementById('resizer-left');
        const rightResizer = document.getElementById('resizer-right');
        const sidebar = document.querySelector('.sidebar');
        const rightPanel = document.querySelector('.right-panel');
        const appContent = document.querySelector('.app-content');

        if (!leftResizer || !rightResizer || !sidebar || !rightPanel) {
            console.warn("[Splitters] Layout elements not found, retrying...");
            setTimeout(init, 500);
            return;
        }

        console.log("[Splitters] Initializing draggable panels...");

        function setupResizer(resizer, target, orientation) {
            let startPos, startSize;

            resizer.addEventListener('mousedown', function (e) {
                if (orientation === 'vertical') {
                    startPos = e.clientX;
                    startSize = target.offsetWidth;
                    document.body.style.cursor = 'col-resize';
                } else {
                    startPos = e.clientY;
                    startSize = target.offsetHeight;
                    document.body.style.cursor = 'row-resize';
                }

                resizer.classList.add('dragging');
                document.body.style.userSelect = 'none';

                function onMouseMove(moveE) {
                    let delta;
                    if (orientation === 'vertical') {
                        delta = moveE.clientX - startPos;
                        // For right panel, delta is inverted
                        if (resizer.id === 'resizer-right') delta = -delta;

                        const newWidth = startSize + delta;
                        const min = parseInt(getComputedStyle(target).minWidth) || 100;
                        const max = parseInt(getComputedStyle(target).maxWidth) || 800;

                        if (newWidth >= min && newWidth <= max) {
                            target.style.width = newWidth + 'px';
                        }
                    } else {
                        // Horizontal resizer (bottom panel)
                        delta = startPos - moveE.clientY; // Inverted because panel is at the bottom

                        const newHeight = startSize + delta;
                        const min = parseInt(getComputedStyle(target).minHeight) || 50;
                        const max = parseInt(getComputedStyle(target).maxHeight) || 800;

                        if (newHeight >= min && newHeight <= max) {
                            target.style.height = newHeight + 'px';
                        }
                    }

                    if (window.dispatchEvent) window.dispatchEvent(new Event('resize'));
                }

                function onMouseUp() {
                    resizer.classList.remove('dragging');
                    document.body.style.cursor = 'default';
                    document.body.style.userSelect = '';
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                }

                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
            });
        }

        const bottomResizer = document.getElementById('resizer-bottom');
        const codePanel = document.querySelector('.code-panel');

        setupResizer(leftResizer, sidebar, 'vertical');
        setupResizer(rightResizer, rightPanel, 'vertical');
        if (bottomResizer && codePanel) {
            setupResizer(bottomResizer, codePanel, 'horizontal');
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
