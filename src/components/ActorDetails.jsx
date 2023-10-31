/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Error from "./Error";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Context";

const ActorDetails = () => {
  const [actor, setActor] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const { setLoading, loading } = useGlobalContext();
  console.log(params);

  // MOVIE DETAIL AND VIDEO URLS
  const actorDetailsUrl = `https://api.themoviedb.org/3/person/${params.actorId}?language=en-US?language=en-US?api_key=a718a8c95a73aa13ba0a074ab6175f8d&append_to_response=credits`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE4YThjOTVhNzNhYTEzYmEwYTA3NGFiNjE3NWY4ZCIsInN1YiI6IjY0ZTQ3ZTlhMWZlYWMxMDExYjJiMTY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpgc6SU5J5FiIdjMy8rxrVa4PpmR2UZLXnd_nxr7oWI",
    },
  };

  // GET MORE DETAILS ABOUT A SPECIFIC MOVIE
  const fetchActorDetails = async (url) => {
    setLoading(true);
    try {
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => setActor(response));
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  console.log(actor);

  useEffect(() => {
    if (!params.actorId) return;
    fetchActorDetails(actorDetailsUrl);
  }, [params.actorId]);

  if (loading) {
    return (
      <section>
        <img src="/Spinner-1s-200px.svg" alt="Spinning wheel" />
      </section>
    );
  } else if (error) {
    return (
      <section>
        <Error />
      </section>
    );
  } else {
    if (actor.profile_path && actor.name && actor.biography) {
      return (
        <section className="details-container actor-container">
          <div className="actor-image">
            <div className="circle"></div>
            <img
              className="details-top-img"
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                  : "/image-not-found.jpg"
              }
              alt={actor.title}
            />
          </div>

          <div className="actor-details">
            <h1 className="actor-name">{actor.name}</h1>
            {actor.birthday ? (
              <p>
                Born - <span className="italic">{actor.birthday}</span>
              </p>
            ) : (
              ""
            )}
            {actor.place_of_birth ? (
              <p>
                Place of Birth -{" "}
                <span className="italic">{actor.place_of_birth}</span>
              </p>
            ) : (
              ""
            )}

            <div className="actor-biography">
              <h2>Biography</h2>
              <p>{actor.biography}</p>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <Error />
        </section>
      );
    }
  }
};

export default ActorDetails;
