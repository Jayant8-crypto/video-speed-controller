const powerBtn = document.getElementById("powerBtn");
const speed1 = document.getElementById("speed1");
const speed16 = document.getElementById("speed16");
const speedValue = document.getElementById("speedValue");
const mediaStatus = document.getElementById("mediaStatus");

let enabled = false;
let speed = 1;

async function getCurrentTab() {
    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    return tabs[0];
}

async function sendMessage(message) {
    const tab = await getCurrentTab();

    if (!tab?.id) {
        return null;
    }

    try {
        return await chrome.tabs.sendMessage(tab.id, message);
    } catch (error) {
        console.log("Could not communicate with page:", error);
        return null;
    }
}

function updateUI() {
    powerBtn.textContent = enabled ? "ON" : "OFF";

    powerBtn.classList.toggle("on", enabled);
    powerBtn.classList.toggle("off", !enabled);

    speedValue.textContent = `${speed}x`;

    speed1.classList.toggle("active", speed === 1);
    speed16.classList.toggle("active", speed === 16);
}

async function setPower(value) {
    enabled = value;

    await chrome.storage.local.set({
        videoSpeedEnabled: enabled,
        videoSpeed: speed
    });

    await sendMessage({
        type: "SET_POWER",
        enabled
    });

    updateUI();
}

async function setSpeed(value) {
    speed = value;
    enabled = true;

    await chrome.storage.local.set({
        videoSpeedEnabled: true,
        videoSpeed: speed
    });

    await sendMessage({
        type: "SET_SPEED",
        speed
    });

    updateUI();
}

powerBtn.addEventListener("click", () => {
    setPower(!enabled);
});

speed1.addEventListener("click", () => {
    setSpeed(1);
});

speed16.addEventListener("click", () => {
    setSpeed(16);
});

async function initialize() {

    const stored = await chrome.storage.local.get([
        "videoSpeedEnabled",
        "videoSpeed"
    ]);

    enabled = stored.videoSpeedEnabled ?? false;
    speed = stored.videoSpeed ?? 1;

    updateUI();

    const result = await sendMessage({
        type: "GET_STATUS"
    });

    if (result?.success) {
        mediaStatus.textContent =
            `${result.mediaCount} media element(s) detected`;
    } else {
        mediaStatus.textContent =
            "No accessible media detected";
    }
}

initialize();