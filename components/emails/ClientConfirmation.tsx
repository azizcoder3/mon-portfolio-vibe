import * as React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Button,
  Link,
} from "@react-email/components";

interface ClientConfirmationProps {
  clientName: string;
  baseUrl: string;
}

export const ClientConfirmationEmail = ({
  clientName = "Client",
  baseUrl,
}: ClientConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>J&apos;ai bien reçu votre message ! 🚀</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header avec Logo/Nom */}
          <Section style={header}>
            <Text style={logo}>
              Dev<span style={{ color: "#60A5FA" }}>AI</span>
            </Text>
          </Section>

          {/* Contenu Principal */}
          <Section style={content}>
            <Heading style={h1}>Bonjour {clientName}, 👋</Heading>
            <Text style={text}>
              Merci de m&apos;avoir contacté. J&apos;ai bien reçu votre message
              et je vous en remercie.
            </Text>
            <Text style={text}>
              Je suis actuellement en train d&apos;étudier votre demande. Étant
              très attaché à la qualité et à la réactivité, je m&apos;engage à
              vous répondre sous <strong>24 heures</strong>.
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              En attendant, n&apos;hésitez pas à jeter un coup d&apos;œil à mes
              dernières réalisations.
            </Text>

            <Section style={btnContainer}>
              {/* Remplace l'URL par la vraie URL de ton site Vercel */}
              <Button style={button} href={`${baseUrl}/projects`}>
                Voir mon Portfolio
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 Aziz Coder3.0 - Brazzaville, Congo
              <br />
              Développeur Web & Expert IA
            </Text>
            <Link href={baseUrl} style={footerLink}>
              Visiter le site web
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ClientConfirmationEmail;

// --- STYLES CSS ---
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0 0 48px",
  marginBottom: "64px",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  maxWidth: "600px",
  overflow: "hidden" as const,
};

const header = {
  padding: "30px 48px",
  textAlign: "center" as const,
  backgroundColor: "#0F172A", // Bleu nuit du site
};

const logo = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0",
};

const content = {
  padding: "0 48px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "left" as const,
  margin: "30px 0",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const paragraph = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "20px",
};

const button = {
  backgroundColor: "#60A5FA", // Bleu clair du site
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
};

const footer = {
  padding: "0 48px",
  marginTop: "30px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#8898aa",
  fontSize: "12px",
};

const footerLink = {
  color: "#60A5FA",
  fontSize: "12px",
  textDecoration: "underline",
};
