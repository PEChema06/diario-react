

export const fileUpload = async(file) => {

    if(!file) throw new Error("No se encuentra ningún archivo");

    const fileURL = 'https://api.cloudinary.com/v1_1/db0ht2fws/upload';

    //Creamos el body de la peticion POST
    const formData = new FormData();
    
    formData.append('upload_preset','react-app');
    formData.append('file', file);


    try {

        const resp = await fetch(fileURL, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error("No se pudo subir imágen");
        
        const cloudResp = await resp.json();

        return cloudResp.secure_url;
        
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}