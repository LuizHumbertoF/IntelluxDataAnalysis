import { MainDiv } from './MainDiv';
import { TopDiv } from './TopDiv';
import { BottomDiv } from './BottomDiv';


export function MainPage() {

    return (
        <div className="w-full h-full flex-col">
            <TopDiv>
                <MainDiv/>
            </TopDiv>    
            <BottomDiv/>
        </div>
    )
}