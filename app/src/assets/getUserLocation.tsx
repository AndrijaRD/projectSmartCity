// Function to get user's location using Geolocation API
async function getUserLocationGeolocation(): Promise<number[]> {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve([latitude, longitude]);
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

// Function to get user's location using IP-based lookup service
async function getUserLocationFromIP(): Promise<number[]> {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    console.log(data)

    if (data && data.loc) {
        const [latitude, longitude] = data.loc.split(",");
        return [parseFloat(latitude), parseFloat(longitude)];
    } else {
        throw new Error("Failed to retrieve location from IP.");
    }
}

// Function to get user's location, attempting Geolocation first and falling back to IP-based lookup
export default async function getUserLocation(): Promise<number[]> {
    try {
        // Attempt to get precise location using Geolocation API
        return await getUserLocationGeolocation();
    } catch (geolocationError) {
        // If Geolocation API fails, fall back to IP-based lookup
        console.error("Geolocation error:", geolocationError);
        console.log("Falling back to IP-based lookup...");
        return await getUserLocationFromIP();
    }
}