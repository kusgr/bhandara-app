import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import toast from 'react-hot-toast';

import {
  getBhandara,
  updateBhandara,
} from '../services/bhandaraService.js';

export default function EditBhandaraPage() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: '',
      description: '',
      foodType: 'Bhandara',
    });

  // ─────────────────────────────────────────
  // Load Existing Data
  // ─────────────────────────────────────────

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getBhandara(id);

        setFormData({
          title:
            data.title || '',

          description:
            data.description ||
            '',

          foodType:
            data.foodType ||
            'Bhandara',
        });

      } catch (err) {

        console.error(err);

        toast.error(
          'Failed to load data'
        );

      } finally {

        setLoading(false);
      }
    }

    load();

  }, [id]);

  // ─────────────────────────────────────────
  // Handle Change
  // ─────────────────────────────────────────

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  // ─────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setSaving(true);

      await updateBhandara(
        id,
        formData
      );

      toast.success(
        'Bhandara updated!'
      );

      navigate(
        `/bhandara/${id}`
      );

    } catch (err) {

      console.error(err);

      toast.error(
        'Update failed'
      );

    } finally {

      setSaving(false);
    }
  }

  // ─────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-xl font-bold">

          Loading...

        </p>

      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="font-black text-4xl text-gray-800 mb-2">

          Edit Bhandara ✏️

        </h1>

        <p className="text-gray-500">

          Update details below.

        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="card p-6 space-y-5"
      >

        {/* Title */}
        <div>

          <label className="block mb-2 font-semibold text-gray-700">

            Title

          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
          />

        </div>

        {/* Description */}
        <div>

          <label className="block mb-2 font-semibold text-gray-700">

            Description

          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            rows="5"
            className="input-field resize-none"
          />

        </div>

        {/* Category */}
        <div>

          <label className="block mb-2 font-semibold text-gray-700">

            Category

          </label>

          <select
            name="foodType"
            value={
              formData.foodType
            }
            onChange={handleChange}
            className="input-field"
          >

            <option>
              Bhandara
            </option>

            <option>
              Prashad
            </option>

            <option>
              Other
            </option>

          </select>

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="btn-primary w-full"
        >

          {saving
            ? 'Saving...'
            : 'Update Bhandara'}

        </button>

      </form>

    </div>
  );
}