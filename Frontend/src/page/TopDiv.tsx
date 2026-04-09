import intelluxLogo from '../assets/intellux-logo.png';
import { FaChevronDown } from "react-icons/fa";
import { useState } from 'react';
import type { ReactNode } from "react";
import { BR, US, ES } from "country-flag-icons/react/3x2";
import { renderLang } from '../utils/renderLang';
import type { LanguageOptions } from '../utils/LangContext';
import { LangContext } from '../utils/LangContext';
import { useContext } from 'react';



interface TopDivProps {
  children?: ReactNode;
}

export function TopDiv({ children }: TopDivProps) {

    const [open, setOpen] = useState(false);
    const LN_BR :LanguageOptions = "pt-br";
    const LN_EN :LanguageOptions = "en";
    const LN_ES :LanguageOptions = "es";
    const { selectedLanguage, setSelectedLanguage } = useContext(LangContext)!;

    return (
        <div className='relative'>
            <div className="h-[70px] mt-[16px] ml-[20px] mr-[20px] flex">
                <div className="bg-[#d6fb49] flex items-center w-[600px] h-[70px] rounded-full shadow-md">
                    <button className='ml-8 mr-8'>
                        <img alt="intellux-logo" src={intelluxLogo} className='w-32'  />
                    </button>
                    <ul className='flex items-center gap-6 text-[15px] text-[#030f13]'>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Soluções", "Solutions", "Soluciones")}</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Planos", "Plans", "Planes")}</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Blog</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Sobre nós", "About us", "Acerca de")}</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>{renderLang(selectedLanguage, "Ajuda", "Help", "Ayuda")}</button></li>
                    </ul>
                </div>

                <div className="bg-[#d6fb49] ml-auto flex items-center justify-center w-[600px] h-[70px] rounded-full shadow-md">
                    <ul className='flex items-center gap-[70px] text-[15px] text-[#030f13] '>
                        <li>
                            <div onClick={() => setOpen(!open)} className='flex items-center gap-2 cursor-pointer'>
                                {renderLang(selectedLanguage, "Português", "Inglês", "Espanhol")}
                                <FaChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                            </div>
                            {open === true
                                ?   (
                                        <div className='bg-white mt-[10px] border border-[#d3d3d1] rounded-lg shadow-md w-[200px] h-[200px] absolute z-50 flex flex-col'>
                                            <div onClick={ () => setSelectedLanguage(LN_BR)} className='w-full h-1/3 gap-3 flex items-center p-3 border-b border-[#d3d3d1] cursor-pointer'>
                                                <div className='flex w-5'>
                                                    <BR />
                                                </div>
                                                Português
                                            </div>
                                            <div onClick={ () => setSelectedLanguage(LN_EN)} className='w-full h-1/3 gap-3 flex items-center p-3 cursor-pointer'>
                                                <div className='flex w-5'>
                                                    <US />
                                                </div>
                                                Inglês
                                            </div>
                                            <div onClick={ () => setSelectedLanguage(LN_ES)} className='w-full h-1/3 gap-3 flex items-center p-3 border-t border-[#d3d3d1] cursor-pointer'>
                                                <div className='flex w-5'>
                                                    <ES />
                                                </div>
                                                Espanhol
                                            </div>
                                        </div>
                                    )
                                : (<div></div>)
                            }
                        </li>
                        <li>
                            <button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>
                                {renderLang(selectedLanguage, "Acesse a plataforma", "Access the platform", "Accede la plataforma")}
                            </button>
                        </li>
                        <li className='w-[180px] h-[42px] flex items-center justify-center'>
                            <button className='bg-[#0b2f3a] text-[#d6fb49] font-bold w-full h-full rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200'>
                                {renderLang(selectedLanguage, "Iniciar agora", "Start now", "Comenzar ahora")}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}