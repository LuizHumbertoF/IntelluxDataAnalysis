import intelluxLogo from '../assets/intellux-logo.png';

export function TopDiv() {

    return (
        <div className="h-[70px] mt-[16px] ml-[20px] mr-[20px] flex">
            <div className="bg-[#d6fb49] flex items-center w-[600px] h-[70px] rounded-full shadow-md">
                <button className='ml-8 mr-8'>
                    <img alt="intellux-logo" src={intelluxLogo} className='w-32'  />
                </button>
                <ul className='flex items-center gap-6 text-[15px] text-[#030f13]'>
                    <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Soluções</button></li>
                    <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Planos</button></li>
                    <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Blog</button></li>
                    <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Sobre nós</button></li>
                    <li><button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>Ajuda</button></li>
                </ul>
            </div>

            <div className="bg-[#d6fb49] ml-auto flex items-center justify-center w-[600px] h-[70px] rounded-full shadow-md">
                <ul className='flex items-center gap-[80px] text-[15px] text-[#030f13] pl-[5px]'>
                    <li><button>Português</button></li>
                    <li>
                        <button className='hover:underline hover:-translate-y-0.5 transition-transform duration-200'>
                            Acesse a plataforma
                        </button>
                    </li>
                    <li className='w-[180px] h-[42px] flex items-center justify-center'>
                        <button className='bg-[#0b2f3a] text-[#d6fb49] font-bold w-full h-full rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200'>
                            Iniciar agora
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}