import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId:'z2ziw1kn',
    dataset:'production',
    apiVersion:'2023-12-05',
    useCdn: true,
    token:'sk04MhYBZfu5MUHuc8Kg2eZFslLfzG8nqHrwsYJlFUENGpUcSMmdezeRdzWj4rphH6zawHijimuZCPAhsSCc5vzW9UdH6ZhWg7TrpKALmKemZO82L3L0JGJpYALEhGRRZIwCYeaD65yPMTHoGfzffa3fJJ5P0TeLGIk4GlFaCoFDy0qmBC3D'
});

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)