import { FaSearch } from 'react-icons/fa'; 

export function MainDiv() {
    
    return (
        <div className="flex flex-col items-center w-full h-[580px] gap-10">
            <h1 className="font-bold text-[36px] mt-[100px]"> Bem vindo(a) à página de consulta de dados da Intellux! </h1>
            <h2 className="text-lg"> Obtenha informações e dados estatísticos de perfis do <i>Instagram</i> com apenas um clique.</h2>

            <div className="relative bg-[#d3d3d1] w-[600px] h-[70px] mt-[25px] rounded-full shadow-md border border-[#61615f] flex items-center">

                <FaSearch className="absolut mt-5 ml-5 w-[25px] transform -translate-y-1/2 text-black" />

                <input 
                    type="text"
                    placeholder="Digite o @ do usuário do Instagram"
                    className="bg-[#d3d3d1] w-full h-full pl-3 rounded-full placeholder-[#5a5a59] focus:outline-none"
                    
                />
            </div>
            
        </div>
    )
}