/*
=====================================
 Gen AI Q&A Engine
=====================================
Primary answer engine for the Architecture Q&A. Uses the free-tier Google
Gemini API to interpret any architecture question (software, infrastructure,
cloud, AI & MCP, etc.) and return a thorough answer.

The API key is optional and entered by the site owner in the Q&A settings,
stored only in the visitor's browser localStorage - never committed to the
repository. When no key is set, the local knowledge base in qa.js answers.
*/

const GENAI_KEY_STORAGE = "ate-gemini-key";

const GENAI_CONFIG = {
  model: "gemini-flash-latest",
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/",
};

const GENAI_SYSTEM_PROMPT =
  "You are a world-class software and systems architect with deep expertise in " +
  "software engineering, distributed systems, cloud architecture, infrastructure, " +
  "AI/ML systems, and the Model Context Protocol (MCP). " +
  "Answer the user's architecture question thoroughly, correctly, and precisely. " +
  "Tailor the depth to the user: beginners get clear, plain-language explanations; " +
  "experts get precise technical depth. " +
  "Structure answers with short paragraphs and bullet lists where helpful. " +
  "Use Markdown: **bold** for key terms, `code` for commands or identifiers, and " +
  "fenced code blocks for configuration or API examples. " +
  "Be honest about tradeoffs and when there is no single right answer. " +
  "Keep answers focused and directly on the question.";

function getGenAIKey() {
  try {
    return localStorage.getItem(GENAI_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

function setGenAIKey(key) {
  try {
    if (key) {
      localStorage.setItem(GENAI_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GENAI_KEY_STORAGE);
    }
  } catch {
    /* storage unavailable */
  }
}

function genAIEnabled() {
  return Boolean(getGenAIKey());
}

async function askGenAI(question) {
  const apiKey = getGenAIKey();
  if (!apiKey) {
    throw new Error("no-key");
  }
  const url = GENAI_CONFIG.endpoint + GENAI_CONFIG.model + ":generateContent";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: GENAI_SYSTEM_PROMPT }],
      },
      contents: [{ role: "user", parts: [{ text: question }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 2048,
      },
    }),
  });
  if (!response.ok) {
    throw new Error("Gemini API error: " + response.status);
  }
  const data = await response.json();
  const text = (data.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text || "")
    .join("")
    .trim();
  if (!text) {
    throw new Error("Empty response from Gemini");
  }
  return text;
}

function saveGenAIKey() {
  const input = document.getElementById("qaApiKey");
  if (!input) return;
  setGenAIKey(input.value);
  updateGenAIStatus();
  if (getGenAIKey()) {
    input.value = "";
    input.placeholder = "Saved - key stored in this browser only";
  }
}

function updateGenAIStatus() {
  const status = document.getElementById("qaKeyStatus");
  if (!status) return;
  if (genAIEnabled()) {
    status.textContent =
      "AI answers enabled. Key is stored in this browser only.";
    status.className = "qa-key-status qa-key-on";
  } else {
    status.textContent =
      "Local knowledge base mode. Add a free Gemini API key to enable AI answers for any architecture question.";
    status.className = "qa-key-status qa-key-off";
  }
}

function initGenAI() {
  const input = document.getElementById("qaApiKey");
  if (input) {
    input.placeholder = genAIEnabled()
      ? "Saved - key stored in this browser only"
      : "Paste your Gemini API key (optional)";
  }
  updateGenAIStatus();
}
