import AtomicSpinner from 'atomic-spinner'

export default function Loading(): JSX.Element{
    return (
        <div className="loading">
            <div className="atom">
                <AtomicSpinner 
                    atomSize={300} 
                    displayElectronPaths 
                    electronSize={2} 
                    nucleusLayerCount={2}
                    nucleusSpeed={5}
                    electronSpeed={0.5}
                    electronsPerPath={3}
                    electronColorPalette={["#ff0022ff", "#aa2000ff", "#9f0033ff"]}
                    nucleusParticleSize={3}
                    nucleusDistanceFromCenter={3}
                    nucleusParticlesPerLayer={3}
                />
            </div>
            <h1>Loading...</h1>
        </div>
    )
} 
