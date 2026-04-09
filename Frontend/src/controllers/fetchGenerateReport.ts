import axios from "axios";
import type { ReportBody } from "../page/MainDiv";


export class FetchGenerateReport {
    async execute(profileInfo: ReportBody) {
        try {
            console.log("fetchGenerateReport", profileInfo.user);
            const reportResponse = await axios.post(`http://localhost:3000/generateReport`, profileInfo);

            return reportResponse.data;
        }
        catch(e) {
            console.error("Erro ao gerar relatório:", e);

            throw new Error("Não foi possível gerar o relatório do perfil.");
        }
    }
}