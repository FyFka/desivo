use crate::storage::*;

#[tauri::command]
pub fn get_cached_token() -> String {
    match read_token() {
        Ok(token) => token.into(),
        Err(_err) => "".into()
    }
}

#[tauri::command]
pub fn set_cached_token(token: &str) -> bool {
    match save_token(&token){
        Ok(result) => result.into(),
        Err(_err) => false.into()
    }    
}
