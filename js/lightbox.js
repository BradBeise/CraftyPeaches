// Lightbox functionality
let currentImageIndex = 0;
let galleryImages = [];

// Open the lightbox
function openLightbox(imageId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Get all gallery items
    galleryImages = Array.from(document.querySelectorAll('.gallery-item'));
    
    // Find the index of the clicked image
    currentImageIndex = galleryImages.findIndex(item => item.dataset.id === imageId);
    
    // Set the image source
    const imgSrc = galleryImages[currentImageIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
    
    // Show the lightbox
    lightbox.style.display = 'block';
    
    // Disable scrolling on the body
    document.body.style.overflow = 'hidden';
}

// Close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Re-enable scrolling on the body
    document.body.style.overflow = 'auto';
}

// Navigate to the next image
function nextImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const imgSrc = galleryImages[currentImageIndex].querySelector('img').src;
    document.getElementById('lightbox-img').src = imgSrc;
}

// Navigate to the previous image
function prevImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const imgSrc = galleryImages[currentImageIndex].querySelector('img').src;
    document.getElementById('lightbox-img').src = imgSrc;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close button
    const closeBtn = document.querySelector('.lightbox .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Next button
    const nextBtn = document.querySelector('.lightbox .next');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }
    
    // Previous button
    const prevBtn = document.querySelector('.lightbox .prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevImage);
    }
    
    // Close on click outside the image
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!document.getElementById('lightbox').style.display || 
            document.getElementById('lightbox').style.display === 'none') return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
});