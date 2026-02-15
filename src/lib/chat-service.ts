export interface ChatResponse {
    role: "assistant";
    content: string;
}

export async function sendMessage(query: string): Promise<ChatResponse> {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: query }),
        });

        if (!response.ok) {
            let errorMessage = "Failed to fetch response";
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch {
                // Ignore JSON parse error if response is not JSON
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Handle DeepPavlov response format
        const answer = data.answer || data[0] || "I received your message but couldn't generate a specific response.";

        return {
            role: "assistant",
            content: typeof answer === 'string' ? answer : JSON.stringify(answer),
        };

    } catch (error: any) {
        console.error("Chat Service Error:", error);
        return {
            role: "assistant",
            content: error.message || "I'm having trouble connecting to the server. Please try again later.",
        };
    }
}
