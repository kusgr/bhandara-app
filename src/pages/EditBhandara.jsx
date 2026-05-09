import { useState, useEffect } from "react";
import { updateBhandara, getAllBhandaras } from "../firebase/bhandaraService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBhandara() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    foodType: "General",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Load existing data
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllBhandaras();
        const item = data.find((b) => b.id === id);

        if (item) {
          setForm({
            title: item.title || "",
            description: item.description || "",
            foodType: item.foodType || "General",
          });
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  // 🔹 Handle input
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // 🔹 Submit update
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Fill all fields");
      return;
    }

    try {
      await updateBhandara(id, {
        title: form.title,
        description: form.description,
        foodType: form.foodType,
      });

      alert("Updated successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  // 🔹 Loading state
  if (loading) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-4 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Edit Bhandara ✏️
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input-field w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="input-field w-full"
        />

        <select
          name="foodType"
          value={form.foodType}
          onChange={handleChange}
          className="input-field w-full"
        >
          <option value="Prashad">Prashad</option>
          <option value="Bhandara">Bhandara</option>
          <option value="General">General</option>
          <option value="Mixed">Mixed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Update Bhandara
        </button>

      </form>
    </div>
  );
}