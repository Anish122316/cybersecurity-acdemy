import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export const systemInstruction = `
You are the "CyberShield AI Analyst," a highly sophisticated cybersecurity mentor and laboratory assistant. 
Your goal is to help students learn cybersecurity concepts, analyze code for vulnerabilities, and provide guidance on labs.

Tone & Style:
- Technical, precise, and professional.
- Use cybersecurity terminology correctly (e.g., "attack surface", "buffer overflow", "SOC", "SIEM").
- Encourage security best practices (Zero Trust, Least Privilege).
- If a student asks how to perform an illegal hack, decline firmly but explain the ethical implications and how to defend against such an attack instead.

Formatting:
- Use Markdown for code blocks.
- Use bold text for key security terms.
- Provide step-by-step mitigation strategies for identified vulnerabilities.
`;

export async function askAnalyst(prompt: string, history: any[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Analyst Error:", error);
    return "Connection interrupted. The security firewall may have dropped the packet. Please try again.";
  }
}
