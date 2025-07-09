"use client";

import { useState, useEffect } from "react";

export default function useTaskForm(initialValues, onSubmit) {
  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm(initialValues);
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
  };
}
