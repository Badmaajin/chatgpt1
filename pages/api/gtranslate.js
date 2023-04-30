import { v2 } from "@google-cloud/translate";
import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest } from "next";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const translate = new v2.Translate({
    apiEndpoint: "translation.googleapis.com",
});

async function translateText(text, target) {
    const [translation] = await translate.translate(text, target);
    return translation;
}

export default async function handler(req, res) {
    if (req.method == "POST") {
        try {
            const prompt = req.body.prompt;

            if (/[a-z]/i.test(prompt)) {
                const error = "Крилл үг шүү";
                console.log(error);
                res.status(200).send({ bot: error });
            } else {
                const sourceLanguage = await translate.detect(prompt);
                let translatedPrompt = prompt;

                // Translate prompt only if it's not in English
                if (sourceLanguage !== "en") {
                    translatedPrompt = await translateText(prompt, "en");
                }

                const response = await openai.createCompletion({
                    model: "gpt-3.5-turbo",
                    prompt: `${translatedPrompt}`,
                    temperature: 0,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0.5,
                    presence_penalty: 0,
                });

                let botResponse = response.data.choices[0].text;

                // Translate bot response if prompt was translated
                if (sourceLanguage !== "en") {
                    botResponse = await translateText(
                        botResponse,
                        sourceLanguage
                    );
                }

                res.status(200).send({ bot: botResponse });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error });
        }
    } else {
        return console.log("error");
    }
}
