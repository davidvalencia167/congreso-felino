import { About } from '#/components/About/About'
import { Hero } from '#/components/Hero/Hero'
import { Navbar } from '#/components/Navbar/Navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    head: () => ({
      meta: [
        {title: "IVEC 2027 - Congreso de Felinos Barquisimeto"},
        {
            name: "description",
            content: 
            "Dos dias dedicados a la medicina felina en Barquisimeto. Ponentes de Latinoamérica, talleres y certificación IVEC. 25-26 de febrero de 2027",
        },
        {property: "og:title", content: "IVEC 2027 - Congreso de Felinos"},
        {
          property: "og:description",
          content: 
          "El congreso felino más importante de Venezuela. 25-26 feb, Barquisimeto",
        },
      ],
    }),
    component: Index
})

function Index() {
  return (
    <div className='min-h-screen bg-background'>
        <Navbar/>
        <main>
          <Hero/>
          <About/>
        </main>
    </div>
  )
}
