import { v2 } from "@google-cloud/translate";

async function translateText(text, target) {
    const translate = new v2.Translate({
        apiEndpoint: "translation.googleapis.com",
    });
    const [translation] = await translate.translate(text, target);
    return translation;
}

export default translateText;
