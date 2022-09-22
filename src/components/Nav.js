import React, { useEffect, useState } from 'react';
import '../css/Nav.css';

function Nav() {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				handleShow(true);
			} else handleShow(false);
		});
		// return () => {
		// 	window.removeEventListener("scroll");
		// }
	}, []);

	return (
		<div className={`nav ${show && "nav__black"}`}>
			<img
				className="nav__logo"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
				alt="Netflix Logo"
			/>
			<img
				className="nav__avatar"
				src="https://i.pinimg.com/564x/bd/ee/4c/bdee4c328550aaf21aa9f43fd19e2136.jpg"
				alt="Netflix Logo"
			/>
		</div>
	)
}

export default Nav