import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import requests from '../utils/request';
import "../css/Banner.css";
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

function Banner() {
	const [movie, setMovie] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchTrending);

			setMovie(
				request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
			);
		}
		fetchData();
	}, []);

	const opts = {
		height: "450",
		width: "100%",
		playerVars: {
			autoplay: 1
		}
	}

	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_title || "")
				.then(url => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				}).catch(error => console.log(error));
		}
	}

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<header
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
				backgroundPosition: "center center"
			}}
		>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
			<div className="banner__contents">
				<h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
				<div className="banner__buttons">
					<button className="banner__button" onClick={() => handleClick(movie)}>Play</button>
					<button className="banner__button">My List</button>
				</div>

				<h1 className="banner__description">
					{truncate(movie?.overview, 150)}
				</h1>
			</div>

			<div className="banner--fadeBottom" />
		</header>
	)
}

export default Banner