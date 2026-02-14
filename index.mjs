export const handler = async (event) => {
    const API_URL = "https://zenquotes.io/api/quotes/";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allows Amplify to call it
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch quotes" }),
        };
    }
};