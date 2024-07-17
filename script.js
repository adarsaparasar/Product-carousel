document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            data.categories.forEach(category => {
                category.category_products.forEach(product => {
                    const item = document.createElement('div');
                    item.className = 'carousel-item';
                    item.setAttribute('data-category', category.category_name.toLowerCase());

                    const card = document.createElement('div');
                    card.className = 'card';

                    if (product.badge_text) {
                        const label = document.createElement('div');
                        label.className = 'label';
                        label.textContent = product.badge_text;
                        card.appendChild(label);
                    }

                    const img = document.createElement('img');
                    img.src = product.image;
                    img.alt = product.title;
                    card.appendChild(img);

                    const name = document.createElement('h3');
                    if (product.title.length > 11) {
                        name.textContent = product.title.substring(0,10) +"..";
                    }
                    else {
                        name.textContent = product.title;
                    }
                    
                    card.appendChild(name);
                    name.style.fontFamily = "Khula, sans-serif";
                    name.style.fontWeight = "600px";
                    name.style.fontSize = '15px';
                    name.classList.add('card-flex-ele');
                    const brand = document.createElement('p');
                    brand.innerHTML = `<span class='card-flex-ele'>&#x2022; ${product.vendor}</span> `;

                    
                    
                    card.appendChild(brand);
                    brand.style.fontFamily = "Khula, sans-serif";
                    brand.style.fontWeight = "400px";
                    brand.style.marginTop = '0px';
                    brand.classList.add('card-flex-ele');
                    const price = document.createElement('p');
                    price.style.fontFamily = 'khula';
                    price.style.fontWeight = "600px";
                    price.innerHTML = `<strong>Rs ${product.price}</strong> <span class="old-price class-grid-ele" style="font-family: Khula;font-weight:600px;margin: 0px;">Rs ${product.compare_at_price}</span> <pre class="discount card-grid-ele" style="font-family: Khula;font-weight:600px;margin:0px;">${calculateDiscount(product.price, product.compare_at_price)}% Off</pre>`;
                    card.appendChild(price);
                    

                    const cartBtn = document.createElement('button');
                    cartBtn.className = 'cart-btn';
                    cartBtn.textContent = 'Add to Cart';
                    cartBtn.style.marginTop = '5px'
                    card.appendChild(cartBtn);
                    


                    item.appendChild(card);
                    carousel.appendChild(item);
                });
            });

            showCategory('women');
        })
        .catch(error => console.error('Error fetching the product data:', error));
});

function showCategory(category) {
    const items = document.querySelectorAll('.carousel-item');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    items.forEach(item => {
        if (item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    document.querySelector(`.tab-btn[onclick="showCategory('${category}')"]`).classList.add('active');
}

// Calculate the discount percentage
function calculateDiscount(price, compareAtPrice) {
    return (((compareAtPrice - price) / compareAtPrice) * 100).toFixed(2);
}