const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let isInitialLoad = true;
const initialCount = 5;
const apiKey = "JcFtV99Nzuyz1g69mSdbgPsZJwTbWaQLD5x7LxCMaB4";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateApiUrlNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// //helper function
// function setAttributes(){

// }

// Display photos function
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //   create <a> to link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //   create <img> for photos
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    function setAttributes(elem, attr) {
      // Elem is the element u want to add attribute to eg. img
      // attr is an object of the attribute name and it's value eg. {href: photo.links.html}

      for (const key in attr) {
        elem.setAttribute(key, attr[key]);
      }
    }

    const attrObj = {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    };

    setAttributes(img, attrObj);

    // put <img> inside <a>, then put <a> in the image container element
    item.appendChild(img);
    imageContainer.appendChild(item);

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
  });
}

// get photos from unsplash Api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
  if (isInitialLoad) {
    updateApiUrlNewCount(30);
    isInitialLoad = false;
  }
}

// Check if scrolling is near the bottom page and load more
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
