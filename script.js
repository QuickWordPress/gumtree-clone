// Globals
const listings = JSON.parse(localStorage.getItem('listings')) || [];

// Populate Homepage Listings
const displayListings = (filter = 'all', search = '') => {
    const grid = document.getElementById('listings-grid');
    grid.innerHTML = '';
    const filteredListings = listings.filter(
        (item) =>
            (filter === 'all' || item.category === filter) &&
            item.title.toLowerCase().includes(search.toLowerCase())
    );
    filteredListings.forEach((item, index) => {
        grid.innerHTML += `
            <div class="card">
                <img src="${item.image}" alt="${item.title}" />
                <h2>${item.title}</h2>
                <p>$${item.price}</p>
                <a href="item-details.html?id=${index}">View Details</a>
            </div>
        `;
    });
};

// Add New Listing
const form = document.getElementById('listing-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newItem = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            category: document.getElementById('category').value,
            image: document.getElementById('image').value,
        };
        listings.push(newItem);
        localStorage.setItem('listings', JSON.stringify(listings));
        window.location.href = 'index.html';
    });
}

// Search Bar
const searchBar = document.getElementById('search-bar');
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        displayListings('all', e.target.value);
    });
}

// Category Filter
document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
        displayListings(button.dataset.category);
    });
});

// Item Details
const details = document.getElementById('item-details');
if (details) {
    const urlParams = new URLSearchParams(window.location.search);
    const item = listings[urlParams.get('id')];
    details.innerHTML = `
        <img src="${item.image}" alt="${item.title}" />
        <h1>${item.title}</h1>
        <p>${item.description}</p>
        <h3>Price: $${item.price}</h3>
    `;
}

// Initial Load
if (document.getElementById('listings-grid')) displayListings();
