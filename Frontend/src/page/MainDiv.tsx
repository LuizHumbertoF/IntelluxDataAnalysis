import { FaSearch } from 'react-icons/fa'; 
import { useContext, useEffect, useState } from 'react';
import { LangContext } from '../utils/LangContext';
import { renderLang } from '../utils/renderLang';
import { FetchGetProfileData } from '../controllers/fetchGetProfileData';

export function MainDiv() {

    const fetchGetProfileData = new FetchGetProfileData();
    const { selectedLanguage } = useContext(LangContext)!;
    const [ usernameSearch, setUsernameSearch ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [ totalLikes, setTotalLikes ] = useState(0);
    const [ totalComments, setTotalComments ] = useState(0);
    const [likesMean, setLikesMean ] = useState(0);
    const [commentsMean, setCommentsMean ] = useState(0);
    
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
        
        if (!profileData?.latestPosts || profileData.latestPosts.length === 0) {
            setLikesMean(0);
            setCommentsMean(0);
            setTotalLikes(0);
            setTotalComments(0);
            return; // Para a função por aqui
        }
        
        let totalLikesLocal = 0;
        let totalCommentsLocal = 0;

        profileData.latestPosts.forEach((post: any) => {
            totalLikesLocal += post.likesCount;
            totalCommentsLocal += post.commentsCount;
        });

        const numberPosts = profileData.latestPosts.length;

        setLikesMean(Math.round(totalLikesLocal/numberPosts));
        setCommentsMean(Math.round(totalCommentsLocal/numberPosts));
        setTotalLikes(totalLikesLocal);
        setTotalComments(totalCommentsLocal);

    };

    useEffect(() => {
        if(profileData) {
            likesAndCommentsMean();
        }
    }, [profileData]);
    

    return (
        <div className={`flex flex-col items-center w-full h-[500px] gap-10 relative`}>

            <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${loading ? `opacity-100 z-10` : `opacity-0 pointer-events-none -z-10`}`}>
                <div className='bg-[#d3d3d1] font-bold flex flex-col items-center justify-center w-[190px] h-[50px] shadow-md border-1 border-[#61615f] rounded-full '>
                    {renderLang(selectedLanguage, "Carregando...", "Loading...", "Cargando...")}
                </div>
            </div>

            <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${profileData ? `opacity-100 z-10` : `opacity-0 pointer-events-none -z-10`}`}>
                <div className='bg-[#d3d3d1] w-[700px] h-[450px] flex flex-col items-center justify-start rounded-md shadow-md border border-[#8f8f87]'>
                    <div className='flex mt-4 flex-col items-center justify-center'>
                        <img src={profileData?.profilePicUrlHD} 
                            alt="Imagem de perfil" 
                            className="w-16 h-16 rounded-full my-[15px]"
                            onError={(e) => {
                                e.currentTarget.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                            }}
                        />
                        <h2 className=" font-bold text-xl">{profileData?.fullName}</h2>
                    </div>

                    <div className=' font-black gap-4 flex flex-col justify-center items-center h-full w-full'>
                        <div className='flex gap-4'>
                            <h3>Seguidores: {profileData?.followersCount}</h3>
                            <h3>Seguindo: {profileData?.followsCount}</h3>
                            <h3>Quantidade de posts: {profileData?.postsCount}</h3>
                        </div>
                        <div className='flex gap-4'>
                            <h3>Nº total de curtidas: {totalLikes}</h3>
                            <h3>Nº total de comentários: {totalComments}</h3>
                        </div>
                        <div className='flex gap-4'>
                            <h3>Média de curtidas: {likesMean}</h3>
                            <h3>Média de comentários: {commentsMean}</h3>
                        </div>

                    </div>

                    <button
                        className='bg-[#0b2f3a] text-[#d6fb49] mb-6 font-bold w-[95px] h-[80px] rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200 shadow-md border'
                        onClick={
                            () => setProfileData(null)
                        }>
                        {renderLang(selectedLanguage, "Voltar", "Go back", "Volver")}
                    </button>

                </div>
            </div>
            
            <div className={` absolute gap-8 top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${(!profileData && !loading) ? `opacity-100 z-10` : `opacity-0 pointer-events-none -z-10`}`}>
                <h1 className="font-bold text-[36px]"> {renderLang(selectedLanguage, "Bem vindo(a) à página de consulta de dados da Intellux!", 
                    "Welcome to the Intellux data consultation page!", 
                    "¡Bienvenido(a) a la página de consulta de datos de Intellux!")} 
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
                        className='bg-[#0b2f3a] text-[#d6fb49] font-bold w-[150px] h-[42px] rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200 shadow-md border border-black'
                        onClick={handleClickSearch}
                    >
                        {renderLang(selectedLanguage, "Buscar", "Search", "Buscar")}
                    </button>
                </div>
            </div>    
        </div>
    )
}