# Video Speed Controller

Control HTML5 video and audio playback speed directly from a lightweight Chrome extension. Toggle playback control on or off and switch between 1x and 16x speed from the extension popup.

## Features

- Supports HTML5 `<video>` and `<audio>` elements.
- Provides 1x and 16x speed presets in the popup.
- Keeps the selected speed and enabled state between browser sessions.
- Detects media added dynamically to a page.
- Applies the selected speed when media begins playing.
- Reports the number of media elements detected on the active page.
- Built with Manifest V3 and no external dependencies.

## Installation

This project is currently distributed as an unpacked extension for development and personal use.

1. Clone or download this repository.
2. Open `chrome://extensions` in Google Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project directory.

The extension should now appear in Chrome. Pin it from the Extensions menu for quick access.

## Usage

1. Open a page containing HTML5 video or audio.
2. Open the **Video Speed Controller** popup.
3. Select **16x** to enable accelerated playback, or select **1x** to return to normal speed.
4. Use the **ON/OFF** control to enable or disable speed control while preserving the selected speed.

The extension applies settings to media elements in the active tab, including media that is added after the page loads.

## Project Structure

| File | Purpose |
| --- | --- |
| `manifest.json` | Chrome Manifest V3 configuration and permissions. |
| `popup.html` | Popup layout and controls. |
| `popup.css` | Popup styling. |
| `popup.js` | Popup state, storage, and messaging logic. |
| `content.js` | Applies playback speed changes to media on web pages. |

## Technical Notes

- Settings are stored with Chrome's local storage API.
- The content script observes the page for newly created media elements.
- Playback speed is constrained to the range from 1x through 16x.
- The extension requires access to the active tab to communicate with the current page.

## Development

After changing the source files:

1. Return to `chrome://extensions`.
2. Locate **Video Speed Controller**.
3. Click **Reload**.
4. Reopen the extension popup and test it on a page with media.

## Contributing

Bug reports and focused improvements are welcome. Please describe the affected browser behavior and include clear reproduction steps when opening an issue or pull request.
