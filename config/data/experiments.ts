import { z } from 'zod';

const experimentSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  link: z.string().nullable(),
  technologies: z.array(z.string()),
  stars: z.number().optional().nullable(),
});

type Experiment = z.infer<typeof experimentSchema>;

export const EXPERIMENTS: Experiment[] = [
  {
    title: 'Plura: Design Agency CRM & Hosting PAAS',
    description:
      'A freelance project management Saas platform for design and marketing agencies. Features a custom CMS, CRM, and hosting services.',
    image:
      'https://camo.githubusercontent.com/289ba48b3b93dacd92c289d05cfe3ef0238934f99a90680fb1f81ad60a757bfd/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d7367736e64722f307774535865786c50684d4e313934356f6f78572f6d656469612f3635623763336432343636303437376461663364363730382e706e67',
    link: 'https://pluranu.vercel.app/agency/sign-in',
    technologies: [
      'Next.js',
      'TailwindCSS',
      'Prisma',
      'PlanetScale',
      'PlanetScale',
      'Vercel',
      'Stripe',
      'Zod',
      'Typescript',
    ],
    stars: null,
  },
  {
    title: 'Swatchr: Color Palette Generator',
    description:
      'A proof of concept (currently under "alpha" preview), inspired by Coolors.co. This project focuses on accessibility, and future integrations with design tools like Figma are on the roadmap',
    image: '/swatchr.gif',
    link: 'https://swatchr.app',
    technologies: [
      'Next.js',
      'Chakra-UI',
      'Framer Motion',
      'Supabase',
      'Tinycolor2',
      'Chroma.js',
      'zod',
      'Vercel',
    ],
    stars: null,
  },
  {
    title: 'FileDrive',
    description:
      'Quick simple and secure collaborative file-sharing environment for teams. Supports multiple image and document types and uses realtime storage via Convex.',
    image: '/file-drive.gif',
    link: 'https://file-drive-eight.vercel.app/',
    technologies: ['Next.js', 'Tailwind', 'Convex', 'Clerk', 'Svix', 'Vercel'],
  },
  {
    title: 'Miro Clone',
    description:
      'A working clone of the popular whiteboard app Miro. Demonstrating  modern real-time collaborative serverless application architecture.',
    image: '/mira.gif',
    link: 'https://mira-one-green.vercel.app/',
    technologies: [
      'Next.js',
      'TailwindCSS',
      'Convex',
      'Clerk',
      'Live-Kit',
      'Zustand',
      'Vercel',
    ],
  },
  {
    title: 'Discord Clone',
    description:
      'A working clone of the popular chat app Discord. Built with Next.JS, Tailwind, Clerk, Convex, UploadThing, and more.',
    image: '/disc-screenshot.png',
    link: null,
    technologies: [
      'Next.js',
      'TailwindCSS',
      'Prisma',
      'PlanetScale',
      'Live-Kit',
      'Heroku',
    ],
  },
  {
    title: 'Slicks Slices',
    description:
      'A pizzeria ordering platform built with Gatsby, Sanity, GraphQL, and serverless functions. Features a slick design and a custom CMS.',
    image: '/slicks.gif',
    link: 'https://affectionate-wright-0cbdf0.netlify.app',
    technologies: [
      'Gatsby.js',
      'Styled Components',
      'Sanity',
      'Cloudinary',
      'GraphQL',
      'Netlify',
    ],
  },
];
