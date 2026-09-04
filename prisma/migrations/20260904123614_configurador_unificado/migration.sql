/*
  Warnings:

  - You are about to drop the column `aberturaCortinas` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `aberturaMosquitero` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `aberturaRejas` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `banoColorSanitarios` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `banoDucha` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `banoEspejo` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `banoInodoro` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `banoRevestimiento` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `calefon` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `cocinaAlacena` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `cocinaColorMuebles` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `cocinaExtractor` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `cocinaRevestimiento` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `cocinaTipo` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `cocinaVentana` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `energiaSolar` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `galeria` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `lavarropaIncluye` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `lavarropaUbicacion` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `mejoraParedes100` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `mejoraTechoSandwich` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `mejoraTripleVidrio` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `paredExteriorColor` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `paredExteriorRevestimiento` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `paredInteriorColor` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `paredInteriorRevestimiento` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `puertaInteriorColor` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `puertaInteriorTipo` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `puertaPrincipalColor` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `puertaPrincipalMaterial` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `puertaPrincipalTipo` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `ventanaTipo` on the `configuraciones_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `zonaClimatica` on the `configuraciones_pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "configuraciones_pedido" DROP COLUMN "aberturaCortinas",
DROP COLUMN "aberturaMosquitero",
DROP COLUMN "aberturaRejas",
DROP COLUMN "banoColorSanitarios",
DROP COLUMN "banoDucha",
DROP COLUMN "banoEspejo",
DROP COLUMN "banoInodoro",
DROP COLUMN "banoRevestimiento",
DROP COLUMN "calefon",
DROP COLUMN "cocinaAlacena",
DROP COLUMN "cocinaColorMuebles",
DROP COLUMN "cocinaExtractor",
DROP COLUMN "cocinaRevestimiento",
DROP COLUMN "cocinaTipo",
DROP COLUMN "cocinaVentana",
DROP COLUMN "energiaSolar",
DROP COLUMN "estado",
DROP COLUMN "galeria",
DROP COLUMN "lavarropaIncluye",
DROP COLUMN "lavarropaUbicacion",
DROP COLUMN "mejoraParedes100",
DROP COLUMN "mejoraTechoSandwich",
DROP COLUMN "mejoraTripleVidrio",
DROP COLUMN "paredExteriorColor",
DROP COLUMN "paredExteriorRevestimiento",
DROP COLUMN "paredInteriorColor",
DROP COLUMN "paredInteriorRevestimiento",
DROP COLUMN "puertaInteriorColor",
DROP COLUMN "puertaInteriorTipo",
DROP COLUMN "puertaPrincipalColor",
DROP COLUMN "puertaPrincipalMaterial",
DROP COLUMN "puertaPrincipalTipo",
DROP COLUMN "ventanaTipo",
DROP COLUMN "zonaClimatica",
ADD COLUMN     "finalidad" TEXT,
ADD COLUMN     "habitaciones" INTEGER,
ADD COLUMN     "incluyeBano" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "incluyeCocina" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lavarropas" TEXT,
ADD COLUMN     "localidad" TEXT,
ADD COLUMN     "materiales" JSONB,
ADD COLUMN     "nombreContacto" TEXT,
ADD COLUMN     "numeroConsulta" TEXT,
ADD COLUMN     "precioEstimado" DOUBLE PRECISION,
ADD COLUMN     "provincia" TEXT,
ADD COLUMN     "razonSocial" TEXT,
ADD COLUMN     "tipoAgua" TEXT,
ADD COLUMN     "tipoCliente" TEXT,
ADD COLUMN     "tipoCocina" TEXT,
ADD COLUMN     "upgrades" TEXT[] DEFAULT ARRAY[]::TEXT[];
