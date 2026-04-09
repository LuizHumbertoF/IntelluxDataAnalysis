import express from 'express';
import type { Request, Response } from 'express'; 
import { ApifyClient } from 'apify-client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from "dotenv";


const app = express();
dotenv.config();

if (!process.env.APIFY_TOKEN) {
    throw new Error("APIFY_TOKEN não definido no .env");
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

    const { fullName, followersCount, followsCount,  totalLikes, totalComments, likesMean, commentsMean } = req.body;

    if (!fullName || followersCount === undefined) {
        return res.status(400).json({ message: "Faltam dados para gerar o relatório." });
    }

})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});