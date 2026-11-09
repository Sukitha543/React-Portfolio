
const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");

// Limit the number of running function instances.
setGlobalOptions({ maxInstances: 10 });

// Access the API key stored in Firebase Secret Manager.
const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

// Create the contact form email endpoint.
exports.sendContactEmail = onRequest(
    {
        // Replace this with your actual Vercel URL.
        cors: [
            "http://localhost:5173",
            "https://suki-chan.vercel.app"
        ],

        // Give this function access to the Resend API key.
        secrets: [RESEND_API_KEY],

        // Limit the number of instances for cost control.
        maxInstances: 5,
    },

    async (req, res) => {
        // Accept POST requests only.
        if (req.method !== "POST") {
            return res.status(405).json({
                success: false,
                message: "Method not allowed",
            });
        }

        try {
            // Extract the submitted form data.
            const { email, subject, message } = req.body || {};

            // Validate the required fields.
            if (
                typeof email !== "string" ||
                typeof subject !== "string" ||
                typeof message !== "string"
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide valid form information.",
                });
            }

            const visitorEmail = email.trim();
            const cleanSubject = subject.trim().replace(/[\r\n]+/g, " ");
            const cleanMessage = message.trim();

            // Check for empty or invalid information.
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailRegex.test(visitorEmail) ||
                visitorEmail.length > 254 ||
                cleanSubject.length === 0 ||
                cleanSubject.length > 150 ||
                cleanMessage.length === 0 ||
                cleanMessage.length > 5000
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Please check your submitted information.",
                });
            }

            // Initialize Resend using the securely stored API key.
            const resend = new Resend(RESEND_API_KEY.value());

            // Send the email.
            const { data, error } = await resend.emails.send({
                from: "Portfolio Contact <onboarding@resend.dev>",

                // Replace with the email associated with your Resend account.
                to: ["delllatitude118@gmail.com"],

                replyTo: visitorEmail,

                subject: `Portfolio Contact: ${cleanSubject}`,

                text: `
You have received a new message from your portfolio.

Visitor Email: ${visitorEmail}

Subject: ${cleanSubject}

Message:
${cleanMessage}
        `,
            });

            // Handle Resend errors.
            if (error) {
                logger.error("Resend email error:", error);

                return res.status(502).json({
                    success: false,
                    message: "Unable to send your message. Please try again later.",
                });
            }

            logger.info("Contact email sent successfully:", data.id);

            return res.status(200).json({
                success: true,
                message: "Your message has been sent successfully!",
            });

        } catch (error) {
            logger.error("Contact form function error:", error);

            return res.status(500).json({
                success: false,
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
);

