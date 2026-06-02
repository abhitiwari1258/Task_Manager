import React, { useState, useEffect } from "react";
import API from "../services/api";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForms] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // console.log(form)

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token)

      const res = await API.get("/task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleChange = (e) => {
    setForms({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!form.title.trim()) {
  //     alert("Title required");

  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");

  //     await API.post("/task", form, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setForms({
  //       title: "",
  //       description: "",
  //       priority: "Low",
  //     });

  //     fetchTasks();
  //   } catch (error) {
  //     console.log(error.response?.data);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleComplete = async (task) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/task/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleEdit = (task) => {
    console.log(task);
    setEditId(task._id);
    setForms({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Title required");

      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (editId) {
        await API.put(`/task/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditId(null);
      } else {
        await API.post("/task", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setForms({
        title: "",
        description: "",
        priority: "Low",
        dueDate: "",
      });
      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "Completed") {
      return matchesSearch && task.completed;
    }

    if (filter === "Pending") {
      return matchesSearch && !task.completed;
    }
    return matchesSearch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8"> Task Dashboard</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-6 rounded-xl grid md:grid-cols-5 gap-4 mb-10"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none focus:border-blue-500"
          />

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className=" border p-3 rounded-lg "
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            {editId ? "Update Task" : "Add Task"}
          </button>
        </form>

        <div className="gap-4 mb-8">
          <div className="flex gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex-1">
              <h3 className="text-gray-500">Total Tasks</h3>
              <p className="text-3xl font-bold text-yellow-600">{totalTasks}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex-1">
              <h3 className="text-gray-500">Completed</h3>
              <p className="text-3xl font-bold text-yellow-600">{completedTasks}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex-1">
              <h3 className="text-gray-500">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("All")}
            className={`px-4 py-2 rounded-lg ${filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("Completed")}
            className={`px-4 py-2 rounded-lg ${filter === "Completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("Pending")}
            className={`px-4 py-2 rounded-lg ${filter === "Pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Pending
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-6">My Task</h2>

        {tasks.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No tasks found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                className="bg-white p-5 rounded-xl shadow-md flex flex-col gap-4"
                key={task._id}
              >
                <div className=" flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{task.title}</h3>

                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white 
              ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
                  >
                    {" "}
                    Priority:{task.priority}
                  </span>
                </div>

                <p className="text-gray-600">{task.description}</p>

                <p className="text-sm text gray-500">
                  Due :{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No Due Date"}
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={` px-3 py-1 rounded-full text-sm text-white ${task.completed ? "bg-green-500" : "bg-gray-500"}`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleComplete(task)}
                    className={`flex-1 transition duration-200 py-2 rounded-lg text-white ${task.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    onClick={() => handleEdit(task)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-red-500 text-white py-2 transition duration-200 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
