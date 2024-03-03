import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import './Home.scss'
import { useEffect, useRef, useState } from 'react';

export default function Home(): JSX.Element {
	const navigator = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
  	const countUpRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const options = {
		  root: null,
		  rootMargin: '0px',
		  threshold: 0.5 // Adjust this threshold as needed
		};
	
		const observer = new IntersectionObserver(([entry]) => {
			setIsVisible(entry.isIntersecting);
		}, options);
	
		if (countUpRef.current) {
		  	observer.observe(countUpRef.current);
		}
	
		return () => {
		  	if (countUpRef.current) {
				observer.unobserve(countUpRef.current);
		  	}
		};
	}, []);

	const scrollToBottom = () => {
		const element = document.getElementById('bottom');
		if (element) {
		  element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<main className="Home">
			<div className="top">
				<h1 className="title">Smart City</h1>
				<h2>Projekat namenjen digitalizaciji gradova i podizanju svesti o zagadjenosti naseg okruzenja.</h2>
				<div className="inline">
					<button onClick={() => navigator("/air-keeper")}>
						<img src="/assets/global/air.svg" alt="" />
						<h3>AirKeeper</h3>
					</button>
					<button onClick={() => navigator("/traffic")}>
						<img src="/assets/global/traffic.svg" alt="" />
						<h3>Traffic</h3>
					</button>
					<button onClick={() => navigator("/water")}>
						<img src="/assets/global/water.svg" alt="" />
						<h3>Water</h3>
					</button>
				</div>
				<div className="inline">
					<button onClick={scrollToBottom}>
						<img src="/assets/global/docs.svg" alt="" />
						<h3>Read More</h3>
					</button>
					<button onClick={() => navigator("/login")}>
						<img src="/assets/global/login.svg" alt="" />
						<h3>LogIn</h3>
					</button>
				</div>
			</div>
			<div id='bottom' className="bottom">
				<div className="diduknow">
					<img src="/assets/global/question.svg" alt="" />
					<h3>Da li ste znali da?</h3>
				</div>
				<h1 className="number" ref={countUpRef}>
					<CountUp start={0} end={7_000_000} duration={2} >
						{({ countUpRef, start }) => {if(isVisible) start(); return <span ref={countUpRef} />}}
					</CountUp>
					+
				</h1>
				
				<h1 className="description">Ljudi godisnje premine od <u>zagadjenog</u> vazduha</h1>

				<div className="about-list">
					<div className="about">
						<div className="image-container">
							<img src="/assets/home/air-pollution.jpg" alt="" />
						</div>
						<h3>
							U danasnje vreme kvalitet vazduha postaje
							sve veci i veci problem i  nase zdravljo placa
							cenu za to... Zato smo mi odlucili da kreirano
							granu ovog projekta namenjenom za prosirenje
							svest o njegovom trenutnom kvalitetu.
						</h3>
					</div>
					<div className="about">
					<div className="image-container" style={{background: "#d9d9d9"}}>
							<img src="/assets/home/app.jpg" alt="" />
						</div>
						<h3>
							Nasa aplikacija AirKeeper ima za ulogu da
							podigne svest o kvalitetu naseg vazduha
							kao i obavesti korisnike kada jeste a kada
							nije bezbedno izlaziti napolje, kao i pokaze
							promenu odredjenih parametara vezanih za
							kvalitet i cistocu vazduha...
						</h3>
					</div>
				</div>
				<button>
					<img src="/assets/global/app.svg" alt="" />
					<h3>AirKeeper Aplikacija</h3>
				</button>
			</div>
		</main>
	);
}
