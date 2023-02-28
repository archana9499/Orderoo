import  sanityClient  from "@sanity/client";
import  ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId:"pbrugc89",
    dataset:"production",
    apiVersion:"2022-03-10",
    useCdn:true
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)

export default client;