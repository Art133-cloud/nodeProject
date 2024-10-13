import express from "express";
const app = express();

app.use(express.json());

let users = [];
let userIdCounter = 1;

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const { name, lastname, age } = req.body;

    if (!name || !lastname || !age) {
        return res.status(400).json({ message: "Inputs not full" });
    }

    const newUser = { id: userIdCounter++, name, lastname, age };
    users.push(newUser);

    res.status(201).json({ message: "User added", user: newUser });
});

app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === userId);

    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).json({ message: "User deleted" });
    } else {
        res.status(404).json({ message: "No User found with this ID" });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
