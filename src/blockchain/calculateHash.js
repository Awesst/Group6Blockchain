export async function calculateHash(data) {


  //Basically Janne's kod except that I converted all data to JSON.
  
  const dataString = JSON.stringify(data); // to me (Cathy), the concatenated hash function always resulted in the exact same hash from block 2 onwards, that's why I stringified it instead. 

  // Encode string as an array of 8-bit integers
  const messageInt8 = new TextEncoder().encode(dataString);

  // Calculate the SHA-256 hash of the encoded data
  const hashBuffer = await crypto.subtle.digest("SHA-256", messageInt8);

  // Convert the hash buffer to an array of 8-bit integers
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Convert each integer in the array to a hexadecimal string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Return the hash as a hex string
  return hashHex;
}


/* export async function calculateHash(data, previousHash) {
  let message = data + previousHash;
  let msgInt8 = new TextEncoder().encode(message);
  let hashBuffer = await crypto.subtle.digest("SHA-256", msgInt8);
  let hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
} */

