import { FaSearch } from 'react-icons/fa'; 

export function MainDiv() {
    
    return (
        <div className="flex flex-col items-center w-full h-[505px] gap-10">
            <h1 className="font-bold text-[36px] mt-[100px]"> Bem vindo(a) à página de consulta de dados da Intellux! </h1>
            <h2 className="text-lg"> Obtenha informações e dados estatísticos de perfis do <i>Instagram</i> com apenas um clique.</h2>

            <div className='w-[900px] h-[90px] flex items-center justify-end gap-2 pr-8 pt-6'>
                <div className="relative bg-[#d3d3d1] w-[600px] h-[65px] rounded-full shadow-md border border-[#61615f] flex items-center">

                    <FaSearch className="absolut mt-5 ml-5 w-[25px] transform -translate-y-1/2 text-black" />

                    <input 
                        type="text"
                        placeholder="Digite o @ do usuário do Instagram"
                        className="bg-[#d3d3d1] w-full h-full pl-3 rounded-full placeholder-[#5a5a59] focus:outline-none"
                        
                    />
                </div>

                <button className='bg-[#0b2f3a] text-[#d6fb49] font-bold w-[150px] h-[42px] rounded-full hover:underline hover:-translate-y-0.5 transition-transform duration-200 shadow-md border border-black'>
                    Buscar
                </button>
            </div>
            
        </div>
    )
}