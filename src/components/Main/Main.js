import React from 'react';
import { AboutMe } from '../AboutMe/AboutMe';
import { AboutProject } from '../AboutProject/AboutProject';
import { Portfolio } from '../Portfolio/Portfolio';
import { Promo } from '../Promo/Promo';
import { Techs } from '../Techs/Techs';

export const Main = (props) => {

	React.useEffect(() => {
		props.setAuth(false);
		return () => {
			props.setAuth(true)
		}
	}, []);

	return (
		<main >
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe />
			<Portfolio />
		</main>
	);
}