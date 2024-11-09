const token = "yourToken"; // Replace with your actual Hugging Face API token
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
	image.src="loading.gif"
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify({ "inputs": inputText.value }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch image from API");
        }

        const result = await response.blob(); 
        return result;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating the image. Please try again.");
    }
}

button.addEventListener("click", async function() {
    const response = await query();
    if (response) {
        const objURL = URL.createObjectURL(response);
        image.src = objURL;
    }
});
