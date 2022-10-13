use std::fs::File;
use std::io::{Write, Read};


pub fn save_token(token: &str) -> bool{
  let mut file = File::create("token.txt").expect("Error creating file");
  file.write_all( token.as_bytes()).expect("Error writing a file");
  return true;
}

pub fn read_token() -> String {
  let mut file = File::open("token.txt").expect("Error opening file");
  let mut data = String::new();
  file.read_to_string(&mut data).expect("Error reading file");
  return data;
}

