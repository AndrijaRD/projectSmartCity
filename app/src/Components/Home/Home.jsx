import './style/Home.css'

export default function Home() {

    return(
        <main className="Home">
            <nav className="navbar">

            </nav>
            <div className="titleSection">
                <h1 className="title">Projekat Smart City</h1>
                <h3>Prvi moderni gratski sistem kvaliteta sredine!</h3>
                <button onClick={() => window.location.href = "/weather"}>Pridruzi se sada</button>
            </div>
            <div className="bottom">
            <h1>O nama:</h1>
                <div className='aboutus-wrapper'>
                    <h3 className='aboutus'>Mi smo prva organizacija koja koristi modernu tehnologiju i povezuje je sa nasim svakodnevnim uredjima: Telefonima, Kompluterima, Tabletima...</h3>
                    <h3 className="aboutus">Ovaj projekat ima za ulogu da prosiri svest o kvalitetu nase zivotne sredine kao sto je kvalitet vazduha, vode, zemljista i nacini na koje mozemo da ih poboljsamo.</h3>
                </div>
            </div>
        </main>
    );
}