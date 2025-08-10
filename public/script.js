document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  addMessage("AI", data.reply);
});

function addMessage(sender, text) {
  const messagesDiv = document.getElementById("messages");
  const msg = document.createElement("p");
  msg.textContent = `${sender}: ${text}`;
  messagesDiv.appendChild(msg);
}
