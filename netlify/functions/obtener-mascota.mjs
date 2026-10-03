import { getStore } from "@netlify/blobs";

export default async (request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Falta el id de la mascota." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const store = getStore("canqr-pets");
    const mascota = await store.get(id, { type: "json" });

    if (!mascota) {
      return new Response(
        JSON.stringify({ error: "Mascota no encontrada." }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      JSON.stringify(mascota),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error al obtener la mascota.",
        detalle: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
