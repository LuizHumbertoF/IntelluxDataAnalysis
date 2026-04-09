import axios from "axios";

export class FetchGetProfileData {
    async execute(username: string) {
        
        try {
            console.log("fetchGetProfileData", username);
            const profileDataResponse = await axios.get(`http://localhost:3000/getProfileData`, {
                params: {
                    username: username
                }
            });
            
            return profileDataResponse.data;
        }
        catch(e) {
            console.error("Erro ao conectar com o backend:", e);

            throw new Error("Não foi possível buscar os dados do perfil.");
        }
    }
}