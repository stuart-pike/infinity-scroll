const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiURL = `https://picsum.photos/v2/list?page=1&limit=${count}/info`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  //   console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    // loader get hidden once the first set of images have loaded
    loader.hidden = true;
    // console.log("ready:", ready);
  }
}

// Helper Function to Set Attributes on Dom Elements (DRY: don't repeat yourself)
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //   console.log("total images:", totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.url,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.download_url,
      // alt: photo.alt_description,
      title: photo.author,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of page, Load more photos
// window.addEventListener("scroll", () => {
//   if (
//     window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
//     ready
//   ) {
//     ready = false;
//     getPhotos();
//   }
// });

// Function to check if scroll is near the bottom
function isScrollNearBottom() {
  const windowHeight = window.innerHeight; // Height of the browser window
  const documentHeight = document.documentElement.scrollHeight; // Total height of the document
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Scroll position from the top

  // Check if the user is near the bottom (within a certain threshold)
  return documentHeight - (windowHeight + scrollTop) < 200; // Change '200' to your desired threshold
}

// Event listener for the scroll event
window.addEventListener("scroll", () => {
  if (isScrollNearBottom() && ready) {
    // Execute your code when the scroll is near the bottom
    // console.log("Scroll is near the bottom!");
    // Add your logic here, like loading more content or performing an action
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
