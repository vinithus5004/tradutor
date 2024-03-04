"use client";

import { LanguangesOptionsItem } from "@/components/LanguangesOptionsItem";
import { languanges } from "@/data/languanges";
import { Translate } from "@/type/Translate";
import { api } from "@/utils/api";
import { useState } from "react";

const Page = () => {
    const [inputValue, setInputValue] = useState('');
    const [translatedValue, setTranslatedValue] = useState('');
    const [translateFrom, setTranslateFrom] = useState('pt-br');
    const [translateTo, setTranslateTo] = useState('en');

    const translateText = async (text: string) => {
        if(text.trim() !== ''){
            setTranslatedValue('Traduzindo...');
            const response = await api.get(`/get?q=${text.trim()}&langpair=${translateFrom}|${translateTo}`);
            setTranslatedValue(response.data.responseData.translatedText);
        }
    }

    const handleSelectedLanguange = (languange: string, translate: Translate) => {
        if(translate === 'FROM'){
            setTranslateFrom(languange);
        }else if(translate === 'TO'){
            setTranslateTo(languange);
        }
    }

    const clearTranslate = () => {
        setInputValue('');
        setTranslatedValue('');
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-t from-blue-600 to-blue-400">
            <div className="w-full max-w-2xl bg-yellow-200 text-black border rounded-md">
                <div className="flex justify-around p-3">
                    <LanguangesOptionsItem
                        languanges={languanges}
                        selectedLanguange={translateFrom}
                        translate="FROM"
                        onSelect={handleSelectedLanguange}
                    />
                    <LanguangesOptionsItem
                        languanges={languanges}
                        selectedLanguange={translateTo}
                        translate="TO"
                        onSelect={handleSelectedLanguange}
                    />
                </div>
                <div className="flex justify-around">
                    <textarea 
                    name="" 
                    id="" 
                    placeholder="Digitar Texto" 
                    className="resize-none bg-yellow-50 outline-none border-none"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    ></textarea>

                    <textarea 
                    name="" 
                    id="" 
                    placeholder="Tradução"
                    className="resize-none bg-yellow-50 outline-none border-none"
                    value={translatedValue}
                    ></textarea>
                </div>
                <div className="flex justify-center">
                    <button onClick={() => translateText(inputValue)}>Traduzir</button>
                    <button onClick={clearTranslate}>Limpar</button>
                </div>
            </div>
        </div>
    );
}

export default Page;