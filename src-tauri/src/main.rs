#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use handlers::*;

mod handlers;
mod storage;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_cached_token, get_cached_token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
