import { MainDiv } from './MainDiv';
import { TopDiv } from './TopDiv';


export function MainPage() {

    return (
        <div className="w-full h-full flex-col">
            <TopDiv/>
            <MainDiv/>
        </div>
    )
}