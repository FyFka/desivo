#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_cached_token() -> String {
    "Token".into()
}

#[tauri::command]
fn set_cached_token(value: &str) -> String {
    format!("GOT, {} <-token", value)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_cached_token, set_cached_token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
