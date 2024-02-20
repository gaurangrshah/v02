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
  firstName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export default function SubscriberVerificationEmail({
  firstName,
}: subscriberEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>G Shah Dev - Welcome to the </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png` : `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`}
            width="40"
            height="33"
            alt="GShah Dev logo"
          />
          <Section>
            <Text style={text}>Hi {firstName},</Text>
            <Text style={text}>
              Someone recently signed up to the G.Shah Dev mailing list. If this was you, you can click here:
            </Text>
            <Button style={button} href={'https://gshahdev.com'}>
              Verify Email
            </Button>
            <Text style={text}>
              If you don&apos;t want to subscribe or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href="https://gshahdev.com/coming-soon">
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
  firstName: "Alan",
  // resetPasswordLink: "https://dropbox.com",
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
