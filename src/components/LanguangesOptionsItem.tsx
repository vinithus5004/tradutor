import { Languange } from "@/type/Languange";
import { Translate } from "@/type/Translate";

type Props = {
    languanges: Languange[];
    selectedLanguange: string;
    translate: Translate;
    onSelect: (languange: string, translate: Translate) => void;
}

export const LanguangesOptionsItem = ({languanges, selectedLanguange, translate, onSelect}: Props) => {
    return(
        <select 
            onChange={(e) => onSelect(e.target.value, translate)}
            className="bg-yellow-300 outline-none p-1 border border-yellow-600 rounded-md"
        >
            {languanges?.map(languange => (
                selectedLanguange.toLowerCase() === languange.iso
                ?
                    <option value={languange.iso} selected>{languange.name}</option>
                :   
                    <option value={languange.iso}>{languange.name}</option>

            ))}
        </select>
    );
}