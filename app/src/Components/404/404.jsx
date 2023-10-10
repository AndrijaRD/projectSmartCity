import './style/404.css'

export default function NotFound(){
    return(
        <main className="NotFound">
            <h3><a href='/'>Nazad Kuci</a></h3>
            <img src="/assets/components/404.png" alt='404.png' />
            <div className="text">
                <h1>404 Not Found</h1>
                <h3>Stranica nije pronadjena. Ili ste usli na nepostojeci link ili se stranica idalje izgradjuje.</h3>
            </div>
        </main>
    )
}