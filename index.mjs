export const handler = async (event) => {
    // These headers tell the browser "I allow this request"
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    // 1. Handle OPTIONS (Pre-flight) request
    if (event.requestContext && event.requestContext.http && event.requestContext.http.method === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: headers,
            body: ''
        };
    }

    try {
        // 2. Fetch the quotes
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json();

        // 3. Return the data WITH the headers
        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};