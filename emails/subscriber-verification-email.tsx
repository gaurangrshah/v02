import * as React from 'react';

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface subscriberEmailProps {
  name?: string;
  tokenCallback: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export default function SubscriberVerificationEmail({
  name,
  tokenCallback,
}: subscriberEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>G Shah Dev - Welcome to the </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://www.gshahdev.com/logo.png`}
            width="40"
            height="33"
            alt="GShah Dev logo"
          />
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              You recently signed up to the G.Shah Dev mailing list. If this was you, you can click here to verify your email address and complete the subscription process:
            </Text>
            <Button style={button} href={tokenCallback}>
              Verify Email
            </Button>
            <Text style={textsm}>
              If you don&apos;t want to subscribe or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              For security reasons, we ask that you don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href="#">
                more security information.
              </Link>
            </Text>
            <Text style={text}>Thank you! We&apos;ll be in touch shortly</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

SubscriberVerificationEmail.PreviewProps = {
  name: "Subscriber Name",
  tokenCallback: "https://www.gshahdev.com/verify?token=123&email=user%40gshahdev.com",
} as subscriberEmailProps;



const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
const textsm = {
  fontSize: "13px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#E3FADB",
  borderRadius: "4px",
  color: "#444",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
  dropShadow: "0 2px 0 rgba(0,0,0,0.2)",
};

const anchor = {
  textDecoration: "underline",
};
