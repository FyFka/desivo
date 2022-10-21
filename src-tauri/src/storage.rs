use std::fs::File;
use std::io::{Write, Read};
use std::io::Result;
use magic_crypt::{MagicCryptTrait, new_magic_crypt};


pub fn save_token(token: &str) -> Result<bool>{
  let mcrypt = new_magic_crypt!("secured-token", 256);
  let encrypted_token = mcrypt.encrypt_str_to_base64(token);
  let mut file = File::create("user.sec")?;
  file.write_all( encrypted_token.as_bytes())?;
  Ok(true)
}

pub fn read_token() -> Result<String> {
  let mcrypt = new_magic_crypt!("secured-token", 256);
  let mut file = File::open("user.sec")?;
  let mut buffer = String::new();
  file.read_to_string(&mut buffer)?;
  let decrypted_token = mcrypt.decrypt_base64_to_string(&buffer).unwrap();
  Ok(decrypted_token)
}

