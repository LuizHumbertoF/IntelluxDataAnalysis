import { FaSearch } from 'react-icons/fa'; 
import { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { renderLang } from '../utils/renderLang';

export function MainDiv() {

    const { selectedLanguage } = useContext(LangContext)!;
    
    return (
        <div className="flex flex-col items-center w-full h-[505px] gap-10 relative">
            <h1 className="font-bold text-[36px] mt-[100px]"> {renderLang(selectedLanguage, "Bem vindo(a) à página de consulta de dados da Intellux!", 
                "Welcome to the Intellux data consultation page!", 
                "¡Bienvenido(a) a la página de consulta de datos de Intellux!")} 
            </h1>
            
            <h2 className="text-lg"> {renderLang(selectedLanguage, `Obtenha informações e dados estatísticos de perfis do Instagram com apenas um clique.`, 
                `Get information and statistical data from Instagram profiles with just one click.`, 
                `Obtén información y datos estadísticos de perfiles de Instagram con solo un clic.`)}
            </h2>

            <div className='w-[900px] h-[90px] flex items-center justify-end gap-2 pr-8 pt-6'>
                <div className="relative bg-[#d3d3d1] w-[600px] h-[65px] rounded-full shadow-md border border-[#61615f] flex items-center">

                    <FaSearch className="absolut mt-5 ml-5 w-[25px] transform -translate-y-1/2 text-black" />

                    <input 
                        type="text"
                        placeholder={renderLang(selectedLanguage, "Digite o username do usuário do Instagram", "Enter the Instagram username", "Ingresa el usuario de Instagram")}
                        className="bg-[#d3d3d1] w-full h-full pl-3 rounded-full placeholder-[#5a5a59] focus:outline-none"
                        
                    />
                </div>

                <button className='bg-[#0b2f3a] text-[#d6fb49] font-bold w-[150px] h-[42px] rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200 shadow-md border border-black'>
                    {renderLang(selectedLanguage, "Buscar", "Search", "Buscar")}
                </button>
            </div>
            
        </div>
    )
}