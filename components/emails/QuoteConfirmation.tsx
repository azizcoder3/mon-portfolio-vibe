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

interface QuoteConfirmationProps {
  clientName: string;
  baseUrl?: string;
}

export const QuoteConfirmationEmail = ({
  clientName = "Client",
  baseUrl = "https://mon-portfolio-vibe.vercel.app",
}: QuoteConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Votre demande de devis est bien reçue ! 📋</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>
              Aziz Coder<span style={{ color: "#60A5FA" }}>3.0</span>
            </Text>
          </Section>

          {/* Contenu */}
          <Section style={content}>
            <Heading style={h1}>Demande reçue !</Heading>
            <Text style={text}>
              Bonjour <strong>{clientName}</strong>,
            </Text>
            <Text style={text}>
              Merci de m&apos;avoir confié les détails de votre projet.
              J&apos;ai bien reçu votre demande de devis sur mesure.
            </Text>

            <Section style={infoBox}>
              <Text style={infoText}>
                <strong>Prochaine étape :</strong> Je vais analyser vos besoins,
                la complexité technique et le budget indiqué. Je reviendrai vers
                vous sous <strong>24 heures</strong> avec une estimation précise
                ou des questions complémentaires.
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              En attendant mon retour, vous pouvez consulter mes derniers
              projets pour voir ce que je peux réaliser pour vous.
            </Text>

            <Section style={btnContainer}>
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

export default QuoteConfirmationEmail;

// --- STYLES ---
const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0 0 48px",
  borderRadius: "10px",
  maxWidth: "600px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
};
const header = {
  padding: "20px 48px",
  backgroundColor: "#0F172A",
  textAlign: "center" as const,
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
};
const logo = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0",
};
const content = { padding: "0 48px" };
const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
};
const text = { color: "#525f7f", fontSize: "16px", lineHeight: "24px" };
const infoBox = {
  backgroundColor: "#e0f2fe",
  borderRadius: "8px",
  padding: "16px",
  margin: "20px 0",
};
const infoText = { color: "#0369a1", fontSize: "14px", margin: "0" };
const paragraph = { color: "#525f7f", fontSize: "14px", lineHeight: "24px" };
const hr = { borderColor: "#e6ebf1", margin: "20px 0" };
const btnContainer = { textAlign: "center" as const, marginTop: "20px" };
const button = {
  backgroundColor: "#60A5FA",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "12px 24px",
  display: "inline-block",
};
const footer = {
  padding: "0 48px",
  marginTop: "30px",
  textAlign: "center" as const,
};
const footerText = { color: "#8898aa", fontSize: "12px" };
const footerLink = {
  color: "#60A5FA",
  fontSize: "12px",
  textDecoration: "underline",
};
