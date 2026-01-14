import React, { useEffect, useState } from "react";

const initialFormState = {
  title: "",
  hall: "",
  price: "",
  poster: ""
};

const MovieForm = ({ onSave, movieToEdit }) => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movieToEdit) {
      setFormValues({
        title: movieToEdit.title ?? "",
        hall: movieToEdit.hall ?? "",
        price: movieToEdit.price ?? "",
        poster: movieToEdit.poster ?? ""
      });
    } else {
      setFormValues(initialFormState);
    }
  }, [movieToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.title.trim()) {
      newErrors.title = "Naslov je obavezan.";
    }

    if (formValues.hall === "" || formValues.hall === null) {
      newErrors.hall = "Sala je obavezna.";
    } else {
      const hallNumber = Number(formValues.hall);
      if (Number.isNaN(hallNumber)) {
        newErrors.hall = "Sala mora biti broj.";
      } else if (hallNumber < 1 || hallNumber > 12) {
        newErrors.hall = "Sala mora biti između 1 i 12.";
      }
    }

    if (formValues.price === "" || formValues.price === null) {
      newErrors.price = "Cena je obavezna.";
    } else {
      const priceNumber = Number(formValues.price);
      if (Number.isNaN(priceNumber) || priceNumber <= 0) {
        newErrors.price = "Cena mora biti veći broj od 0.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const hallNumber =
      formValues.hall === "" ? undefined : Number(formValues.hall);
    const priceNumber =
      formValues.price === "" ? undefined : Number(formValues.price);

    const movieToSave = {
      likes: movieToEdit?.likes ?? 0,
      dislikes: movieToEdit?.dislikes ?? 0,
      title: formValues.title.trim(),
      hall: hallNumber,
      price: priceNumber,
      poster: formValues.poster.trim()
    };

    onSave(movieToSave);

    setFormValues(initialFormState);
    setErrors({});
  };

  const isEditing = !!movieToEdit;

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <h2>{isEditing ? "Izmena filma" : "Dodavanje filma"}</h2>

      <div className="movie-form__field">
        <label>
          Naslov:
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </label>
        {errors.title && <div className="movie-form__error">{errors.title}</div>}
      </div>

      <div className="movie-form__field">
        <label>
          Sala:
          <input
            type="number"
            name="hall"
            value={formValues.hall}
            onChange={handleChange}
          />
        </label>
        {errors.hall && <div className="movie-form__error">{errors.hall}</div>}
      </div>

      <div className="movie-form__field">
        <label>
          Cena:
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleChange}
          />
        </label>
        {errors.price && (
          <div className="movie-form__error">{errors.price}</div>
        )}
      </div>

      <div className="movie-form__field">
        <label>
          Poster URL:
          <input
            type="text"
            name="poster"
            value={formValues.poster}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">{isEditing ? "Sačuvaj izmene" : "Dodaj film"}</button>
    </form>
  );
};

export default MovieForm;

