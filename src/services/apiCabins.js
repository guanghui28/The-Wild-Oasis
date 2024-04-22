import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabin could not be loaded");
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
    //https://nscquxpozufcweswzuob.supabase.co/storage/v1/object/public/cabin_images/cabin-001.jpg
    // 1.CREATE/edit cabin

    let query = supabase.from("cabins");
    // A.CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B.EDIT
    if (id) {
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // 2.upload image

    if (hasImagePath) return data;

    const { _, error: storageError } = await supabase.storage
        .from("cabin_images")
        .upload(imageName, newCabin.image);

    // 3. Delete cain if it has error
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(error);
        throw new Error("Cabin images could not be uploaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
    return null;
}
