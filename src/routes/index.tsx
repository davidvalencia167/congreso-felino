import { About } from '#/components/About/About'
import { FAQ } from '#/components/FAQ/FAQ'
import { Footer } from '#/components/Footer/Footer'
import { Hero } from '#/components/Hero/Hero'
import { Navbar } from '#/components/Navbar/Navbar'
import { NearbyPlaces } from '#/components/NearbyPlaces/NearbyPlaces'
import { Princing } from '#/components/Pricing/Pricing'
import { Program } from '#/components/Program/Program'
import { Speakers } from '#/components/Speakers/Speakers'
import { Sponsors } from '#/components/Sponsors/Sponsors'
import { Venue } from '#/components/Venue/Venue'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    head: () => ({
      meta: [
        {title: "IVEC 2027 - Congreso Veterinario Felino"},
        {
            name: "description",
            content: 
            "Dos dias dedicados a la medicina felina en Barquisimeto. Ponentes de Latinoamérica, talleres y certificación IVEC. 25-26 de febrero de 2027",
        },
        {property: "og:title", content: "IVEC 2027 - Congreso Veterinario Felino"},
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
          <Speakers/>
          <Program/>
          <Princing/>
          <Venue/>
          <NearbyPlaces/>
          <Sponsors/>
          <FAQ/>
        </main>
        <Footer/>
    </div>
  )
}
