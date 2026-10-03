import { getStore } from "@netlify/blobs";

export default async (request) => {
  try {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Método no permitido" }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const formData = await request.formData();

    const nombre = String(formData.get("nombre") || "").trim();
    const especie = String(formData.get("especie") || "").trim();
    const raza = String(formData.get("raza") || "").trim();
    const edad = String(formData.get("edad") || "").trim();
    const color = String(formData.get("color") || "").trim();
    const dueno = String(formData.get("dueno") || "").trim();
    const telefono = String(formData.get("telefono") || "").trim();
    const ciudad = String(formData.get("ciudad") || "").trim();

    if (!nombre || !dueno || !telefono || !ciudad) {
      return new Response(
        JSON.stringify({
          error: "Completa los campos obligatorios."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const id = crypto.randomUUID();

    const mascota = {
      id,
      nombre,
      especie,
      raza,
      edad,
      color,
      dueno,
      telefono,
      ciudad,
      fecha: new Date().toISOString()
    };

    const petsStore = getStore("canqr-pets");

    await petsStore.setJSON(id, mascota);

    const foto = formData.get("foto");

    if (foto && typeof foto === "object" && foto.size > 0) {
      if (!foto.type.startsWith("image/")) {
        return new Response(
          JSON.stringify({
            error: "La foto debe ser una imagen."
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      if (foto.size > 2 * 1024 * 1024) {
        return new Response(
          JSON.stringify({
            error: "La foto no puede superar los 2 MB."
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      const photoStore = getStore("canqr-photos");

      const buffer = await foto.arrayBuffer();

      await photoStore.set(id, new Uint8Array(buffer), {
        metadata: {
          contentType: foto.type
        }
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        identificacion: id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "No se pudo crear la mascota.",
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
