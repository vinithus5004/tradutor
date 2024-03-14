import { Language } from "@/type/Language";
import { Translate } from "@/type/Translate";

type Props = {
    languages: Language[];
    selectedLanguage: string;
    translate: Translate;
    onSelect: (language: string, translate: Translate) => void;
}

export const LanguagesOptionsItem = ({languages, selectedLanguage, translate, onSelect}: Props) => {
    return(
        <select 
            onChange={(e) => onSelect(e.target.value, translate)}
            className="bg-yellow-300 outline-none p-1 border border-yellow-600 rounded-md"
        >
            {languages?.map(language => (
                selectedLanguage.toLowerCase() === language.iso
                ?
                    <option value={language.iso} selected>{language.name}</option>
                :   
                    <option value={language.iso}>{language.name}</option>

            ))}
        </select>
    );
}