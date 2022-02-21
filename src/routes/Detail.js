import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

let info;

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const { id } = useParams();
  const getMovie = async () => {
    const info = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(info.data.movie);
    setMovie(info.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          {movie.title} ({movie.year})
        </h1>
      </div>
      <div className={styles.detail}>
        <div>
          <img className={styles.image} src={movie.medium_cover_image} />
        </div>
        <div className={styles.text}>
          <h3 className={styles.rating}>Rating : {movie.rating} / 10</h3>
          <ul className={styles.genres}>
            {movie.genres?.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p className={styles.description}>{movie.description_full}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
