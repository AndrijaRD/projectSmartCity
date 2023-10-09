import './style/Home.css'

export default function Home() {

    return(
        <main className="Home">
            <h1>Home Page</h1>
            <h3 style={{margin: "10px 20px"}}>Go to <a href='/weather'>weather app</a>.</h3>
        </main>
    );
}