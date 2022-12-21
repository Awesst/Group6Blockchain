export async function calculateHash(encryptMessage) {
  let message = encryptMessage;
  let msgInt8 = new TextEncoder().encode(message);
  let hashBuffer = await crypto.subtle.digest("SHA-256", msgInt8);
  let hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
