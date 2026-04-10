"use client";

import { Database, Tables } from "@/database.types";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const supabase = createClient()

type City = Tables<'cities'>
type Brand = Tables<'brands'>

interface TheaterFormValues {
  name: string;
  city_id: string;
  brand_id: string;
  district: string;
  complete_address: string;
  latitude: string;
  longitude: string;
}

export default function AddTheaterForm() {
  const [cities, setCities] = useState<City[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TheaterFormValues>({
    defaultValues: {
      name: "",
      city_id: "",
      brand_id: "",
      district: "",
      complete_address: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    const fetchDropdowns = async () => {
      const [{ data: citiesData, error: citiesError }, { data: brandsData, error: brandsError }] =
        await Promise.all([
          supabase.from("cities").select("id, name, state, latitude, longitude").order("name"), // ✅ "cities" not "city"
          supabase.from("brands").select("id, name, logo_url, created_at, updated_at").order("name"), // ✅ "brands" not "brand"
        ]);

      if (citiesError) console.error("cities fetch error:", citiesError.message);
      if (brandsError) console.error("brands fetch error:", brandsError.message);

      setCities(citiesData || []);
      setBrands(brandsData || []);
    };
    fetchDropdowns();
  }, []);

  const onSubmit = async (data: TheaterFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    // Get logged-in user's ID to pass as user_id
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload: Database["public"]["Tables"]["theater"]["Insert"] = {
      name: data.name.trim(),
      city_id: Number(data.city_id),
      brand_id: Number(data.brand_id),
      district: data.district.trim() || null,
      complete_address: data.complete_address.trim() || null,
      latitude: data.latitude ? parseFloat(data.latitude) : null,
      longitude: data.longitude ? parseFloat(data.longitude) : null,
      user_id: user?.id ?? null,
    };

    const { error } = await supabase.from("theater").insert([payload]);

    if (error) {
      setSubmitError(error.message);
    } else {
      setSubmitSuccess(true);
      reset();
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-[#0f1117] border rounded-xl px-4 py-3 text-white placeholder-[#3a3f52] text-sm outline-none transition-all duration-200 focus:border-[#e8c547] focus:shadow-[0_0_0_3px_rgba(232,197,71,0.12)] hover:border-[#2d3248] ${
      hasError ? "border-red-500" : "border-[#1e2235]"
    }`;

  const labelClass =
    "block text-xs font-semibold tracking-widest text-[#6b7394] uppercase mb-2";
  const errorClass = "mt-1.5 text-xs text-red-400 flex items-center gap-1";

  return (
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,197,71,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#e8c547] flex items-center justify-center text-[#080b14]">
              🎬
            </div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#e8c547] uppercase">
              Theater Management
            </span>
          </div>
          <h1
            className="text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Add New Theater
          </h1>
          <p className="mt-2 text-[#4a5168] text-sm">
            Fill in the details to register a new theater location.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0c0f1a] border border-[#1a1f33] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Theater Name */}
            <div>
              <label className={labelClass}>Theater Name *</label>
              <input
                {...register("name", { required: "Theater name is required" })}
                placeholder="e.g. PVR Juhu Mumbai"
                className={inputClass(!!errors.name)}
              />
              {errors.name && (
                <p className={errorClass}>⚠ {errors.name.message}</p>
              )}
            </div>

            {/* City + Brand */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City *</label>
                <select
                  {...register("city_id", { required: "City is required" })}
                  className={`${inputClass(!!errors.city_id)} cursor-pointer`}
                  style={{ appearance: "none" }}
                >
                  <option value="">Select city...</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0f1117]">
                      {c.name}, {c.state}
                    </option>
                  ))}
                </select>
                {errors.city_id && (
                  <p className={errorClass}>⚠ {errors.city_id.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Brand *</label>
                <select
                  {...register("brand_id", { required: "Brand is required" })}
                  className={`${inputClass(!!errors.brand_id)} cursor-pointer`}
                  style={{ appearance: "none" }}
                >
                  <option value="">Select brand...</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id} className="bg-[#0f1117]">
                      {b.name}
                    </option>
                  ))}
                </select>
                {errors.brand_id && (
                  <p className={errorClass}>⚠ {errors.brand_id.message}</p>
                )}
              </div>
            </div>

            {/* District */}
            <div>
              <label className={labelClass}>District</label>
              <input
                {...register("district")}
                placeholder="e.g. Juhu"
                className={inputClass(false)}
              />
            </div>

            {/* Complete Address */}
            <div>
              <label className={labelClass}>Complete Address</label>
              <textarea
                {...register("complete_address")}
                placeholder="e.g. Juhu Tara Road, Juhu, Mumbai 400049"
                rows={3}
                className={`${inputClass(false)} resize-none`}
              />
            </div>

            {/* Latitude + Longitude */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Latitude</label>
                <input
                  {...register("latitude", {
                    pattern: {
                      value: /^-?\d+(\.\d+)?$/,
                      message: "Enter a valid latitude",
                    },
                  })}
                  placeholder="e.g. 19.0990"
                  className={inputClass(!!errors.latitude)}
                />
                {errors.latitude && (
                  <p className={errorClass}>⚠ {errors.latitude.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Longitude</label>
                <input
                  {...register("longitude", {
                    pattern: {
                      value: /^-?\d+(\.\d+)?$/,
                      message: "Enter a valid longitude",
                    },
                  })}
                  placeholder="e.g. 72.8265"
                  className={inputClass(!!errors.longitude)}
                />
                {errors.longitude && (
                  <p className={errorClass}>⚠ {errors.longitude.message}</p>
                )}
              </div>
            </div>

            <div className="border-t border-[#1a1f33]" />

            {/* Server Feedback */}
            {submitError && (
              <div className="flex items-start gap-3 bg-red-950/40 border border-red-800/50 rounded-xl px-4 py-3">
                <span className="text-red-400 mt-0.5">✕</span>
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="flex items-start gap-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl px-4 py-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <p className="text-emerald-400 text-sm font-medium">
                  Theater added successfully!
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #e8c547 0%, #c9a832 100%)",
                color: "#080b14",
                boxShadow: isSubmitting ? "none" : "0 4px 24px rgba(232,197,71,0.25)",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Adding Theater...
                </span>
              ) : (
                "Add Theater"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#2d3248] text-xs mt-6">
          Fields marked * are required · Admin only
        </p>
      </div>

      <style jsx global>{`
        body { background: #080b14; }
        select option { background: #0f1117; color: white; }
      `}</style>
    </div>
  );
}