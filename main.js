import './style.css'
import { products } from './products.js'

// --- Elements ---
// --- Elements ---
const modal = document.getElementById('product-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalPanel = document.getElementById('modal-panel');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCategory = document.getElementById('modal-category');
const modalItemsContainer = document.getElementById('modal-items');
const closeButtons = [document.getElementById('close-modal'), document.getElementById('close-modal-btn')];

// --- Mobile Menu Elements ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// --- Whatsapp Config ---
const PHONE_NUMBER = "56937817639"; // Toque de Amor real number

// --- Modal Functions ---
function openModal(categoryKey) {
  const categoryData = products[categoryKey];
  if (!categoryData) return;

  // Populate Content
  modalCategory.textContent = "Catálogo 2025";
  modalTitle.textContent = categoryData.title;
  modalDescription.textContent = categoryData.description;

  // Render Items
  modalItemsContainer.innerHTML = categoryData.items.map(item => `
    <div class="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group hover:bg-white/50 p-2 rounded-lg transition-colors">
      <div>
        <h4 class="text-lg font-medium text-chocolate group-hover:text-caramel transition-colors">${item.name}</h4>
        <p class="text-sm text-stone-500">${item.description}</p>
      </div>
      <div class="text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end mt-2 sm:mt-0">
        <span class="text-sm font-semibold text-chocolate block mb-1">${item.price}</span>
        <a href="https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(`Hola Tamy, me gustaría pedir la ${item.name}.`)}" 
           target="_blank"
           class="inline-flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors">
          Pedir <i class="ph-fill ph-whatsapp-logo"></i>
        </a>
      </div>
    </div>
  `).join('');

  // Show Modal
  modal.classList.remove('hidden');

  // Animation: Fade In
  // We use a small timeout to allow the browser to process the removal of 'hidden' first
  setTimeout(() => {
    modalBackdrop.classList.remove('opacity-0');
    modalPanel.classList.remove('opacity-0', 'translate-y-4', 'scale-95');
  }, 10);
}

function closeModal() {
  // Animation: Fade Out
  modalBackdrop.classList.add('opacity-0');
  modalPanel.classList.add('opacity-0', 'translate-y-4', 'scale-95');

  // Hide after animation matches transition duration (300ms)
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}

// --- Event Listeners ---

// 1. Grid Items Click
document.querySelectorAll('[data-category]').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    console.log("Opening category:", category); // Debug
    if (category) openModal(category);
  });
});

// 2. Close Modal
closeButtons.forEach(btn => {
  if (btn) btn.addEventListener('click', closeModal)
});

if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

// 3. Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// 4. Mobile Menu Toggle
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Optional: Toggle icon between list and x
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('ph-x');
      icon.classList.add('ph-list');
    } else {
      icon.classList.remove('ph-list');
      icon.classList.add('ph-x');
    }
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
      }
    });
  });
}
