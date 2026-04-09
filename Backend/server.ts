import express from 'express';
import type { Request, Response } from 'express'; 
import { ApifyClient } from 'apify-client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from "dotenv";


const app = express();
dotenv.config();

console.log("Chave do Apify:", process.env.APIFY_TOKEN ? "OK" : "FALHOU");
console.log("Chave do Gemini:", process.env.GEMINI_TOKEN ? "OK" : "FALHOU");

if (!process.env.APIFY_TOKEN || !process.env.GEMINI_TOKEN) {
    throw new Error("APIFY_TOKEN ou GEMINI_TOKEN não definido no .env");
}


const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

app.use(cors());
app.use(express.json());

app.get("/getProfileData", async (req: Request, res: Response) => {
    
    const profileName = req.query.username as string;
    if(!profileName) {
        return res.status(400).json({ message: "Por favor, forneça um username." });
    }

    try {

        console.log(`iniciando busca por ${profileName}`);
        const input = {
            "usernames": [
                profileName
            ]
        };
        
        const run = await client.actor("apify/instagram-profile-scraper").call(input);

        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        const keysProfile = items[0] ? Object.keys(items[0]) : [];

        res.json({
            message: `Dados do perfil ${profileName} coletados com sucesso.`,
            keysAvaliable: keysProfile,
            username: items[0]?.username,
            fullName: items[0]?.fullName,
            privateAccount: items[0]?.private,
            followersCount: items[0]?.followersCount,
            followsCount: items[0]?.followsCount,
            postsCount: items[0]?.postsCount,
            latestPosts: items[0]?.latestPosts,
            profilePicUrlHD: items[0]?.profilePicUrlHD
        });

    }
    catch(e) {
        console.error("Erro ao buscar dados:", e);
        res.status(500).json({ message: "Erro ao consultar a API do Apify" });
    }
    
});

app.post("/generateReport", async (req: Request, res: Response) => {

    const { selectedLanguage, user, fullName, privateAccount, followersCount, followsCount, numberPosts, totalLikes, totalComments, likesMean, commentsMean } = req.body;
    const privatePortuguese = privateAccount ? "verdadeiro" : "falso";
    
    if (!fullName || followersCount === undefined || !selectedLanguage) {
        return res.status(400).json({ message: "Faltam dados para gerar o relatório." });
    }

    let languageFullName = ""
    if(selectedLanguage === "pt-br") {
        languageFullName = "portugues brasil";
    } else if(selectedLanguage === "en") {
        languageFullName = "ingles";
    } else if(selectedLanguage === "es") {
        languageFullName = "espanhol";
    }
    console.log(languageFullName);

    try{

        if (!process.env.GEMINI_TOKEN) {
            throw new Error("APIFY_TOKEN não definido no .env");
        }


        const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

        const prompt = `Você é um especialista em marketing digital sênior da startup Intellux.
        Crie um relatório curto na linguagem ${languageFullName}, engajador e direto ao ponto (máximo de 3 parágrafos) analisando os seguintes dados do perfil de ${fullName}:
        - Username: ${user};
        - Seguidores: ${followersCount};
        - Seguindo: ${followsCount};
        - Privacidade da conta: ${privatePortuguese};
        - Numero de posts: ${numberPosts};
        - Número total de likes do perfil: ${totalLikes};
        - Número total de comentários do perfil: ${totalComments};
        - Média de curtidas por post: ${likesMean};
        - Média de comentários por post: ${commentsMean};
        Não colocar efeitos de negrito, etc, na resposta fornecida (apenas o texto cru). Atente-se que se a conta for privada, não será possível verificar as outras métricas da conta, apenas a quantidade de seguidores e seguindo, todos os outros atributos serão zerados. No final, dê uma sugestão breve de como essa pessoa pode melhorar o engajamento. 
        Assine como "Intellux IA".`;

        console.log(prompt);

        let tentativas = 0;
        const maxTentativas = 3;
        let responseText = "";

        while (tentativas < maxTentativas) {
            try {
                const result = await model.generateContent(prompt);
                responseText = result.response.text();
                break;
            } catch(e: any) {
                tentativas++;
                console.warn(`Tentativa ${tentativas} falhou no Gemini. Aguardando...`);
                
                if (e.status === 503 && tentativas < maxTentativas) {
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa de 2s
                } else {
                    throw e;
                }
            }
        }

        console.log("Relatório gerado com sucesso.");

        return res.json({ 
            message: "Relatório gerado com sucesso",
            report: responseText 
        });
    } catch(e) {
        console.error("Erro na API do Gemini:", e);
        return res.status(500).json({ message: "Erro ao gerar o relatório com a IA" });
    }

})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});