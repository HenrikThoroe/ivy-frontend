import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface Props {
  host: string
  dest: string
  mail: string
  support: string
}

export default function ConfirmationMail(props: Props) {
  const { host, dest, mail, support } = props

  return (
    <Html>
      <Head />
      <Preview>Please confirm your email for Ivy Chess Manager</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${host}/ivy-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Welcome!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Nice to have you on board! You only need to confirm your email address to get started.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-[20px] py-[12px] text-center text-[12px] font-semibold text-white no-underline"
                href={dest}
              >
                Confirm My Email
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser: <br />
              <Link href={dest} className="text-blue-600 no-underline">
                {dest}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This message was intended for '<span className="text-black">{mail}</span>'. This
              invite was sent from <Link href={host}>Ivy Chess Manager</Link>. If you were not
              expecting this invitation, you can ignore this email. If you are concerned about your
              privacy, you can get in touch with us at{' '}
              <Link href={`mailto:${support}`}>{support}</Link>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
