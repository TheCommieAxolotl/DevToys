/* @refresh reload */
import { render } from "solid-js/web";

import App from "~/App";

import "./styles.scss";

import { isRegistered, register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { window as tauriWindow } from "@tauri-apps/api";
import { platform } from "@tauri-apps/api/os";

declare global {
    interface Window {
        Current: tauriWindow.WebviewWindow;
        Global: {
            platform: "macos" | "windows" | "linux";
        };
    }
}

(async () => {
    window.Current = tauriWindow.getCurrent();

    const platformName = await platform();

    window.Global = {
        platform: platformName === "darwin" ? "macos" : platformName === "win32" ? "windows" : "linux",
    };

    if (await isRegistered("Alt+Space")) {
        unregisterAll();
    }

    await register("Alt+Space", async () => {
        const win = tauriWindow.getCurrent();

        if (await win.isVisible()) {
            win.hide();
        } else {
            await win.show();
            win.setFocus();
        }
    });
})();

render(() => <App />, document.getElementById("root") as HTMLElement);
