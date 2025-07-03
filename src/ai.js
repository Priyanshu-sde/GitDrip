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
                    content : 'You are an expert software engineer. Write a concise, clear commit message for the following git diff.',
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