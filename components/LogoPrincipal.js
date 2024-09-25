import {styled} from "nativewind"; 
import { View } from "react-native-web";

const ViewStyled = styled(View)

export function LogoPrincipal (){
    return(
        <Image source={require('../assets/icon.png')} className={'w-258 h-268 flex-shrink-0 rounded-full bg-[url(<path-to-image>)] bg-lightgray bg-cover bg-center no-repeat'} />
    )
}