// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// TODO: what the fuck is this

#[allow(unused_imports)]
use window_vibrancy::{apply_blur, apply_mica, apply_vibrancy, NSVisualEffectMaterial};

use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

static mut IS_WINDOW_PINNED: bool = false;

#[tauri::command]
fn set_pin(value: bool) {
    unsafe {
        IS_WINDOW_PINNED = value;
    }
}

fn main() {
    let open_devtoys =
        CustomMenuItem::new("open_devtoys".to_string(), "Open DevToys").accelerator("Alt+Space");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");

    let system_tray_menu = SystemTrayMenu::new()
        .add_item(open_devtoys)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_pin])
        .setup(|app| {
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            let window = app.get_window("main").unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, Some(8_f64))
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            Ok(())
        })
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "open_devtoys" => {
                    let window = app.get_window("main").unwrap();

                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
                _ => {}
            },

            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                // toggle application window
                if window.is_visible().unwrap() {
                    window.hide().unwrap();
                } else {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
            _ => {}
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => unsafe {
                if !is_focused && !IS_WINDOW_PINNED {
                    event.window().hide().unwrap();
                }
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
