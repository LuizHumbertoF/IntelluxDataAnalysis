import intelluxLogo from '../assets/intellux-logo.png';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export function BottomDiv() {

    return (
        
        <div className="flex w-full h-[75px] pt-[5px]">
            <div className="bg-[#d6fb49] flex items-center w-full h-full border-t border-[#61615f] shadow-md">
                <div className="w-1/3 h-full flex items-center pl-[60px]">
                    <img alt="intellux-logo" src={intelluxLogo} className='w-32'  />
                </div>

                <div className=" w-1/3 h-full flex items-center justify-center">
                    <ul className='flex items-center gap-6 text-[15px] text-[#030f13]'>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Soluções</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Planos</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Blog</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Sobre nós</button></li>
                        <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Ajuda</button></li>
                    </ul>
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