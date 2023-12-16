import "./styles.css";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {data} from "./config.js";
export default function App() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState("");
  const api_key = data.API_KEY; // Enter your google API Key here
  const genAI = new GoogleGenerativeAI(api_key);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = "say something short and interesting";

  async function callAPI() {
    setLoading("Loading");
    var p = document.getElementById("textfield").value;
    if (p === "") {
      p = prompt;
    }

    const result = await model.generateContent(p);
    const response = await result.response;
    const text = await response.text();
    setLoading("");
    setOutput(text);
  }

  return (
    <div className="App">
      <h1>Hello!</h1>
      <h2>Type Something in the formfield to get a response</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          callAPI();
        }}
      >
        <input
          type="text"
          id="textfield"
          defaultValue="Tell me a dad joke"
        ></input>
        <input type="submit"></input>
      </form>
      <p>{loading}</p>
      <p>{output}</p>
    </div>
  );
}
