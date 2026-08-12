import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import logoIvec from '../../public/logo-ivec.jpeg?url'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/jpeg',
        href: logoIvec,
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/jpeg',
        href: logoIvec,
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        
        <Scripts />
      </body>
    </html>
  )
}
