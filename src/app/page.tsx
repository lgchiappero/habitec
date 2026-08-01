import Navbar from "@/components/home/Navbar";
import ExitIntentPopup from "@/components/home/ExitIntentPopup";
import Hero from "@/components/home/Hero";
import DolorConvencional from "@/components/home/DolorConvencional";
import NuevaCategoria from "@/components/home/NuevaCategoria";
import ModelosHome from "@/components/home/ModelosHome";
import Preventa from "@/components/home/Preventa";
import DossierForm from "@/components/home/DossierForm";
import ComoFunciona from "@/components/home/ComoFunciona";
import PruebaSocial from "@/components/home/PruebaSocial";
import FAQ from "@/components/home/FAQ";
import ContactoForm from "@/components/home/ContactoForm";
import ConfiguradorRegional from "@/components/configurador/ConfiguradorRegional";
import Footer from "@/components/home/Footer";
import { client } from "@/sanity/lib/client";
import { SITE_CONFIG_QUERY, HOME_PAGE_QUERY, FLEX_CARD_QUERY, FAQ_PAGE_QUERY } from "@/sanity/lib/queries";
import type { FaqCategory } from "@/data/faq";

async function getPageData() {
  try {
    const [config, homePage, flex, faqPage] = await Promise.all([
      client.fetch<{ whatsappNumber?: string | null }>(SITE_CONFIG_QUERY),
      client.fetch(HOME_PAGE_QUERY),
      client.fetch(FLEX_CARD_QUERY),
      client.fetch<{ categorias?: FaqCategory[] } | null>(FAQ_PAGE_QUERY),
    ]);
    return {
      waNumber: config?.whatsappNumber ?? null,
      homePage: homePage ?? null,
      flex: flex ?? null,
      faqCategorias: faqPage?.categorias ?? null,
    };
  } catch {
    return { waNumber: null, homePage: null, flex: null, faqCategorias: null };
  }
}

export default async function HomePage() {
  const { waNumber, homePage, flex, faqCategorias } = await getPageData();

  return (
    <>
      <Navbar />
      <ConfiguradorRegional waNumber={waNumber} />
      <main>
        <Hero waNumber={waNumber} content={homePage?.hero} />
        <ModelosHome content={homePage?.modelosHome} flex={flex} />
        <DolorConvencional content={homePage?.dolorConvencional} />
        <NuevaCategoria content={homePage?.nuevaCategoria} />
        <Preventa content={homePage?.preventa} />
        <DossierForm waNumber={waNumber} content={homePage?.dossier} />
        <ComoFunciona content={homePage?.comoFunciona} />
        <PruebaSocial content={homePage?.pruebaSocial} />
        <FAQ categorias={faqCategorias} />
        <ContactoForm waNumber={waNumber} content={homePage?.formularioContacto} />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
