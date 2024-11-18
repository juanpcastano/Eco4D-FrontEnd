
export async function heartbeat() {
    let backendUrl;
    try {
        fetch("https://eco4dbackend-production-c81d.up.railway.app/mensajes/heartbeat", { method: "GET" });
        backendUrl = "https://eco4dbackend-production-c81d.up.railway.app/";
    } 
    catch (error) {
        if (error) backendUrl = "http://localhost:3000";
    }

    return backendUrl;
}

