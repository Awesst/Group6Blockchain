const users = [
  { username: "Jakob", password: "jakob" },
  { username: "Katalin", password: "katalin" },
  { username: "Hossein", password: "Hossein" },
  { username: "Carolin", password: "Carolin" },
  { username: "Fredrik", password: "Fredrik" },
  { username: "Edvin", password: "Edvin" },
  { username: "Janne", password: "Janne" },
];

function checkCredentials(username, password) {
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      return true;
    }
  }
  return false;
}
