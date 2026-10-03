import { getStore } from "@netlify/blobs";

export default async (request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("Falta el id de la mascota.", {
        status: 400
      });
    }

    const store = getStore("canqr-photos");

    const foto = await store.get(id, {
      type: "arrayBuffer"
    });

    if (!foto) {
      return new Response("Foto no encontrada.", {
        status: 404
      });
    }

    return new Response(foto, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600"
      }
    });

  } catch (error) {
    return new Response("Error al obtener la foto.", {
      status: 500
    });
  }
};
