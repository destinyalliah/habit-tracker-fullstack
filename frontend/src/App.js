import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  // Fetch habits from Flask backend
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/habits");
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addHabit = async () => {
    if (!newHabit) return;
    try {
      await axios.post("http://127.0.0.1:5000/habits", { name: newHabit });
      setNewHabit("");
      fetchHabits(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Habit Tracker</h1>
      <input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="New habit"
      />
      <button onClick={addHabit}>Add Habit</button>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} - {habit.completed ? "Done" : "Not Done"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

