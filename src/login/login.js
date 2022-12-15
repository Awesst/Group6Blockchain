const users = [
  { username: "Jakob", password: "Jakob" },
  { username: "Carolin", password: "Carolin" },
  { username: "Hossein", password: "Hossein" },
  { username: "Katalin", password: "Katalin" },
  { username: "Fredrik", password: "Fredrik" },
  { username: "Edvin", password: "Edvin" },
  { username: "Janne", password: "Janne" },
];

localStorage.setItem("users", JSON.stringify(users));
let getUser = JSON.parse(localStorage.getItem("users"));
