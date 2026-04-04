import intelluxLogo from '../assets/intellux-logo.png';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { renderLang } from '../utils/renderLang';

export function BottomDiv() {
    
    const { selectedLanguage } = useContext(LangContext)!;

    return (
        
        <div className="flex w-full h-[80px] pt-[5px]">
            <div className="bg-[#d6fb49] flex items-center w-full h-full border-t border-[#61615f] shadow-md">
                <div className="w-1/3 h-full flex items-center pl-[60px]">
                    <img alt="intellux-logo" src={intelluxLogo} className='w-32'  />
                </div>

                <div className=" w-1/3 h-full flex flex-col items-center justify-end">
                    <ul className='flex items-center pb-2 gap-6 text-[15px] text-[#030f13]'>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Soluções", "Solutions", "Soluciones")}</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Planos", "Plans", "Planes")}</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Blog</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Sobre nós", "About us", "Acerca de")}</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Ajuda", "Help", "Ayuda")}</button></li>
                    </ul>
                    <div className='text-xs'>
                        {renderLang(selectedLanguage, "© 2026 Intellux. Todos os direitos reservados.", "© 2026 Intellux. All rights reserved.", "© 2026 Intellux. Todos los derechos reservados.")}
                    </div>
                </div>
                
                <div className='w-1/3 h-full gap-3 flex pr-[65px] items-center justify-end'>
                    <button>
                        <FaInstagram size={35} color="#0b2f3a"/>
                    </button>

                    <button>
                        <FaLinkedin size={35} color="#0b2f3a"/>
                    </button>
                </div>
            </div>
        </div>

    )
}