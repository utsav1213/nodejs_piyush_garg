const express = require("express");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Example users
let users = [
  {
    id: 1,
    first_name: "Utsav",
    last_name: "Hirapra",
    email: "utsav@gmail.com",
  },
  {
    id: 2,
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
  },
];

// =====================================================
// HTML ROUTE
// =====================================================

app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;

  res.send(html);
});

// =====================================================
// GET ALL USERS
// =====================================================

app.get("/api/users", (req, res) => {
  return res.json(users);
});

// =====================================================
// GET, PATCH, DELETE USER BY ID
// =====================================================

app
  .route("/api/users/:id")

  // GET USER
  .get((req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(user);
  })

  // UPDATE USER
  .patch((req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update only the fields sent by the client
    if (req.body.first_name !== undefined) {
      user.first_name = req.body.first_name;
    }

    if (req.body.last_name !== undefined) {
      user.last_name = req.body.last_name;
    }

    if (req.body.email !== undefined) {
      user.email = req.body.email;
    }

    return res.json({
      message: "User updated successfully",
      user: user,
    });
  })

  // DELETE USER
  .delete((req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove user from array
    const deletedUser = users.splice(userIndex, 1);

    return res.json({
      message: "User deleted successfully",
      user: deletedUser[0],
    });
  });

// =====================================================
// CREATE USER
// =====================================================

app.post("/api/users", (req, res) => {
  const { first_name, last_name, email } = req.body;

  // Basic validation
  if (!first_name || !last_name || !email) {
    return res.status(400).json({
      message: "first_name, last_name and email are required",
    });
  }

  // Generate new ID
  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const newUser = {
    id,
    first_name,
    last_name,
    email,
  };

  users.push(newUser);

  return res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
