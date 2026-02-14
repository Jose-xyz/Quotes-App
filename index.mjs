export const handler = async (event) => {
    // Define headers once to use in both Success and Error cases
    const headers = {
        "Access-Control-Allow-Origin": "*", // Or your Amplify URL: https://main.d123.amplifyapp.com
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle the browser's "Pre-flight" check
    if (event.requestContext && event.requestContext.http && event.requestContext.http.method === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    try {
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json();

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ error: "Failed to fetch quotes" }),
        };
    }
};