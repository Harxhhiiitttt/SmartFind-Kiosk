document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, initializing...");
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".menu-btn");
  const switchMode = document.getElementById("switch-mode");
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const API_URL = "http://localhost:3000/api/products";

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hide");
  });

  switchMode.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Nav link clicked:", link.getAttribute("data-page"));
      navLinks.forEach((l) => l.parentElement.classList.remove("active"));
      link.parentElement.classList.add("active");

      const pageId = link.getAttribute("data-page");
      pages.forEach((page) => {
        page.style.display = page.id === pageId ? "block" : "none";
      });

      if (pageId === "store") {
        loadProducts();
      }

      localStorage.setItem("activeTab", pageId);
    });
  });

  async function loadProducts() {
    try {
      console.log("Loading products...");
      const response = await axios.get(API_URL);
      const products = response.data;
      console.log("Products loaded:", products);
      const tableBody = document.getElementById("product-table-body");
      tableBody.innerHTML = "";
      products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.name}</td>
          <td>₹${product.price.toFixed(2)}</td>
          <td>
            <input type="number" class="stock-input" data-id="${product.id}" value="${product.stock}" min="0" />
            <button class="update-stock-btn" data-id="${product.id}">Update</button>
          </td>
          <td>${product.aisle}</td>
          <td><button class="delete-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button></td>
        `;
        tableBody.appendChild(row);
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async (e) => {
          console.log("Delete button clicked for ID:", button.getAttribute("data-id"));
          const id = e.target.closest("button").getAttribute("data-id");
          await deleteProduct(id);
        });
      });

      document.querySelectorAll(".update-stock-btn").forEach((button) => {
        button.addEventListener("click", async (e) => {
          console.log("Update stock button clicked for ID:", button.getAttribute("data-id"));
          const id = e.target.getAttribute("data-id");
          const stockInput = document.querySelector(
            `.stock-input[data-id="${id}"]`
          );
          const stock = parseInt(stockInput.value);
          if (!isNaN(stock) && stock >= 0) {
            await updateStock(id, stock);
          } else {
            alert("Please enter a valid stock quantity.");
          }
        });
      });
    } catch (error) {
      console.error("Error loading products:", error.message, error.response ? error.response.data : error);
      alert("Failed to load products. Check console for details.");
    }
  }

  const addProductBtn = document.getElementById("add-product-btn");
  if (addProductBtn) {
    console.log("Add Product button found");
    addProductBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Add Product button clicked");
      const name = document.getElementById("product-name").value.trim();
      const price = parseFloat(document.getElementById("product-price").value);
      const stock = parseInt(document.getElementById("product-stock").value);
      const aisle = document.getElementById("product-aisle").value;

      if (name && !isNaN(price) && price > 0 && !isNaN(stock) && stock >= 0 && aisle) {
        try {
          console.log("Sending POST request:", { name, price, stock, aisle });
          await axios.post(API_URL, { name, price, stock, aisle });
          document.getElementById("product-name").value = "";
          document.getElementById("product-price").value = "";
          document.getElementById("product-stock").value = "";
          document.getElementById("product-aisle").value = "";
          loadProducts();
        } catch (error) {
          console.error("Error adding product:", error.message, error.response ? error.response.data : error);
          alert("Failed to add product. Check console for details.");
        }
      } else {
        alert("Please fill in all fields with valid values.");
      }
    });
  } else {
    console.error("Add Product button not found");
  }

  const addProductForm = document.querySelector(".add-product form.form-input");
  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form submission prevented");
    });
  }

  async function updateStock(id, stock) {
    try {
      console.log("Updating stock for ID:", id, "Stock:", stock);
      await axios.put(`${API_URL}/${id}`, { stock });
      loadProducts();
    } catch (error) {
      console.error("Error updating stock:", error.message, error.response ? error.response.data : error);
      alert("Failed to update stock. Check console for details.");
    }
  }

  async function deleteProduct(id) {
    try {
      console.log("Deleting product ID:", id);
      await axios.delete(`${API_URL}/${id}`);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error.message, error.response ? error.response.data : error);
      alert("Failed to delete product. Check console for details.");
    }
  }

  // Logout button handler
  const logoutButton = document.querySelector("#logout .download-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../index.html";
    });
  }

  // Initialize active tab
  const lastActiveTab = localStorage.getItem("activeTab") || "dashboard";
  navLinks.forEach((link) => {
    const pageId = link.getAttribute("data-page");
    link.parentElement.classList.toggle("active", pageId === lastActiveTab);
    pages.forEach((page) => {
      page.style.display = page.id === lastActiveTab ? "block" : "none";
    });
    if (pageId === "store" && lastActiveTab === "store") {
      loadProducts();
    }
  });
});