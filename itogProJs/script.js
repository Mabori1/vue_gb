window.addEventListener("DOMContentLoaded", () => {
  const productInput = document.querySelector(".product-input");
  const reviewInput = document.querySelector(".review-input");
  const addReviewButton = document.querySelector(".review-button");
  const productsList = document.querySelector(".products");
  const productReviews = document.querySelector(".product-reviews");

  console.log(addReviewButton);
  if (addReviewButton) {
    addReviewButton.addEventListener("click", () => {
      const productName = productInput.value.trim();
      const review = reviewInput.value.trim();

      console.log(productName, review);

      if (productName && review) {
        addReviewToStorage(productName, review);
        productInput.value = "";
        reviewInput.value = "";
      } else {
        alert("Пожалуйста, введите название продукта и отзыв.");
      }
    });
  }

  productsList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const productName = e.target.textContent;
      showReviews(productName);
    }
  });

  productReviews.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const reviewText = e.target.getAttribute("data-review");
      const productName = e.target.getAttribute("data-product");
      deleteReviewFromStorage(productName, reviewText);
      showReviews(productName);
    }
  });

  loadProducts();
});

function addReviewToStorage(product, review) {
  let products = JSON.parse(localStorage.getItem("products")) || {};
  if (!products[product]) {
    products[product] = [];
  }
  products[product].push(review);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

function deleteReviewFromStorage(product, review) {
  let products = JSON.parse(localStorage.getItem("products")) || {};
  if (products[product]) {
    products[product] = products[product].filter((r) => r !== review);
    localStorage.setItem("products", JSON.stringify(products));
  }
}

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || {};
  const productsList = document.querySelector(".products");
  productsList.innerHTML = "";

  for (const product in products) {
    const li = document.createElement("li");
    li.textContent = product;
    productsList.appendChild(li);
  }
}

function showReviews(product) {
  const products = JSON.parse(localStorage.getItem("products")) || {};
  const reviews = products[product] || [];

  const productReviews = document.querySelector(".product-reviews");
  productReviews.innerHTML = "";

  if (reviews.length === 0) {
    const noReviews = document.createElement("p");
    noReviews.textContent = "Пока нет отзывов для этого продукта.";
    productReviews.appendChild(noReviews);
  } else {
    reviews.forEach((review) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.textContent = review;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-product", product);
      deleteButton.setAttribute("data-review", review);
      reviewDiv.appendChild(deleteButton);
      productReviews.appendChild(reviewDiv);
    });
  }
}
