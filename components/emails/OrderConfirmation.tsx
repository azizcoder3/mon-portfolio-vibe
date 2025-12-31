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
  Column,
  Row,
} from "@react-email/components";

interface OrderConfirmationProps {
  clientName: string;
  serviceTitle: string;
  totalPrice: string; // Formatté (ex: "150 000 FCFA")
  deadline: string;
  options: string[];
  baseUrl?: string;
}

export const OrderConfirmationEmail = ({
  clientName = "Client",
  serviceTitle = "Service Web",
  totalPrice = "0 FCFA",
  deadline = "Non spécifié",
  options = [],
  baseUrl = "https://mon-portfolio-vibe.vercel.app",
}: OrderConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre commande : {serviceTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>
              Aziz Coder<span style={{ color: "#60A5FA" }}>3.0</span>
            </Text>
          </Section>

          {/* Message Principal */}
          <Section style={content}>
            <Heading style={h1}>Commande Reçue ! 🎉</Heading>
            <Text style={text}>
              Bonjour <strong>{clientName}</strong>,
            </Text>
            <Text style={text}>
              Merci pour votre confiance. J&apos;ai bien reçu votre demande de
              commande pour le service <strong>{serviceTitle}</strong>.
            </Text>
            <Text style={text}>
              Ceci est une confirmation automatique. Je vais maintenant analyser
              votre demande et vous envoyer une{" "}
              <strong>facture proforma</strong> ainsi qu&apos;un contrat sous 24
              heures.
            </Text>

            <Hr style={hr} />

            {/* Récapitulatif */}
            <Heading style={h2}>Récapitulatif de la demande</Heading>

            <Section style={summaryBox}>
              <Row>
                <Column>
                  <Text style={label}>Service :</Text>
                </Column>
                <Column align="right">
                  <Text style={value}>{serviceTitle}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={label}>Délai estimé :</Text>
                </Column>
                <Column align="right">
                  <Text style={value}>{deadline}</Text>
                </Column>
              </Row>
              <Hr style={hrSmall} />
              {options.length > 0 && (
                <>
                  <Text style={label}>Options choisies :</Text>
                  <ul style={ul}>
                    {options.map((opt, i) => (
                      <li key={i} style={li}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <Hr style={hrSmall} />
                </>
              )}
              <Row>
                <Column>
                  <Text style={totalLabel}>Total Estimé :</Text>
                </Column>
                <Column align="right">
                  <Text style={totalValue}>{totalPrice}</Text>
                </Column>
              </Row>
            </Section>

            <Section style={btnContainer}>
              <Button style={button} href={`${baseUrl}/projects`}>
                Voir d&apos;autres réalisations
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 Aziz Coder3.0 - Brazzaville, Congo
              <br />
              Ceci n&apos;est pas une facture. Le paiement se fera après
              validation.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

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
const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 0 10px",
};
const text = { color: "#525f7f", fontSize: "16px", lineHeight: "24px" };
const hr = { borderColor: "#e6ebf1", margin: "20px 0" };
const summaryBox = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};
const label = { color: "#6b7280", fontSize: "14px", margin: "4px 0" };
const value = {
  color: "#111827",
  fontSize: "14px",
  fontWeight: "500",
  margin: "4px 0",
};
const totalLabel = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "4px 0",
};
const totalValue = {
  color: "#60A5FA",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "4px 0",
};
const hrSmall = { borderColor: "#e5e7eb", margin: "10px 0" };
const ul = { paddingLeft: "20px", margin: "10px 0" };
const li = { color: "#4b5563", fontSize: "14px", marginBottom: "4px" };
const btnContainer = { textAlign: "center" as const, marginTop: "30px" };
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
