/**
 * Get a random int between and min and max bounds. Grabbed from MDN
 * @param min
 * @param max
 * @returns {*}
 */
export function getRandomInt( min, max ) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Get a set of images from the public directory
 * @returns {*[]}
 */
export function getImages() {
    return [
        {url: "images/photo_1.jpeg"},
        {url: "images/photo_2.jpeg"},
        {url: "images/photo_3.jpeg"},
        {url: "images/photo_4.jpeg"},
        {url: "images/photo_5.jpeg"},
        {url: "images/photo_6.jpeg"},
        {url: "images/photo_7.jpeg"},
        {url: "images/photo_8.jpeg"},
        {url: "images/photo_9.jpeg"},
        {url: "images/photo_10.jpeg"},
        {url: "images/photo_11.jpeg"},
        {url: "images/photo_12.jpeg"},
        {url: "images/photo_13.jpeg"},
        {url: "images/photo_14.jpeg"},
        {url: "images/photo_15.jpeg"},
        {url: "images/photo_16.jpeg"}
    ];
}
