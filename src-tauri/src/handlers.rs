use crate::storage::*;


#[tauri::command]
pub fn get_cached_token() -> String {
    read_token().into()
}

#[tauri::command]
pub fn set_cached_token(token:&str) -> bool {
    save_token(&token);
    true.into()
}
