"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguangesOptionsItem } from "@/components/LanguangesOptionsItem";
import { languanges } from "@/data/languanges";
import { Translate } from "@/type/Translate";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        if(inputValue.trim() === '') setTranslatedValue('');
    }, [inputValue]);

    const handleSelectedLanguange = (languange: string, translate: Translate) => {
        if(translate === 'FROM'){
            setTranslateFrom(languange);
        }else if(translate === 'TO'){
            setTranslateTo(languange);
        }
    }

    const clear = () => {
        setInputValue('');
        setTranslatedValue('');
    }

    return(
        <div className="w-full h-screen flex flex-col justify-between items-center bg-gradient-to-t from-blue-600 to-blue-400">
            <Header/>
            <div className="w-full max-w-2xl bg-yellow-200 text-black border rounded-md p-3">
                <div className="flex justify-around mb-3">
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
                    rows={5}
                    cols={25}
                    placeholder="Digitar Texto" 
                    className=" resize-none bg-yellow-100 outline-none border-none py-1 px-2"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    ></textarea>

                    <textarea 
                    rows={5}
                    cols={25}
                    placeholder="Tradução"
                    className="resize-none bg-yellow-100 outline-none border-none py-1 px-2"
                    value={translatedValue}
                    ></textarea>
                </div>
                <div className="flex justify-center gap-4 mt-3">
                    <button onClick={() => translateText(inputValue)} className="bg-yellow-300 py-1 px-2 rounded-md">Traduzir</button>
                    <button onClick={clear} className="bg-yellow-300 py-1 px-2 rounded-md">Limpar</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Page;