import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import movieService from "../services/movieService";

const initialFormState = {
  title: "",
  hall: "",
  price: "",
  poster: ""
};

const MovieForm = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadMovie(id);
    } else {
      setFormValues(initialFormState);
    }
  }, [id]);

  const loadMovie = async (movieId) => {
    try {
      setLoading(true);
      setServerError(null);
      const movie = await movieService.getMovieById(movieId);
      setFormValues({
        title: movie.title ?? "",
        hall: movie.hall ?? "",
        price: movie.price ?? "",
        poster: movie.poster ?? ""
      });
    } catch (err) {
      setServerError("Greška pri učitavanju filma");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const hallNumber =
      formValues.hall === "" ? undefined : Number(formValues.hall);
    const priceNumber =
      formValues.price === "" ? undefined : Number(formValues.price);

    const movieToSave = {
      name: formValues.title.trim(),
      hall: hallNumber,
      price: priceNumber,
      poster: formValues.poster.trim()
    };

    try {
      setLoading(true);
      setServerError(null);

      if (id) {
        // Izmena postojećeg filma
        await movieService.updateMovie(id, {
          id: parseInt(id),
          ...movieToSave,
          likes: 0,
          dislikes: 0
        });
      } else {
        // Dodavanje novog filma
        await movieService.addMovie(movieToSave);
      }

      setFormValues(initialFormState);
      setErrors({});
      navigate("/movies");
    } catch (err) {
      setServerError(err.message || "Greška pri čuvanju filma");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!id;

  if (loading && isEditing) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Učitavanje filma...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <h2>{isEditing ? "Izmena filma" : "Dodavanje filma"}</h2>

      {serverError && (
        <div className="error-message">
          <p>⚠️ {serverError}</p>
        </div>
      )}

      {loading && (
        <div className="form-loading">
          <div className="spinner"></div>
          <p>Čuvanje...</p>
        </div>
      )}

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

      <button type="submit" disabled={loading}>{isEditing ? "Sačuvaj izmene" : "Dodaj film"}</button>
    </form>
  );
};

export default MovieForm;

