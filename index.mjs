export const handler = async (event) => {
    // 1. Manually define the headers
    const responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json"
    };

    // 2. Handle the Preflight (OPTIONS) request from the browser
    if (event.requestContext && event.requestContext.http && event.requestContext.http.method === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: responseHeaders,
            body: ''
        };
    }

    try {
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json();

        return {
            statusCode: 200,
            headers: responseHeaders, // <--- This is the magic part
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: responseHeaders,
            body: JSON.stringify({ error: "Failed to fetch quotes", details: error.message }),
        };
    }
};