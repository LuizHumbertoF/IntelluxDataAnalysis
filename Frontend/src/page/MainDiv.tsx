import { FaSearch } from 'react-icons/fa'; 
import { useContext, useEffect, useState } from 'react';
import { LangContext } from '../utils/LangContext';
import { renderLang } from '../utils/renderLang';
import { FetchGetProfileData } from '../controllers/fetchGetProfileData';
import { FetchGenerateReport } from '../controllers/fetchGenerateReport';
import type { LanguageOptions } from '../utils/LangContext';

export interface ReportBody {
    selectedLanguage: LanguageOptions;
    user: string;
    fullName: string;
    privateAccount: boolean;
    followersCount: number;
    followsCount: number;
    numberPosts: number;
    totalLikes: number;
    totalComments: number;
    likesMean: number;
    commentsMean: number;
}

export function MainDiv() {

    const fetchGetProfileData = new FetchGetProfileData();
    const fetchGenerateReport = new FetchGenerateReport();
    const { selectedLanguage } = useContext(LangContext)!;
    const [ usernameSearch, setUsernameSearch ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ loadingReport, setLoadingReport ] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [ reportBody, setReportBody] = useState<ReportBody | undefined>(undefined);
    const [ report, setReport ] = useState("");
    const [dots, setDots] = useState("");
    
    async function handleClickSearch() {
        
        try {

            setLoading(true);
            const response = await fetchGetProfileData.execute(usernameSearch);
            setLoading(false);

            console.log(response)
            setProfileData(response);  
                 

        }
        catch(e) {
            console.error("Erro ao buscar dados do usuário:", e);
            throw new Error("Erro na busca dos dados do usuário");
        }
        finally {
            setLoading(false);
        }


    };

    function likesAndCommentsMean() {

        let totalLikesLocal = 0;
        let totalCommentsLocal = 0;
        let meanLikesLocal = 0;
        let meanCommentsLocal = 0;
        let numberPosts = profileData.postsCount;

        if (profileData?.latestPosts && profileData.latestPosts.length > 0) {
            profileData.latestPosts.forEach((post: any) => {
                totalLikesLocal += post.likesCount;
                totalCommentsLocal += post.commentsCount;
            });

            meanLikesLocal = Math.round(totalLikesLocal/numberPosts);
            meanCommentsLocal = Math.round(totalCommentsLocal/numberPosts);
        }

        setReportBody({
            selectedLanguage: selectedLanguage,
            user: usernameSearch, 
            fullName: profileData.fullName,
            privateAccount: profileData.privateAccount,
            followersCount: profileData.followersCount,
            followsCount: profileData.followsCount,
            numberPosts: numberPosts,
            totalLikes: totalLikesLocal,
            totalComments: totalCommentsLocal,
            likesMean: meanLikesLocal,
            commentsMean: meanCommentsLocal
        });

    };

    async function generateReport() {
        try {
            setLoadingReport(true);
            if(!reportBody) {
                throw new Error("reportBody incompleto");
            }
            const IaReport = await fetchGenerateReport.execute(reportBody);
            setReport(IaReport.report);
        }
        catch(e) {
            console.error("Erro ao buscar dados do usuário:", e);
            throw new Error("Erro na busca dos dados do usuário");
        }
        finally {
            setLoadingReport(false);
        }
    }


    useEffect(() => {
        if(profileData) {
            likesAndCommentsMean();
        }
    }, [profileData]);

    useEffect(() => {
        if (reportBody && reportBody.user !== "") {
            generateReport();
        }
    }, [reportBody]);

    useEffect(() => {
        let intervalo: ReturnType<typeof setInterval>;

        if (loading) {
            intervalo = setInterval(() => {
                setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
            }, 500);
        } else {
            setDots("");
        }

        return () => clearInterval(intervalo);
        
    }, [loading]); 
    

    return (
        <div className={`flex flex-col items-center w-full h-[500px] gap-10 relative`}>

            <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${loading ? `opacity-100 z-10` : `opacity-0 pointer-events-none -z-10`}`}>
                <div className='bg-[#d3d3d1] flex flex-col p-[45px] justify-center w-[190px] h-[40px] shadow-md border-1 border-[#61615f] rounded-full '>
                    <h1 className='text-black text-[22px]'>{renderLang(selectedLanguage, "Carregando", "Loading", "Cargando")}{dots}</h1>
                </div>
            </div>

            <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${profileData ? `opacity-100 z-10` : `opacity-0 pointer-events-none -z-10`}`}>
                <div className='bg-[#d3d3d1] w-[600px] h-auto py-5 mt-7 mb-auto gap-3 flex flex-col items-center justify-start rounded-lg shadow-md border border-[#8f8f87]'>
                    <div className='flex flex-col items-center justify-center'>
                        {/*<img src={profileData?.profilePicUrlHD} 
                            alt="Imagem de perfil" 
                            className="w-16 h-16 rounded-full my-[15px]"
                            onError={(e) => {
                                e.currentTarget.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                            }}
                        />*/}
                        <h2 className=" font-bold text-xl">{profileData?.fullName}</h2>
                    </div>

                    <div className=' text-black gap-4 flex flex-col justify-start items-center h-full w-full'>
                        <div className='flex gap-4'>
                            <h3>{renderLang(selectedLanguage, "Seguidores", "Followers", "Seguidores")}: {profileData?.followersCount}</h3>
                            <h3>{renderLang(selectedLanguage, "Seguindo", "Following", "Siguiendo")}: {profileData?.followsCount}</h3>
                            <h3>{renderLang(selectedLanguage, "Quantidade de posts", "number of posts", "cantidad de publicaciones")}: {profileData?.postsCount}</h3>
                        </div>

                    </div>
                </div>

                <div className='bg-white w-[900px] h-[250px] mb-auto rounded-md border border-[#8f8f87] flex overflow-y-auto p-4 text-black'>
                    {loadingReport ? (renderLang(selectedLanguage, "Carregando...", "Loading...", "Cargando...")) : report}
                </div>
                    
        
                <button
                    className='bg-[#0b2f3a] text-[#d6fb49] mb-1 mt-1 font-bold w-[85px] h-[50px] rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200 shadow-md border'
                    onClick={
                        () => { 
                            setProfileData(null);
                            setReport("");               
                            setReportBody(undefined);    
                            setUsernameSearch("");
                        }       
                    }>
                    {renderLang(selectedLanguage, "Voltar", "Go back", "Volver")}
                </button>
            
                
            </div>
            
            <div className={` absolute gap-8 top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${(!profileData && !loading) ? `opacity-100 z-10` : `opacity-0 pointer-events-none -z-10`}`}>
                <h1 className="font-bold text-[36px]"> {renderLang(selectedLanguage, "Bem vindo à página de consulta de dados da Intellux!", 
                    "Welcome to the Intellux data consultation page!", 
                    "¡Bienvenido a la página de consulta de datos de Intellux!")} 
                </h1>
                
                <h2 className="text-lg"> {renderLang(selectedLanguage, `Obtenha informações e dados estatísticos de perfis do Instagram com apenas um clique.`, 
                    `Get information and statistical data from Instagram profiles with just one click.`, 
                    `Obtén información y datos estadísticos de perfiles de Instagram con solo un clic.`)}
                </h2>

                <div className='w-[900px] h-[90px] flex items-center justify-end gap-2 pr-8 '>
                    <div className="relative bg-[#d3d3d1] w-[600px] h-[65px] rounded-full shadow-md border border-[#61615f] flex items-center">

                        <FaSearch className="absolut mt-5 ml-5 w-[25px] transform -translate-y-1/2 text-black" />

                        <input 
                            type="text"
                            value={usernameSearch}
                            onChange={(e) => setUsernameSearch(e.target.value)}
                            placeholder={renderLang(selectedLanguage, "Digite o username do usuário do Instagram", "Enter the Instagram username", "Ingresa el usuario de Instagram")}
                            className="bg-[#d3d3d1] w-full h-full pl-3 rounded-full placeholder-[#5a5a59] focus:outline-none"    
                        />
                    </div>

                    <button 
                        className='bg-[#0b2f3a] text-[#d6fb49] font-bold w-[150px] h-[42px] rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200 shadow-md'
                        onClick={handleClickSearch}
                    >
                        {renderLang(selectedLanguage, "Buscar", "Search", "Buscar")}
                    </button>
                </div>
            </div>    
        </div>
    )
}