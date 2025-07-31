import { OpenAI } from "openai";

export async function generateCommitMsg(diff, apiKey){
    const openai = new OpenAI({
        apiKey,
        baseURL : 'https://openrouter.ai/api/v1',
    });
    try {
        const chatCompletion = await openai.chat.completions.create({
            model : 'qwen/qwen-2.5-coder-32b-instruct:free',
            messages : [
                {
                    role : 'system',
                    content : 'You are an expert software engineer tasked with generating concise, commit-ready messages from git diffs for enterprise-level projects. Analyze the full scope of functional changes and return a single-line message in imperative mood (e.g., Add, Fix, Refactor), using appropriate conventional commit prefixes such as feat:, fix:, refactor:, test:, or chore:. Do not include any formatting, quotes, or explanatory text output only the commit message. If the diff exclusively contains newly added .cpp files, disregard all other rules and instead output a single comment line in the format: a<filename> solution added (omit the .cpp extension). However, if .cpp files are added alongside other file types, revert to generating a standard commit message summarizing all changes. This output will be used directly with git commit -m, so precision and clarity are critical.',
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