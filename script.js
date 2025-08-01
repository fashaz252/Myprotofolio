// Reveal on Scroll
const faders = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) el.classList.add('show');
  });
});

// Lightbox + Slideshow
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');
const counter = document.querySelector('.lightbox-counter');
const galleryLinks = document.querySelectorAll('.gallery a');
let currentIndex = 0;
let slideshowInterval;

function showLightbox(index) {
  currentIndex = index;
  const imgSrc = galleryLinks[index].getAttribute('href');
  lightboxImg.classList.remove('show');
  setTimeout(() => {
    lightboxImg.src = imgSrc;
    counter.textContent = `${index+1} / ${galleryLinks.length}`;
    lightboxImg.classList.add('show');
  }, 200);
  lightbox.style.display = 'flex';
  startSlideshow();
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryLinks.length;
  showLightbox(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
  showLightbox(currentIndex);
}

galleryLinks.forEach((link,i) => {
  link.addEventListener('click', e => {
    e.preventDefault(); showLightbox(i);
  });
});

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
closeBtn.addEventListener('click', () => { lightbox.style.display='none'; stopSlideshow(); });

document.addEventListener('keydown', e => {
  if(lightbox.style.display==='none') return;
  if(e.key==='Escape') { lightbox.style.display='none'; stopSlideshow(); }
  if(e.key==='ArrowRight') showNext();
  if(e.key==='ArrowLeft') showPrev();
});

// Auto Slideshow
function startSlideshow(){ stopSlideshow(); slideshowInterval=setInterval(showNext,4000);}
function stopSlideshow(){ clearInterval(slideshowInterval);}
lightbox.addEventListener('mouseenter', stopSlideshow);
lightbox.addEventListener('mouseleave', startSlideshow);
