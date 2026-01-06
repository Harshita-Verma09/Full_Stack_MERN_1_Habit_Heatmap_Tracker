import { useEffect, useState } from "react";

function App() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    taskCompleted: "",
    totalTask: ""
  });

  // fetch habits
  const fetchHabits = () => {
    fetch("http://localhost:2000/api/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:2000/api/habits/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        taskCompleted: Number(form.taskCompleted),
        totalTask: Number(form.totalTask)
      })
    });

    setForm({ name: "", date: "", taskCompleted: "", totalTask: "" });
    fetchHabits(); // refresh heatmap
  };

  // GitHub-like colors (dark theme)
  const getColor = (completed, total) => {
    if (completed === 0) return "#161b22";   // dark gray
    if (completed < total) return "#0e4429"; // mid green
    return "#2ea043";                        // bright green
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d1117",
        color: "#c9d1d9",
        fontFamily: "system-ui",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}> Habit Tracker</h1>
      <p style={{ color: "#8b949e", marginBottom: "30px" }}>
        Build consistency, one day at a time
      </p>

      {/* FORM CARD */}
      <div
        style={{
          background: "#161b22",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Add Daily Habit</h3>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="taskCompleted"
            placeholder="Completed"
            value={form.taskCompleted}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="totalTask"
            placeholder="Total"
            value={form.totalTask}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              background: "#238636",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              flex: "1 0 100px"
            }}
          >
            Save
          </button>
        </form>
      </div>

      {/* HEATMAP */}
      <h3 style={{ marginBottom: "10px" }}> Activity</h3>

      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(7, 14px)",
          gap: "4px",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "100%",
          overflowX: "auto",
          paddingBottom: "20px"
        }}
      >
        {habits.map((item) => (
          <div
            key={item._id}
            title={`${item.date.slice(0, 10)} | ${item.taskCompleted}/${item.totalTask}`}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "3px",
              backgroundColor: getColor(item.taskCompleted, item.totalTask)
            }}
          />
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  background: "#0d1117",
  border: "1px solid #30363d",
  color: "#c9d1d9",
  padding: "8px",
  borderRadius: "6px",
  outline: "none",
  flex: "1 0 45%" // responsive width
};

export default App;
