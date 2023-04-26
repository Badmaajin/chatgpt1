import { Input } from "postcss";
import { useState } from "react";

const API_KEY = "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";

export default function ChatComponent() {
    const [output, setOutput] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [history, setHistory] = useState([]);

    const getMessage = async () => {
        console.log("clicked");
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: inputValue }],
                max_tokens: 1000,
            }),
        };
        try {
            const response = await fetch(
                "https://api.openai.com/v1/chat/completions",
                options
            );
            const data = await response.json();
            console.log(data);
            setOutput(data.choices[0].message.content);
            if (data.choices[0].message.content) {
                const updatedHistory = [...history, inputValue];
                setHistory(updatedHistory);
                setInputValue("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const clearInput = () => {
        setInputValue("");
    };

    return (
        <>
            <div className="w-full h-screen text-center justify-items-center text-indigo-400 bg-cover bg-fixed bg-[url('/header.png')]">
                <div className="w-full container mx-auto">
                    <div className="w-full flex items-center justify-between">
                        <a
                            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold m-6 text-2xl lg:text-4xl"
                            href="#"
                        >
                            Rain
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                                blur
                            </span>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col w-full  justify-between overflow-y-hidden p-10">
                    <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                        <div className="group w-full text-blue-300  dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
                            <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                                <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                                    <p>{setInputValue}</p>
                                </div>
                            </div>
                        </div>
                        <div className="group w-full text-blue-300 border-b border-black/10 dark:border-gray-900/5  dark:bg-[#444654]">
                            <div className=" gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                                <p>{output}</p>
                            </div>
                        </div>

                        <div className="mb-4 justify-items-center">
                            <label
                                className="block text-blue-300 py-2 font-bold mb-2"
                                for="emailaddress"
                            >
                                Хүссэн асуултаа асууна уу!
                            </label>
                            <input
                                className="peer h-8 w-full border-none p-0 placeholder-transparent justify-items-center focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                type="text"
                                value={inputValue}
                                placeholder="send a message"
                                onChange={(event) =>
                                    setInputValue(event.target.value)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <button
                                className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                type="button"
                                onClick={getMessage}
                            >
                                Илгээх
                            </button>
                            <button
                                className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                type="button"
                                onClick={clearInput}
                            >
                                Цэвэрлэх
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
