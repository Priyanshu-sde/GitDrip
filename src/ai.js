import { OpenAI } from "openai";

export async function generateCommitMsg(diff, apiKey){
    const openai = new OpenAI({
        apiKey,
        baseURL : 'https://openrouter.ai/api/v1',
    });
    try {
        const chatCompletion = await openai.chat.completions.create({
            model : 'meta-llama/llama-3.3-70b-instruct',
            messages : [
                {
                    role : 'system',
                    content : 'You are an expert software engineer. Analyze the following git diff and return only a clear, concise, commit-ready message that accurately reflects what the code change does. The message must be a single line, written in imperative mood (e.g., "Add...", "Fix...", "Refactor..."), and should not include any explanation, formatting, or quotation marks. Do not mention the words "diff" or "git"—simply describe the actual change. When applicable, use a conventional commit prefix such as "feat:", "fix:", or "refactor:". The result will be used directly in git commit -m',
                },
                {
                    role: 'user',
                    content : diff.slice(0,4000),            
                }
            ], 
            max_tokens : 60,
            temperature : 0.2,
        });
        return chatCompletion.choices?.[0]?.message?.content?.trim() || 'Update code';
    } catch(e) {
        console.error("erro occured at ai:", e.message);
    }
}