(() => {
    if (window.__VSC_LOADED__) return;
    window.__VSC_LOADED__ = true;

    let enabled = false;
    let speed = 1;

    function getMedia() {
        return [
            ...document.querySelectorAll("video"),
            ...document.querySelectorAll("audio")
        ];
    }

    function applySpeed(media) {
        if (!media) return;

        const targetSpeed = enabled ? speed : 1;

        if (media.playbackRate !== targetSpeed) {
            try {
                media.playbackRate = targetSpeed;
            } catch (e) {
                console.debug("[VSC] Could not change playback rate");
            }
        }
    }

    function applyToAll() {
        getMedia().forEach(applySpeed);
    }

    // Detect newly created video/audio elements without constantly
    // rewriting playbackRate.
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (!(node instanceof Element)) continue;

                if (
                    node.matches?.("video, audio") ||
                    node.querySelector?.("video, audio")
                ) {
                    applyToAll();
                    return;
                }
            }
        }
    });

    if (document.documentElement) {
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    // Apply whenever media starts playing.
    document.addEventListener(
        "play",
        event => {
            if (event.target instanceof HTMLMediaElement) {
                applySpeed(event.target);
            }
        },
        true
    );

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

        if (message.type === "SET_POWER") {
            enabled = Boolean(message.enabled);

            applyToAll();

            sendResponse({
                success: true,
                enabled
            });

            return;
        }

        if (message.type === "SET_SPEED") {
            const requestedSpeed = Number(message.speed);

            if (!Number.isFinite(requestedSpeed)) {
                sendResponse({
                    success: false,
                    error: "Invalid speed"
                });
                return;
            }

            speed = Math.max(1, Math.min(16, requestedSpeed));
            enabled = true;

            applyToAll();

            sendResponse({
                success: true,
                speed,
                enabled
            });

            return;
        }

        if (message.type === "GET_STATUS") {
            sendResponse({
                success: true,
                enabled,
                speed,
                mediaCount: getMedia().length
            });

            return;
        }
    });

    chrome.storage.local.get(
        ["videoSpeedEnabled", "videoSpeed"],
        result => {
            enabled = result.videoSpeedEnabled ?? false;
            speed = result.videoSpeed ?? 1;

            applyToAll();
        }
    );

    console.log("[VSC] Video Speed Controller loaded");
})();