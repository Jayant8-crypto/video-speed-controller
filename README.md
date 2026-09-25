# Video Speed Controller

A Chrome extension for controlling HTML5 video and audio playback speed from 1x to 16x.

## Install locally

1. Open `chrome://extensions` in Google Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this project folder.

## Usage

Open the extension popup while viewing a page with video or audio. Use the controls to enable the speed controller and select the desired playback speed.

## Files

- `manifest.json` - Chrome extension configuration.
- `popup.html`, `popup.css`, `popup.js` - Extension popup interface and controls.
- `content.js` - Applies playback speed changes to media elements on web pages.