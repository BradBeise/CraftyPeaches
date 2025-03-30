document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product page
    if (window.location.pathname.includes('product-page.html')) {
        loadProductPage();
    } else {
        // Home page preview images
        loadPreviewImages();
    }
});

// Function to load preview images on the home page
function loadPreviewImages() {
    const placeholders = document.querySelectorAll('.img-placeholder');
    
    placeholders.forEach(placeholder => {
        const folder = placeholder.dataset.folder;
        if (folder) {
            // For preview images on home page, we'll use the first image from each category
            // First, fetch the images.json file
            fetch('images.json')
                .then(response => response.json())
                .then(data => {
                    if (data[folder] && data[folder].length > 0) {
                        // Use the first image in the category as preview
                        placeholder.style.backgroundImage = `url('Images/${folder}/${data[folder][0]}')`;
                        placeholder.style.backgroundSize = 'cover';
                        placeholder.style.backgroundPosition = 'center';
                    } else {
                        // Fallback if no images are found
                        placeholder.style.backgroundColor = '#f5f5f5';
                        placeholder.innerHTML = `<p>View ${formatCategoryName(folder)}</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching images.json:', error);
                    placeholder.style.backgroundColor = '#f5f5f5';
                    placeholder.innerHTML = `<p>View ${formatCategoryName(folder)}</p>`;
                });
        }
    });
}

// Function to load product page
function loadProductPage() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const price = urlParams.get('price');
    
    if (category) {
        // Update page title
        const categoryTitle = document.getElementById('category-title');
        categoryTitle.textContent = formatCategoryName(category);
        
        // Update price
        const categoryPrice = document.getElementById('category-price');
        if (price) {
            categoryPrice.textContent = `$${price} each`;
        } else {
            categoryPrice.textContent = '';
        }
        
        // Update document title
        document.title = `${formatCategoryName(category)} - Crafty Peaches`;
        
        // Load images
        loadGalleryImages(category);
    }
}

// Function to load gallery images using the images.json file
function loadGalleryImages(category) {
    const gallery = document.getElementById('gallery');
    
    // Clear any existing content
    gallery.innerHTML = '<div class="loading-message">Loading images...</div>';
    
    // Fetch the images.json file
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            // Clear loading message
            gallery.innerHTML = '';
            
            if (data[category] && data[category].length > 0) {
                // Create a gallery item for each image in the category
                data[category].forEach((image, index) => {
                    createGalleryItem(gallery, `image-${index}`, `Images/${category}/${image}`);
                });
            } else {
                // No images found for this category
                const noImagesMsg = document.createElement('div');
                noImagesMsg.className = 'loading-message';
                noImagesMsg.innerHTML = `<p>No images found for ${formatCategoryName(category)}.</p>`;
                gallery.appendChild(noImagesMsg);
            }
        })
        .catch(error => {
            console.error('Error fetching images.json:', error);
            gallery.innerHTML = `<div class="loading-message">Error loading images: ${error.message}</div>`;
        });
}

// Function to create a gallery item
function createGalleryItem(gallery, id, imagePath) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.id = id;
    
    const img = document.createElement('img');
    img.className = 'gallery-img';
    img.src = imagePath;
    img.alt = 'Craft item';
    img.onerror = function() {
        // If image fails to load, use a placeholder
        this.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent('Image Not Found')}`;
    };
    
    item.appendChild(img);
    gallery.appendChild(item);
    
    // Add click event for lightbox (if you have a lightbox feature)
    item.addEventListener('click', function() {
        openLightbox(this.dataset.id, imagePath);
    });
}

// Format category name (convert CamelCase to "Camel Case")
function formatCategoryName(category) {
    // Insert a space before all caps and trim
    return category
        .replace(/([A-Z])/g, ' $1')
        .trim();
}

// Function for lightbox - implement if needed
function openLightbox(id, imagePath) {
    // If you have a lightbox feature, implement it here
    console.log(`Opening lightbox for image: ${id} at path: ${imagePath}`);
    
    // Example simple lightbox implementation:
    const lightbox = document.getElementById('lightbox') || createLightbox();
    const lightboxImage = document.getElementById('lightbox-image');
    
    lightboxImage.src = imagePath;
    lightbox.style.display = 'flex';
}

// Create a lightbox if it doesn't exist
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.style.display = 'none';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
    lightbox.style.zIndex = '1000';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.id = 'lightbox-image';
    lightboxImage.style.maxWidth = '90%';
    lightboxImage.style.maxHeight = '90%';
    lightboxImage.style.objectFit = 'contain';
    
    lightbox.appendChild(lightboxImage);
    
    // Close lightbox when clicking on it
    lightbox.addEventListener('click', function() {
        this.style.display = 'none';
    });
    
    document.body.appendChild(lightbox);
    return lightbox;
}