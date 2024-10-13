import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("/users")
            .then((res) => {
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    };

    const getNextId = () => {
        const maxId = users.length ? Math.max(...users.map(user => user.id)) : 0;
        return maxId + 1;
    };

    const handleGet = (id) => {
        const user = users.find((user) => user.id === Number(id));
        if (user) {
            alert(JSON.stringify(user, null, 4));
        } else {
            alert("User not found!");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            id: getNextId(),
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            age: e.target.age.value
        };

        fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                alert("User added successfully!");
                fetchUsers(); 
            })
            .catch((error) => console.error("Error adding user:", error));
    };

    const handleDelete = (id) => {
        if (!id) return alert("Please provide a valid ID!");

        fetch(`/users/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                alert("User deleted successfully!");
                fetchUsers();
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    return (
        <div className="App">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Add a new user</h2>
                <input type="text" placeholder="Name" name="name" required />
                <input type="text" placeholder="Lastname" name="lastname" required />
                <input type="number" placeholder="Age" name="age" required />
                <input type="submit" value="Send" />
            </form>

            <div className="buttons-group">
                <button
                    onClick={() => {
                        const id = prompt("Enter user ID");
                        handleGet(id);
                    }}
                >
                    Get User
                </button>

                <button
                    onClick={() => {
                        const id = prompt("Enter user ID");
                        handleDelete(id);
                    }}
                >
                    Delete User
                </button>
            </div>

            <div className="user-list">
                <h2>Users:</h2>
                {users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                {user.name} {user.lastname}, Age: {user.age} (ID: {user.id})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users available</p>
                )}
            </div>
        </div>
    );
};

export default App;
