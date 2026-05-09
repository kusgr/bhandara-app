import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  PlusCircle,
  Utensils,
  FileText,
  MapPin,
  Sparkles,
} from 'lucide-react';

import toast from 'react-hot-toast';

import LocationPicker from '../components/LocationPicker.jsx';

import MapLocationPicker from '../components/MapLocationPicker.jsx';

import {
  addBhandara,
} from '../services/bhandaraService.js';

import PageWrapper from '../components/PageWrapper.jsx';

const FOOD_TYPES = [
  'Prashad',
  'Bhandara',
  'Other',
];

export default function AddBhandaraPage() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [location, setLocation] =
    useState(null);

  const [form, setForm] =
    useState({
      title: '',
      description: '',
      foodType: 'Prashad',
    });

  // ─────────────────────────────────────────
  // Update field
  // ─────────────────────────────────────────

  function update(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // ─────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────

  async function handleSubmit(e) {
    e.preventDefault();

    // Title required
    if (!form.title.trim()) {
      toast.error(
        'Please enter title.'
      );

      return;
    }

    // Location required
    if (!location) {
      toast.error(
        'Please select location.'
      );

      return;
    }

    try {
      setLoading(true);

      await addBhandara({
        title:
          form.title.trim(),

        description:
          form.description.trim(),

        foodType:
          form.foodType,

        lat: location.lat,
        lng: location.lng,

        views: 0,
      });

      toast.success(
        'Bhandara added successfully 🍛'
      );

      navigate('/');

    } catch (err) {
      console.error(err);

      toast.error(
        'Failed to add bhandara.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper>

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-saffron-500 to-turmeric-500 p-6 text-white mb-6">

          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />

          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center gap-2 mb-2">

              <Sparkles size={18} />

              <span className="text-sm text-white/80">
                Community Contribution
              </span>

            </div>

            <h1 className="font-display font-extrabold text-3xl leading-tight">
              Add a New
              <br />
              Bhandara 🍛
            </h1>

            <p className="text-sm text-white/80 mt-3 max-w-md">
              Help others discover
              nearby food events.
            </p>

          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="card p-5 sm:p-6 space-y-6"
        >

          {/* Title */}
          <div className="space-y-2">

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">

              <Utensils
                size={16}
                className="text-saffron-500"
              />

              Bhandara Title

            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                update(
                  'title',
                  e.target.value
                )
              }
              placeholder="Ex: Hanuman Mandir Prashad"
              className="input-field"
            />

          </div>

          {/* Description */}
          <div className="space-y-2">

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">

              <FileText
                size={16}
                className="text-saffron-500"
              />

              Description

              <span className="text-xs text-gray-400">
                (optional)
              </span>

            </label>

            <textarea
              rows="4"
              value={
                form.description
              }
              onChange={(e) =>
                update(
                  'description',
                  e.target.value
                )
              }
              placeholder="Add timings or details..."
              className="input-field resize-none"
            />

          </div>

          {/* Categories */}
          <div className="space-y-3">

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Category
            </label>

            <div className="grid grid-cols-3 gap-3">

              {FOOD_TYPES.map(
                (type) => {
                  const active =
                    form.foodType ===
                    type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        update(
                          'foodType',
                          type
                        )
                      }
                      className={`rounded-2xl py-3 text-sm font-semibold transition-all active:scale-95 ${
                        active
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-orange-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  );
                }
              )}

            </div>

          </div>

          {/* Search Location */}
          <div className="space-y-3">

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">

              <MapPin
                size={16}
                className="text-saffron-500"
              />

              Search Location

            </label>

            <LocationPicker
              value={location}
              onChange={
                setLocation
              }
            />

          </div>

          {/* Manual Map Picker */}
          <div className="space-y-3">

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">

              Or Select on Map

            </label>

            <MapLocationPicker
              value={location}
              onChange={
                setLocation
              }
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >

            <PlusCircle size={18} />

            {loading
              ? 'Adding...'
              : 'Add Bhandara'}

          </button>

        </form>

      </div>

    </PageWrapper>
  );
}