# CreatorsMeet

CreatorsMeet is a platform that connects people with creative ideas to developers with technical skills. This project aims to foster collaboration between creative thinkers and skilled developers, helping bring innovative ideas to life.

## Features

- **Modern UI with Green Theme**: A clean, responsive user interface with a green color scheme.
- **Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Multiple Pages**: Home, About, Developers, and Contact pages.
- **Developer Profiles**: Browse through developer profiles with skill matching.
- **Contact Form**: A functional contact form for user inquiries.

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: For type-safe JavaScript code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Hooks**: For state management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/creatorsmeet.git
cd creatorsmeet
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to Vercel

This project is optimized for deployment on Vercel, which is the recommended hosting platform.

### Automatic Deployment

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Visit [Vercel](https://vercel.com) and sign up or log in.
3. Click "Import Project" and select "Import Git Repository."
4. Select your repository and configure as needed.
5. Click "Deploy" and Vercel will automatically build and deploy your application.

### Manual Deployment

You can also deploy directly from your local machine:

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Run the deployment command:
```bash
vercel
```

3. Follow the prompts to set up and deploy your project.

## Project Structure

- `/components`: Reusable UI components
- `/pages`: Next.js pages for each route
- `/public`: Static assets like images
- `/styles`: Global CSS files

## Customization

- Update the color theme in `tailwind.config.js` to match your brand.
- Replace placeholder content in pages with your own content.
- Add actual developer profiles and functionality as needed.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [Heroicons](https://heroicons.com/) 