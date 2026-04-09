import { TopDiv } from './TopDiv';
import { BottomDiv } from './BottomDiv';
import { FaCog } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { renderLang } from '../utils/renderLang';
import { useContext } from 'react';
import { LangContext } from '../utils/LangContext';


export function InConstructionPage() {

    const navigate = useNavigate();
    const { selectedLanguage } = useContext(LangContext)!;

    return (
        <div className="w-full h-full flex-col">
            <TopDiv>
                <div className=' bg-white gap-4 w-full h-[500px] flex flex-col items-center'>
                    <div className='flex flex-col w-full h-[470px] pt-[50px] justify-center items-center'>
                        <FaCog size={48} />
                        <h1 className='text-black text-[36px]'>Em manutenção!</h1>
                    </div>
                    <div className='flex items-center justify-center w-full h-[200px]'>
                        <button 
                            className='bg-[#d6fb49] text-[#0b2f3a] font-bold w-[150px] h-[42px] rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200 shadow-md '
                            onClick={() => navigate("/")}
                        >
                            {renderLang(selectedLanguage, "Voltar", "Go back", "Volver")}
                        </button>
                    </div>
                </div>
            </TopDiv>    
            <BottomDiv/>
        </div>
    )
}