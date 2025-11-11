// MobileFix Pro - Static Website Application
class MobileFixApp {
  constructor() {
    this.currentPage = "home"
    this.cart = []
    this.cartOpen = false
    this.isAdminLoggedIn = false
    this.editingProductId = null
    this.productSearch = ""
    this.adminSearch = ""
    this.mobileMenuOpen = false
    this.loadProductsFromStorage()
    this.loadTrackingFromStorage()
    this.init()
  }

  loadProductsFromStorage() {
    const stored = localStorage.getItem("mobilefix_products")
    if (stored) {
      this.products = JSON.parse(stored)
    } else {
      this.products = [
        {
          id: 1,
          name: "Samsung Galaxy S23",
          category: "Smartphones",
          price: 45000,
          originalPrice: 50000,
          image: "📱",
          rating: 4.8,
          reviews: 234,
          inStock: true,
          badge: "Best Seller",
        },
        {
          id: 2,
          name: "iPhone 15 Pro",
          category: "Smartphones",
          price: 99999,
          originalPrice: 109999,
          image: "📱",
          rating: 4.9,
          reviews: 567,
          inStock: true,
          badge: "Premium",
        },
        {
          id: 3,
          name: "OnePlus 12",
          category: "Smartphones",
          price: 49999,
          originalPrice: 55000,
          image: "📱",
          rating: 4.7,
          reviews: 189,
          inStock: true,
          badge: null,
        },
        {
          id: 4,
          name: "Xiaomi 14",
          category: "Smartphones",
          price: 35000,
          originalPrice: 40000,
          image: "📱",
          rating: 4.6,
          reviews: 345,
          inStock: true,
          badge: null,
        },
        {
          id: 5,
          name: "Tempered Glass Screen Protector",
          category: "Accessories",
          price: 299,
          originalPrice: 499,
          image: "🛡️",
          rating: 4.5,
          reviews: 1234,
          inStock: true,
          badge: null,
        },
        {
          id: 6,
          name: "Premium Protective Case",
          category: "Accessories",
          price: 599,
          originalPrice: 899,
          image: "📦",
          rating: 4.7,
          reviews: 892,
          inStock: true,
          badge: null,
        },
        {
          id: 7,
          name: "Fast Charge 65W Adapter",
          category: "Chargers",
          price: 1299,
          originalPrice: 1799,
          image: "🔌",
          rating: 4.8,
          reviews: 567,
          inStock: true,
          badge: "Hot Deal",
        },
        {
          id: 8,
          name: "Wireless Earbuds Pro",
          category: "Audio",
          price: 2499,
          originalPrice: 3499,
          image: "🎧",
          rating: 4.6,
          reviews: 723,
          inStock: true,
          badge: null,
        },
        {
          id: 9,
          name: "10000mAh Power Bank",
          category: "Power",
          price: 1499,
          originalPrice: 1999,
          image: "🔋",
          rating: 4.7,
          reviews: 1456,
          inStock: true,
          badge: null,
        },
        {
          id: 10,
          name: "Screen Replacement Service",
          category: "Services",
          price: 3500,
          originalPrice: 4500,
          image: "🔧",
          rating: 4.9,
          reviews: 2345,
          inStock: true,
          badge: "Expert Service",
        },
        {
          id: 11,
          name: "Battery Replacement Service",
          category: "Services",
          price: 1500,
          originalPrice: 1999,
          image: "🔧",
          rating: 4.8,
          reviews: 1876,
          inStock: true,
          badge: null,
        },
        {
          id: 12,
          name: "Charging Port Repair",
          category: "Services",
          price: 899,
          originalPrice: 1299,
          image: "🔧",
          rating: 4.7,
          reviews: 892,
          inStock: true,
          badge: null,
        },
      ]
      this.saveProductsToStorage()
    }
  }

  saveProductsToStorage() {
    localStorage.setItem("mobilefix_products", JSON.stringify(this.products))
  }

  loadTrackingFromStorage() {
    const stored = localStorage.getItem("mobilefix_tracking")
    if (stored) {
      this.trackingData = JSON.parse(stored)
    } else {
      this.trackingData = []
    }
  }

  saveTrackingToStorage() {
    localStorage.setItem("mobilefix_tracking", JSON.stringify(this.trackingData))
  }

  init() {
    this.setupEventListeners()
    this.renderPage("home")
  }

  setupEventListeners() {
    const app = document.getElementById("app")
    app.addEventListener("click", (e) => {
      if (e.target.dataset.page) {
        this.closeMobileMenu()
        this.renderPage(e.target.dataset.page)
      }
      if (e.target.dataset.action === "admin-login") {
        this.handleAdminLogin()
      }
      if (e.target.dataset.action === "admin-logout") {
        this.handleAdminLogout()
      }
      if (e.target.dataset.action === "add-product-form") {
        this.renderPage("admin-add-product")
      }
      if (e.target.dataset.action === "edit-product") {
        const productId = Number.parseInt(e.target.dataset.productId)
        this.editingProductId = productId
        this.renderPage("admin-edit-product")
      }
      if (e.target.dataset.action === "delete-product") {
        const productId = Number.parseInt(e.target.dataset.productId)
        this.deleteProduct(productId)
      }
      if (e.target.dataset.action === "save-product") {
        this.saveProduct()
      }
      if (e.target.dataset.action === "add-to-cart") {
        const productId = Number.parseInt(e.target.dataset.productId)
        this.addToCart(productId)
      }
      if (e.target.dataset.action === "toggle-cart") {
        this.toggleCart()
      }
      if (e.target.dataset.action === "checkout") {
        this.checkout()
      }
      if (e.target.dataset.action === "remove-item") {
        const itemId = Number.parseInt(e.target.dataset.itemId)
        this.removeFromCart(itemId)
      }
      if (e.target.dataset.action === "pay") {
        const method = e.target.dataset.method
        this.processPayment(method)
      }
      if (e.target.dataset.action === "cancel-payment") {
        this.renderPage("checkout")
      }
      if (e.target.dataset.action === "toggle-mobile-menu") {
        this.toggleMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen
    const mobileMenu = document.querySelector(".mobile-nav-menu")
    const menuToggle = document.querySelector(".mobile-menu-toggle")

    if (mobileMenu) {
      if (this.mobileMenuOpen) {
        mobileMenu.classList.add("active")
        menuToggle.classList.add("active")
      } else {
        mobileMenu.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false
    const mobileMenu = document.querySelector(".mobile-nav-menu")
    const menuToggle = document.querySelector(".mobile-menu-toggle")

    if (mobileMenu) {
      mobileMenu.classList.remove("active")
      menuToggle.classList.remove("active")
    }
  }

  handleAdminLogin() {
    const phone = document.getElementById("adminPhone")?.value || ""
    const password = document.getElementById("adminPassword")?.value || ""

    if (phone === "9876543210" && password === "admin123") {
      this.isAdminLoggedIn = true
      this.renderPage("admin")
    } else {
      alert("Invalid phone or password. Try: 9876543210 / admin123")
    }
  }

  handleAdminLogout() {
    this.isAdminLoggedIn = false
    this.renderPage("home")
  }

  saveProduct() {
    const name = document.getElementById("productName")?.value
    const category = document.getElementById("productCategory")?.value
    const price = Number.parseInt(document.getElementById("productPrice")?.value || 0)
    const originalPrice = Number.parseInt(document.getElementById("productOriginalPrice")?.value || 0)
    const imageUrl = document.getElementById("productImageUrl")?.value
    const emoji = document.getElementById("productImage")?.value
    const inStock = document.getElementById("productInStock")?.checked || false
    const qrId = document.getElementById("productQRId")?.value || ""
    const qrPassword = document.getElementById("productQRPassword")?.value || ""
    const trackingStatus = document.getElementById("productTrackingStatus")?.value || "Received"
    const ownerGender = document.getElementById("productOwnerGender")?.value || "none"

    if (!name || !category || !price) {
      alert("Please fill all required fields")
      return
    }

    if (this.editingProductId) {
      const product = this.products.find((p) => p.id === this.editingProductId)
      if (product) {
        product.name = name
        product.category = category
        product.price = price
        product.originalPrice = originalPrice || price
        product.imageUrl = imageUrl
        product.image = emoji || "📦"
        product.inStock = inStock
        product.qrId = qrId
        product.qrPassword = qrPassword
        product.trackingStatus = trackingStatus
        product.ownerGender = ownerGender

        if (product.qrId && product.qrPassword) {
          const trackingEntry = this.trackingData.find(
            (t) => t.qrId === product.qrId && t.qrPassword === product.qrPassword,
          )
          if (trackingEntry) {
            trackingEntry.status = trackingStatus
          }
        }
      }
      this.editingProductId = null
    } else {
      const newId = Math.max(...this.products.map((p) => p.id), 0) + 1
      const newProduct = {
        id: newId,
        name,
        category,
        price,
        originalPrice: originalPrice || price,
        image: emoji || "📦",
        imageUrl: imageUrl,
        rating: 4.5,
        reviews: 0,
        inStock,
        badge: null,
        qrId: qrId,
        qrPassword: qrPassword,
        trackingStatus: trackingStatus,
        ownerGender: ownerGender,
      }
      this.products.push(newProduct)

      if (qrId && qrPassword) {
        this.trackingData.push({
          qrId: qrId,
          qrPassword: qrPassword,
          productName: name,
          deviceModel: category,
          status: trackingStatus,
          issue: "",
          estimatedDays: 2,
          createdAt: new Date().toLocaleDateString(),
        })
      }
    }

    this.saveProductsToStorage()
    this.saveTrackingToStorage()
    alert("Product saved successfully!")
    this.renderPage("admin")
  }

  deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.products = this.products.filter((p) => p.id !== productId)
      const productToDelete = this.products.find((p) => p.id === productId)
      if (productToDelete && productToDelete.qrId && productToDelete.qrPassword) {
        this.trackingData = this.trackingData.filter(
          (t) => t.qrId !== productToDelete.qrId || t.qrPassword !== productToDelete.qrPassword,
        )
        this.saveTrackingToStorage()
      }
      this.saveProductsToStorage()
      this.renderPage("admin")
    }
  }

  renderPage(page) {
    const app = document.getElementById("app")
    this.currentPage = page

    if (page.startsWith("admin") && !this.isAdminLoggedIn) {
      page = "admin-login"
    }

    let html = this.renderNavigation()

    if (page === "home") {
      html += this.renderHome()
    } else if (page === "products") {
      html += this.renderProducts()
    } else if (page === "about") {
      html += this.renderAbout()
    } else if (page === "dashboard") {
      html += this.renderDashboard()
    } else if (page === "checkout") {
      html += this.renderCheckout()
    } else if (page === "admin-login") {
      html += this.renderAdminLogin()
    } else if (page === "admin") {
      html += this.renderAdmin()
    } else if (page === "admin-add-product") {
      html += this.renderAddProductForm()
    } else if (page === "admin-edit-product") {
      html += this.renderEditProductForm()
    } else if (page === "shop-location") {
      html += this.renderShopLocation()
    }

    html += this.renderFooter()

    app.innerHTML = html
  }

  renderNavigation() {
    return `
            <nav>
                <div class="nav-content">
                    <div class="nav-brand" data-page="home" style="cursor: pointer;">
                        <div class="nav-logo">MP</div>
                        <div class="nav-title">Manjula mobiles</div>
                    </div>
                    <div class="nav-links">
                        <button class="nav-link ${this.currentPage === "home" ? "active" : ""}" data-page="home">Home</button>
                        <button class="nav-link ${this.currentPage === "shop-location" ? "active" : ""}" data-page="shop-location">Shop Location</button>
                        <button class="nav-link ${this.currentPage === "products" ? "active" : ""}" data-page="products">Products</button>
                        <button class="nav-link ${this.currentPage === "about" ? "active" : ""}" data-page="about">About</button>
                        ${this.isAdminLoggedIn ? `<button class="nav-admin" data-action="admin-logout">Logout (Owner)</button>` : `<button class="nav-admin" data-page="admin-login">Owner Portal</button>`}
                    </div>
                    <button class="mobile-menu-toggle" data-action="toggle-mobile-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
            <div class="mobile-nav-menu">
                <button class="mobile-nav-link ${this.currentPage === "home" ? "active" : ""}" data-page="home">Home</button>
                <button class="mobile-nav-link ${this.currentPage === "shop-location" ? "active" : ""}" data-page="shop-location">Shop Location</button>
                <button class="mobile-nav-link ${this.currentPage === "products" ? "active" : ""}" data-page="products">Products</button>
                <button class="mobile-nav-link ${this.currentPage === "about" ? "active" : ""}" data-page="about">About</button>
                ${this.isAdminLoggedIn ? `<button class="mobile-nav-admin" data-action="admin-logout">Logout (Owner)</button>` : `<button class="mobile-nav-admin" data-page="admin-login">Owner Portal</button>`}
            </div>
        `
  }

  renderAbout() {
    return `
      <div class="about-section">
        <div class="container" style="padding-top: 96px; padding-bottom: 80px;">
          <div class="about-grid">
            <div class="about-content">
              <div style="display: inline-block; padding: 8px 16px; background-color: rgba(30, 41, 59, 0.5); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 9999px; margin-bottom: 24px;">
                <span style="color: #fb923c; font-size: 14px; font-weight: 500;">About Us</span>
              </div>
              <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 24px; line-height: 1.2;">MobileFix Pro</h1>
              <p style="font-size: 18px; color: #94a3b8; margin-bottom: 24px; line-height: 1.6;">Your trusted mobile repair and parts center in Ramapuram, Tamil Nadu. We specialize in professional device repairs, genuine parts supply, and premium mobile accessories with expert technicians and 24/7 support.</p>
              
              <div style="margin-bottom: 32px;">
                <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Why Choose Us?</h3>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
                  <li style="display: flex; align-items: center; gap: 12px;"><span style="color: #fb923c; font-weight: 700;">✓</span> <span>Expert technicians with 15+ years experience</span></li>
                  <li style="display: flex; align-items: center; gap: 12px;"><span style="color: #fb923c; font-weight: 700;">✓</span> <span>100% genuine spare parts and accessories</span></li>
                  <li style="display: flex; align-items: center; gap: 12px;"><span style="color: #fb923c; font-weight: 700;">✓</span> <span>24-hour express service available</span></li>
                  <li style="display: flex; align-items: center; gap: 12px;"><span style="color: #fb923c; font-weight: 700;">✓</span> <span>6-month warranty on all repairs</span></li>
                  <li style="display: flex; align-items: center; gap: 12px;"><span style="color: #fb923c; font-weight: 700;">✓</span> <span>All major brands supported</span></li>
                </ul>
              </div>

              <div style="display: flex; gap: 16px; margin-bottom: 32px;">
                <button class="btn btn-primary" data-page="products">Shop Now</button>
                <a href="https://www.google.com/maps/search/Melmaruvathur,+to,+Vandavasi+Rd,+Ramapuram,+Tamil+Nadu+603201" target="_blank" class="btn btn-secondary" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">Visit Us</a>
              </div>

              <div class="contact-info" style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Get In Touch</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <p style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;">📍</span> <span><strong>Melmaruvathur, Vandavasi Rd, Ramapuram, Tamil Nadu 603201</strong></span></p>
                  <p style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;">📞</span> <span style="color: #22d3ee;"><strong>+91 9876543210</strong></span></p>
                  <p style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;">✉️</span> <span style="color: #22d3ee;"><strong>info@mobilefixpro.com</strong></span></p>
                  <p style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;">🕐</span> <span>Mon - Sun: 9:00 AM - 10:00 PM<br>Holidays: 10:00 AM - 8:00 PM</span></p>
                </div>
              </div>
            </div>
            <div class="about-image">
              <div class="shop-image-container">
                <img src="https://images.unsplash.com/photo-1632765486500-24795490f399?w=400&h=400&fit=crop" alt="Mobile Repair Shop" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; margin-bottom: 16px;">
                <div style="background: linear-gradient(to bottom right, rgba(251, 146, 60, 0.2), rgba(239, 68, 68, 0.2)); padding: 32px; border-radius: 12px; text-align: center;">
                  <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 12px;">MobileFix Pro</h3>
                  <p style="color: #94a3b8; font-size: 14px; margin-bottom: 16px;">Professional Mobile Repair & Parts Center - Ramapuram</p>
                  <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                    <span style="background-color: rgba(251, 146, 60, 0.2); padding: 6px 12px; border-radius: 20px; font-size: 12px; color: #fb923c;">Expert Service</span>
                    <span style="background-color: rgba(251, 146, 60, 0.2); padding: 6px 12px; border-radius: 20px; font-size: 12px; color: #fb923c;">Genuine Parts</span>
                    <span style="background-color: rgba(251, 146, 60, 0.2); padding: 6px 12px; border-radius: 20px; font-size: 12px; color: #fb923c;">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderAdminLogin() {
    return `
      <div style="min-height: 100vh; background-color: #020617; padding-top: 96px; padding-bottom: 80px; display: flex; align-items: center; justify-content: center;">
        <div class="container" style="max-width: 400px;">
          <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 48px;">
            <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 8px; text-align: center;">Owner Portal</h1>
            <p style="color: #94a3b8; text-align: center; margin-bottom: 32px;">Enter your credentials to access</p>
            
            <div style="background-color: rgba(251, 146, 60, 0.1); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="font-size: 12px; color: #fb923c; margin: 0;"><strong>Demo Credentials:</strong></p>
              <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0 0;">Phone: <strong>9876543210</strong></p>
              <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0 0;">Password: <strong>admin123</strong></p>
            </div>

            <div class="form-field">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="input" placeholder="+91 9876543210" id="adminPhone">
            </div>

            <div class="form-field">
              <label class="form-label">Password</label>
              <input type="password" class="input" placeholder="Enter password" id="adminPassword">
            </div>

            <button class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 16px; margin-bottom: 12px;" data-action="admin-login">Login</button>
            <button class="btn btn-secondary" style="width: 100%; padding: 12px; font-size: 16px;" data-page="home">Back to Home</button>
          </div>
        </div>
      </div>
    `
  }

  renderAdmin() {
    const searchTerm = (document.getElementById("adminSearch")?.value || "").toLowerCase()
    const filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm),
    )

    return `
      <div style="min-height: 100vh; background-color: #020617; padding-top: 96px; padding-bottom: 80px;">
        <div class="container">
          <div style="margin-bottom: 48px;">
            <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 8px;">Owner Portal</h1>
            <p style="color: #94a3b8;">Manage your products (left) and repair tracking (right)</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
            
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2 style="font-size: 28px; font-weight: 700;">Products</h2>
                <button class="btn btn-primary" style="padding: 8px 16px; font-size: 14px;" data-action="add-product-form">+ Add</button>
              </div>

              <div style="margin-bottom: 24px;">
                <input 
                  type="text" 
                  class="input" 
                  placeholder="Search products..." 
                  id="adminSearch"
                  oninput="app.renderPage('admin')"
                >
              </div>

              <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; overflow: hidden;">
                <div style="max-height: 600px; overflow-y: auto;">
                  ${
                    filteredProducts.length > 0
                      ? filteredProducts
                          .map(
                            (product) => `
                      <div style="padding: 16px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                          <div style="font-weight: 700; margin-bottom: 4px;">${product.name}</div>
                          <div style="color: #64748b; font-size: 12px; margin-bottom: 4px;">${product.category}</div>
                          <div style="color: #fb923c; font-weight: 600;">₹${product.price.toLocaleString()}</div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" data-action="edit-product" data-product-id="${product.id}">Edit</button>
                          <button class="btn" style="padding: 6px 12px; font-size: 12px; background: rgba(244, 63, 94, 0.1); color: #f87171; border: 1px solid #f87171; border-radius: 6px; cursor: pointer;" data-action="delete-product" data-product-id="${product.id}">Del</button>
                        </div>
                      </div>
                    `,
                          )
                          .join("")
                      : `<div style="padding: 24px; text-align: center; color: #94a3b8;">No products found</div>`
                  }
                </div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2 style="font-size: 28px; font-weight: 700;">Tracking Orders</h2>
                <button class="btn btn-primary" style="padding: 8px 16px; font-size: 14px;" onclick="app.toggleTrackingForm()">+ New</button>
              </div>

              <div id="trackingForm" style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 24px; display: none;">
                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Create Repair Tracking</h3>
                
                <div class="form-field" style="margin-bottom: 12px;">
                  <label class="form-label" style="margin-bottom: 6px;">QR ID *</label>
                  <input type="text" class="input" placeholder="e.g., QR123456" id="newTrackingQRId" style="font-size: 13px; padding: 10px;">
                </div>

                <div class="form-field" style="margin-bottom: 12px;">
                  <label class="form-label" style="margin-bottom: 6px;">Password *</label>
                  <input type="text" class="input" placeholder="e.g., pass123" id="newTrackingPassword" style="font-size: 13px; padding: 10px;">
                </div>

                <div class="form-field" style="margin-bottom: 12px;">
                  <label class="form-label" style="margin-bottom: 6px;">Device Model *</label>
                  <input type="text" class="input" placeholder="e.g., iPhone 15 Pro" id="newTrackingDevice" style="font-size: 13px; padding: 10px;">
                </div>

                <div class="form-field" style="margin-bottom: 12px;">
                  <label class="form-label" style="margin-bottom: 6px;">Issue Description</label>
                  <textarea class="input" placeholder="Describe the device issue..." id="newTrackingIssue" style="font-size: 13px; padding: 10px; min-height: 80px;"></textarea>
                </div>

                <div class="form-field" style="margin-bottom: 12px;">
                  <label class="form-label" style="margin-bottom: 6px;">Tracking Status</label>
                  <select class="input" id="newTrackingStatus" style="background-color: rgba(51, 65, 85, 0.5); color: #f8fafc; font-size: 13px; padding: 10px;">
                    <option value="Received">Received</option>
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Quality Check">Quality Check</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div class="form-field" style="margin-bottom: 12px;">
                  <label class="form-label" style="margin-bottom: 6px;">Estimated Days</label>
                  <input type="number" class="input" placeholder="2" id="newTrackingDays" value="2" style="font-size: 13px; padding: 10px;">
                </div>

                <div style="display: flex; gap: 12px;">
                  <button class="btn btn-primary" style="flex: 1; padding: 10px; font-size: 13px;" onclick="app.saveNewTracking()">Save Tracking</button>
                  <button class="btn btn-secondary" style="flex: 1; padding: 10px; font-size: 13px;" onclick="app.toggleTrackingForm()">Cancel</button>
                </div>
              </div>

              <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; overflow: hidden;">
                <div style="max-height: 600px; overflow-y: auto;">
                  ${
                    this.trackingData.length > 0
                      ? this.trackingData
                          .map(
                            (tracking) => `
                      <div style="padding: 16px; border-bottom: 1px solid #334155;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                          <div>
                            <div style="font-weight: 700; margin-bottom: 4px;">QR: ${tracking.qrId}</div>
                            <div style="color: #64748b; font-size: 12px; margin-bottom: 4px;">${tracking.productName}</div>
                          </div>
                          <span class="status-badge status-${tracking.status.toLowerCase().replace(/\\s+/g, "-")}" style="font-size: 11px; padding: 4px 8px;">${tracking.status}</span>
                        </div>
                        <div style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">${tracking.issue || "Mobile Repair Service"}</div>
                        <div style="display: flex; gap: 8px;">
                          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px; flex: 1;" onclick="app.editTracking('${tracking.qrId}')">Edit Status</button>
                          <button class="btn" style="padding: 6px 12px; font-size: 12px; flex: 1; background: rgba(244, 63, 94, 0.1); color: #f87171; border: 1px solid #f87171; border-radius: 6px; cursor: pointer;" onclick="app.deleteTracking('${tracking.qrId}')">Delete</button>
                        </div>
                      </div>
                    `,
                          )
                          .join("")
                      : `<div style="padding: 24px; text-align: center; color: #94a3b8;">No tracking records yet</div>`
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `
  }

  toggleTrackingForm() {
    const form = document.getElementById("trackingForm")
    if (form) {
      form.style.display = form.style.display === "none" ? "block" : "none"
    }
  }

  saveNewTracking() {
    const qrId = document.getElementById("newTrackingQRId")?.value
    const password = document.getElementById("newTrackingPassword")?.value
    const device = document.getElementById("newTrackingDevice")?.value
    const issue = document.getElementById("newTrackingIssue")?.value
    const status = document.getElementById("newTrackingStatus")?.value
    const days = document.getElementById("newTrackingDays")?.value

    if (!qrId || !password || !device) {
      alert("Please fill QR ID, Password, and Device Model")
      return
    }

    if (this.trackingData.find((t) => t.qrId === qrId && t.qrPassword === password)) {
      alert("This QR ID and Password combination already exists")
      return
    }

    this.trackingData.push({
      qrId: qrId,
      qrPassword: password,
      productName: device,
      deviceModel: device,
      status: status,
      issue: issue,
      estimatedDays: Number.parseInt(days) || 2,
      createdAt: new Date().toLocaleDateString(),
    })

    this.saveTrackingToStorage()
    alert("Tracking record created successfully!")
    document.getElementById("newTrackingQRId").value = ""
    document.getElementById("newTrackingPassword").value = ""
    document.getElementById("newTrackingDevice").value = ""
    document.getElementById("newTrackingIssue").value = ""
    document.getElementById("newTrackingDays").value = "2"
    this.toggleTrackingForm()
    this.renderPage("admin")
  }

  editTracking(qrId) {
    const tracking = this.trackingData.find((t) => t.qrId === qrId)
    if (!tracking) return

    const newStatus = prompt(
      "Enter new tracking status:\n\nReceived\nDiagnostics\nIn Progress\nQuality Check\nReady for Pickup\nCompleted",
      tracking.status,
    )

    if (newStatus) {
      const validStatuses = ["Received", "Diagnostics", "In Progress", "Quality Check", "Ready for Pickup", "Completed"]
      if (validStatuses.includes(newStatus)) {
        tracking.status = newStatus
        this.saveTrackingToStorage()
        this.renderPage("admin")
      } else {
        alert("Invalid status. Please use one of the suggested statuses.")
      }
    }
  }

  deleteTracking(qrId) {
    if (confirm("Are you sure you want to delete this tracking record?")) {
      this.trackingData = this.trackingData.filter((t) => t.qrId !== qrId)
      this.saveTrackingToStorage()
      this.renderPage("admin")
    }
  }

  renderAddProductForm() {
    return `
      <div style="min-height: 100vh; background-color: #020617; padding-top: 96px; padding-bottom: 80px;">
        <div class="container" style="max-width: 600px;">
          <button class="back-button" data-page="admin">← Back to Products</button>
          <h1 style="font-size: 36px; font-weight: 700; margin-bottom: 32px;">Add New Product</h1>

          <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 32px;">
            <div class="form-field">
              <label class="form-label">Product Name *</label>
              <input type="text" class="input" placeholder="Enter product name" id="productName">
            </div>

            <div class="form-field">
              <label class="form-label">Category *</label>
              <select class="input" id="productCategory" style="background-color: rgba(51, 65, 85, 0.5); color: #f8fafc;">
                <option value="">Select category</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Services">Services</option>
                <option value="Accessories">Accessories</option>
                <option value="Chargers">Chargers</option>
                <option value="Audio">Audio</option>
                <option value="Power">Power Banks</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-field">
                <label class="form-label">Price (₹) *</label>
                <input type="number" class="input" placeholder="2999" id="productPrice">
              </div>
              <div class="form-field">
                <label class="form-label">Original Price (₹)</label>
                <input type="number" class="input" placeholder="3999" id="productOriginalPrice">
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">Product Image</label>
              <div style="margin-bottom: 12px;">
                <p style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">Option 1: Image URL</p>
                <input type="url" class="input" placeholder="https://example.com/image.jpg" id="productImageUrl">
              </div>
              <div style="margin-bottom: 12px;">
                <p style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">Option 2: Upload File</p>
                <input type="file" class="input" accept="image/*" id="productImageFile" onchange="app.handleImageUpload(event)">
              </div>
              <div style="margin-bottom: 12px;">
                <p style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">Option 3: Emoji/Icon</p>
                <input type="text" class="input" placeholder="📱 or 🔧 or 📦" id="productImage" maxlength="2">
              </div>
            </div>

            <div style="background-color: rgba(251, 146, 60, 0.1); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="font-size: 12px; color: #fb923c; margin: 0 0 16px 0;"><strong>Mobile Repair Tracking (Optional)</strong></p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-field">
                  <label class="form-label">QR ID</label>
                  <input type="text" class="input" placeholder="e.g., QR123456" id="productQRId">
                </div>
                <div class="form-field">
                  <label class="form-label">Password</label>
                  <input type="text" class="input" placeholder="e.g., pass123" id="productQRPassword">
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
              <input type="checkbox" id="productInStock" checked style="width: 18px; height: 18px; cursor: pointer;">
              <label for="productInStock" style="cursor: pointer; color: #cbd5e1;">In Stock</label>
            </div>

            <button class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 16px; margin-bottom: 12px;" data-action="save-product">Add Product</button>
            <button class="btn btn-secondary" style="width: 100%; padding: 12px; font-size: 16px;" data-page="admin">Cancel</button>
          </div>
        </div>
      </div>
    `
  }

  renderEditProductForm() {
    const product = this.products.find((p) => p.id === this.editingProductId)
    if (!product) return `<div>Product not found</div>`

    return `
      <div style="min-height: 100vh; background-color: #020617; padding-top: 96px; padding-bottom: 80px;">
        <div class="container" style="max-width: 600px;">
          <button class="back-button" data-page="admin">← Back to Products</button>
          <h1 style="font-size: 36px; font-weight: 700; margin-bottom: 32px;">Edit Product</h1>

          <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 32px;">
            <div class="form-field">
              <label class="form-label">Product Name *</label>
              <input type="text" class="input" value="${product.name}" id="productName">
            </div>

            <div class="form-field">
              <label class="form-label">Category *</label>
              <select class="input" id="productCategory" style="background-color: rgba(51, 65, 85, 0.5); color: #f8fafc;">
                <option value="Smartphones" ${product.category === "Smartphones" ? "selected" : ""}>Smartphones</option>
                <option value="Services" ${product.category === "Services" ? "selected" : ""}>Services</option>
                <option value="Accessories" ${product.category === "Accessories" ? "selected" : ""}>Accessories</option>
                <option value="Chargers" ${product.category === "Chargers" ? "selected" : ""}>Chargers</option>
                <option value="Audio" ${product.category === "Audio" ? "selected" : ""}>Audio</option>
                <option value="Power" ${product.category === "Power" ? "selected" : ""}>Power Banks</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-field">
                <label class="form-label">Price (₹) *</label>
                <input type="number" class="input" value="${product.price}" id="productPrice">
              </div>
              <div class="form-field">
                <label class="form-label">Original Price (₹)</label>
                <input type="number" class="input" value="${product.originalPrice}" id="productOriginalPrice">
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">Product Image</label>
              <div style="margin-bottom: 12px;">
                <p style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">Option 1: Image URL</p>
                <input type="url" class="input" placeholder="https://example.com/image.jpg" id="productImageUrl" value="${product.imageUrl || ""}">
              </div>
              <div style="margin-bottom: 12px;">
                <p style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">Option 2: Upload File</p>
                <input type="file" class="input" id="productImageFile" onchange="app.handleImageUpload(event)">
              </div>
              <div style="margin-bottom: 12px;">
                <p style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">Option 3: Emoji/Icon</p>
                <input type="text" class="input" value="${product.image}" id="productImage" maxlength="2">
              </div>
            </div>

            <div style="background-color: rgba(251, 146, 60, 0.1); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="font-size: 12px; color: #fb923c; margin: 0 0 16px 0;"><strong>Mobile Repair Tracking</strong></p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-field">
                  <label class="form-label">QR ID</label>
                  <input type="text" class="input" value="${product.qrId || ""}" id="productQRId">
                </div>
                <div class="form-field">
                  <label class="form-label">Password</label>
                  <input type="text" class="input" value="${product.qrPassword || ""}" id="productQRPassword">
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
              <input type="checkbox" id="productInStock" ${product.inStock ? "checked" : ""} style="width: 18px; height: 18px; cursor: pointer;">
              <label for="productInStock" style="cursor: pointer; color: #cbd5e1;">In Stock</label>
            </div>

            <button class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 16px; margin-bottom: 12px;" data-action="save-product">Update Product</button>
            <button class="btn btn-secondary" style="width: 100%; padding: 12px; font-size: 16px;" data-page="admin">Cancel</button>
          </div>
        </div>
      </div>
    `
  }

  handleImageUpload(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Image = e.target.result
        document.getElementById("productImageUrl").value = base64Image
      }
      reader.readAsDataURL(file)
    }
  }

  renderHome() {
    return `
            <section class="hero">
                <div class="hero-bg"></div>
                <div class="hero-content">
                    <div class="hero-text">
                        <div style="display: inline-block; padding: 8px 16px; background-color: rgba(30, 41, 59, 0.5); border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 9999px; margin-bottom: 24px; animation: fade-in 0.5s ease-out;">
                            <span style="color: #22d3ee; font-size: 14px; font-weight: 500;">Advanced Mobile Solutions</span>
                        </div>
                        <h1>Mobile Repair <span style="display: block; background: linear-gradient(to right, #22d3ee, #60a5fa, #3b82f6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: gradient 3s ease infinite;">Reimagined</span></h1>
                        <p>Professional mobile repair and premium products. Real-time tracking, expert technicians, and genuine parts—all in one place.</p>
                        <div class="hero-buttons">
                            <button class="btn btn-primary" data-page="dashboard">Track Your Device</button>
                            <button class="btn btn-secondary" data-page="products">Browse Products</button>
                        </div>
                    </div>
                    <div class="hero-image">
                        <div class="hero-image-bg"></div>
                        <div class="hero-image-card">
                            <span style="animation: float 3s ease-in-out infinite;">📱</span>
                        </div>
                    </div>
                </div>
            </section>

            ${this.renderTrackingSection()}
            ${this.renderServicesGrid()}
            ${this.renderStatsSection()}
        `
  }

  renderTrackingSection() {
    return `
            <section class="tracking-section">
                <div class="container">
                    <div class="section-header">
                        <h2>Track Your Order</h2>
                        <p>Real-time status updates for your mobile device</p>
                    </div>
                    <div class="tracking-grid">
                        <div class="tracking-form">
                            <h3>By Order ID</h3>
                            <div class="form-group">
                                <input type="text" class="input" placeholder="Enter Order ID" id="orderId">
                            </div>
                            <div class="form-group">
                                <input type="password" class="input" placeholder="Enter Password" id="orderPassword">
                            </div>
                            <button class="btn btn-primary" style="width: 100%;" onclick="app.trackOrder()">Check Status</button>
                        </div>
                        <div id="trackResult" style="display: none;">
                            <div class="tracking-result">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                                    <div style="width: 12px; height: 12px; background-color: #22d3ee; border-radius: 50%; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
                                    <span style="color: #22d3ee; font-weight: 600;">Order Found</span>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #64748b; font-size: 12px;">Order ID</p>
                                    <p style="font-size: 18px; font-weight: 600;" id="resultOrderId"></p>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #64748b; font-size: 12px;">Status</p>
                                    <p style="font-size: 18px; font-weight: 600; color: #22d3ee;" id="resultStatus"></p>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #64748b; font-size: 12px;">Device</p>
                                    <p style="font-size: 18px; font-weight: 600;" id="resultDevice"></p>
                                </div>
                                <div>
                                    <p style="color: #64748b; font-size: 12px;">Issue</p>
                                    <p style="font-size: 18px; font-weight: 600;" id="resultIssue"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `
  }

  trackOrder() {
    const qrId = document.getElementById("orderId").value
    const password = document.getElementById("orderPassword").value
    const result = document.getElementById("trackResult")

    if (!qrId || !password) {
      alert("Please enter both QR ID and Password")
      return
    }

    const trackingEntry = this.trackingData.find((t) => t.qrId === qrId && t.qrPassword === password)

    if (trackingEntry) {
      document.getElementById("resultOrderId").textContent = qrId
      document.getElementById("resultStatus").textContent = trackingEntry.status
      document.getElementById("resultDevice").textContent = trackingEntry.productName
      document.getElementById("resultIssue").textContent = trackingEntry.issue || "Mobile Repair Service"
      result.style.display = "block"
    } else {
      alert("Invalid QR ID or Password. Please check and try again.")
    }
  }

  renderServicesGrid() {
    const services = [
      {
        title: "Mobile Repair",
        description: "Expert repairs for all brands. Screen replacement, battery issues, software problems, and more.",
        icon: "🔧",
        features: ["Fast turnaround", "Certified techs", "Warranty included"],
      },
      {
        title: "Genuine Parts",
        description: "Original batteries, screens, charging ports, and components. Quality guaranteed.",
        icon: "📦",
        features: ["100% authentic", "Bulk orders", "Wholesale rates"],
      },
      {
        title: "Premium Products",
        description: "Wide range of phones, accessories, cases, and chargers. Best prices guaranteed.",
        icon: "📱",
        features: ["Best prices", "Wide selection", "Free shipping"],
      },
    ]

    return `
            <section class="services-section">
                <div class="container">
                    <div class="section-header">
                        <h2>Our Services</h2>
                        <p>Comprehensive solutions for all your mobile needs</p>
                    </div>
                    <div class="services-grid">
                        ${services
                          .map(
                            (service, idx) => `
                            <div class="service-card" style="animation-delay: ${idx * 100}ms;">
                                <div class="service-icon">${service.icon}</div>
                                <h3>${service.title}</h3>
                                <p>${service.description}</p>
                                <ul class="service-features">
                                    ${service.features.map((f) => `<li><span class="feature-dot"></span>${f}</li>`).join("")}
                                </ul>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </section>
        `
  }

  renderStatsSection() {
    return `
            <section class="services-section" style="background-color: rgba(15, 23, 42, 0.5);">
                <div class="container">
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;">
                        <div style="text-align: center;">
                            <div style="font-size: 36px; font-weight: 700; color: #fb923c; margin-bottom: 8px;">5000+</div>
                            <p style="color: #94a3b8;">Devices Repaired</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 36px; font-weight: 700; color: #fb923c; margin-bottom: 8px;">98%</div>
                            <p style="color: #94a3b8;">Customer Satisfaction</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 36px; font-weight: 700; color: #fb923c; margin-bottom: 8px;">24hrs</div>
                            <p style="color: #94a3b8;">Express Service</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 36px; font-weight: 700; color: #fb923c; margin-bottom: 8px;">15+</div>
                            <p style="color: #94a3b8;">Expert Technicians</p>
                        </div>
                    </div>
                </div>
            </section>
        `
  }

  renderProducts() {
    const searchTerm = (document.getElementById("productSearch")?.value || "").toLowerCase()
    const filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm),
    )

    const html = `
            <div class="products-section">
                <div class="products-header">
                    <h1>Repair Services & Parts</h1>
                    <p>Professional mobile repair services, genuine parts, and accessories</p>
                    
                    <div style="margin-top: 32px; display: flex; gap: 12px; max-width: 400px;">
                        <input 
                            type="text" 
                            class="input" 
                            placeholder="Search products by name or category..." 
                            id="productSearch"
                            style="flex: 1;"
                            oninput="app.renderPage('products')"
                        >
                        <button class="btn btn-secondary" onclick="document.getElementById('productSearch').value = ''; app.renderPage('products')">Clear</button>
                    </div>
                </div>
                <div style="display: flex; position: relative;">
                    <div style="flex: 1;">
                        <div class="products-grid">
                            ${
                              filteredProducts.length > 0
                                ? filteredProducts.map((product) => this.renderProductCard(product)).join("")
                                : '<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: #94a3b8;">No products found matching your search.</div>'
                            }
                        </div>
                    </div>
                    ${this.renderShoppingCart()}
                </div>
            </div>
        `
    return html
  }

  renderProductCard(product) {
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    const displayImage = product.imageUrl
      ? `<img src="${product.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">`
      : `<span>${product.image}</span>`

    return `
            <div class="product-card">
                <div class="product-image">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
                    ${displayImage}
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="product-stars">${"⭐".repeat(Math.floor(product.rating))}</div>
                        <span class="product-reviews">${product.rating} (${product.reviews})</span>
                    </div>
                    <div class="product-pricing">
                        <div class="product-prices">
                            <span class="product-price">₹${product.price.toLocaleString()}</span>
                            <span class="product-original">₹${product.originalPrice.toLocaleString()}</span>
                            <span class="product-discount">${discountPercent}% off</span>
                        </div>
                    </div>
                    <div class="product-stock">${product.inStock ? "In Stock" : "Out of Stock"}</div>
                    <div class="product-buttons">
                        <button class="btn btn-primary" data-action="add-to-cart" data-product-id="${product.id}" ${!product.inStock ? "disabled" : ""} style="flex: 1;">Add to Cart</button>
                        <button class="btn btn-secondary" style="flex: 1;">Details</button>
                    </div>
                </div>
            </div>
        `
  }

  renderShoppingCart() {
    const cartTotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartHTML = `
            <div class="shopping-cart ${this.cartOpen ? "active" : ""}">
                <div class="cart-header">
                    <span class="cart-title">Shopping Cart (${this.cart.length})</span>
                    <button class="cart-close" data-action="toggle-cart">✕</button>
                </div>
                <div class="cart-items">
                    ${
                      this.cart.length === 0
                        ? '<p style="color: #94a3b8; text-align: center; margin-top: 24px;">Your cart is empty</p>'
                        : this.cart
                            .map(
                              (item) => `
                        <div class="cart-item">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-qty">Qty: ${item.quantity}</div>
                            <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
                            <button data-action="remove-item" data-item-id="${item.id}" style="background: none; border: none; color: #f87171; cursor: pointer; font-size: 12px; margin-top: 8px;">Remove</button>
                        </div>
                    `,
                            )
                            .join("")
                    }
                </div>
                ${
                  this.cart.length > 0 &&
                  `
                    <div class="cart-footer">
                        <div class="cart-total">
                            <span class="cart-total-label">Total:</span>
                            <span class="cart-total-amount">₹${cartTotal.toLocaleString()}</span>
                        </div>
                        <button class="cart-button" data-action="checkout">Proceed to Checkout</button>
                    </div>
                `
                }
            </div>
        `
    return cartHTML
  }

  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId)
    if (product) {
      const existingItem = this.cart.find((item) => item.id === productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.renderPage("products")
    }
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId)
    this.renderPage("products")
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen
    this.renderPage("products")
  }

  checkout() {
    if (this.cart.length > 0) {
      this.renderPage("checkout")
    } else {
      alert("Your cart is empty!")
    }
  }

  renderCheckout() {
    const cartTotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalWithTax = Math.round(cartTotal * 1.1)

    return `
            <div class="checkout-section">
                <div class="checkout-container">
                    <button class="back-button" data-page="products">← Back to Products</button>
                    <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 12px;">Checkout</h1>
                    <p style="color: #94a3b8; font-size: 18px; margin-bottom: 48px;">Complete your repair service order</p>

                    <div class="checkout-grid">
                        <div>
                            <div class="checkout-form">
                                <h2>Delivery Information</h2>
                                <div class="form-field">
                                    <label class="form-label">Full Name</label>
                                    <input type="text" class="input" placeholder="Enter your full name" id="fullName">
                                </div>
                                <div class="form-group-row">
                                    <div class="form-field">
                                        <label class="form-label">Email</label>
                                        <input type="email" class="input" placeholder="your@email.com" id="email">
                                    </div>
                                    <div class="form-field">
                                        <label class="form-label">Phone Number</label>
                                        <input type="tel" class="input" placeholder="+91 XXXXX XXXXX" id="phone">
                                    </div>
                                </div>
                                <div class="form-field">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="input" placeholder="Street address and apartment/suite" id="address">
                                </div>
                                <div class="form-group-row">
                                    <div class="form-field">
                                        <label class="form-label">City</label>
                                        <input type="text" class="input" placeholder="Your city" id="city">
                                    </div>
                                    <div class="form-field">
                                        <label class="form-label">Postal Code</label>
                                        <input type="text" class="input" placeholder="Postal code" id="postalCode">
                                    </div>
                                </div>
                                <button class="btn btn-primary" style="width: 100%; padding: 16px; font-size: 16px;" onclick="app.proceedToPayment()">Continue to Payment</button>
                            </div>
                        </div>
                        <div>
                            <div class="checkout-summary">
                                <h2>Order Summary</h2>
                                <div class="summary-items">
                                    ${this.cart
                                      .map(
                                        (item) => `
                                        <div class="summary-item">
                                            <div>
                                                <div class="summary-item-name">${item.name}</div>
                                                <div class="summary-item-qty">Qty: ${item.quantity}</div>
                                            </div>
                                            <div class="summary-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
                                        </div>
                                    `,
                                      )
                                      .join("")}
                                </div>
                                <div class="summary-totals">
                                    <div class="summary-row">
                                        <span class="summary-label">Subtotal:</span>
                                        <span>₹${cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div class="summary-row">
                                        <span class="summary-label">Shipping:</span>
                                        <span style="color: #4ade80;">Free</span>
                                    </div>
                                    <div class="summary-row">
                                        <span class="summary-label">Tax:</span>
                                        <span>₹${Math.round(cartTotal * 0.1).toLocaleString()}</span>
                                    </div>
                                    <div class="summary-total">
                                        <span>Total:</span>
                                        <span class="summary-total-amount">₹${totalWithTax.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ${this.renderPaymentModal(cartTotal, cartItems, totalWithTax)}
            </div>
        `
  }

  renderPaymentModal(cartTotal, cartItems, totalWithTax) {
    return `
            <div id="paymentModal" class="modal">
                <div class="modal-content">
                    <h2 class="modal-title">Select Payment Method</h2>
                    <div class="payment-info">
                        <div class="payment-label">Total Amount to Pay</div>
                        <div class="payment-amount">₹${totalWithTax.toLocaleString()}</div>
                        <div class="payment-details">${cartItems} items • Includes 10% GST</div>
                    </div>
                    <div class="payment-methods">
                        <button class="payment-method" data-action="pay" data-method="Google Pay">
                            <span class="payment-icon">💳</span>
                            <span class="payment-name">Google Pay</span>
                            <span class="payment-arrow">→</span>
                        </button>
                        <button class="payment-method" data-action="pay" data-method="PhonePe">
                            <span class="payment-icon">📱</span>
                            <span class="payment-name">PhonePe</span>
                            <span class="payment-arrow">→</span>
                        </button>
                        <button class="payment-method" data-action="pay" data-method="Cash on Delivery">
                            <span class="payment-icon">💰</span>
                            <span class="payment-name">Cash on Delivery</span>
                            <span class="payment-arrow">→</span>
                        </button>
                        <button class="payment-method" data-action="pay" data-method="Bank Transfer">
                            <span class="payment-icon">🏦</span>
                            <span class="payment-name">Bank Transfer</span>
                            <span class="payment-arrow">→</span>
                        </button>
                    </div>
                    <button class="modal-cancel" data-action="cancel-payment">Cancel</button>
                </div>
            </div>
        `
  }

  proceedToPayment() {
    const fullName = document.getElementById("fullName").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const postalCode = document.getElementById("postalCode").value

    if (!fullName || !email || !phone || !address || !city || !postalCode) {
      alert("Please fill all fields")
      return
    }

    document.getElementById("paymentModal").classList.add("active")
  }

  processPayment(method) {
    alert(
      `Processing payment via ${method}...\n\nOrder ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}\n\nThank you for your order!`,
    )
    this.cart = []
    this.renderPage("home")
  }

  renderDashboard() {
    return `
            <div style="min-height: 100vh; background-color: #020617; padding-top: 96px; padding-bottom: 80px;">
                <div class="container">
                    <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 48px;">Order Tracking</h1>
                    <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 32px;">
                        <p style="color: #94a3b8; text-align: center; font-size: 16px;">Use the order tracking form in the home page to check your device status.</p>
                    </div>
                </div>
            </div>
        `
  }

  renderShopLocation() {
    return `
      <div style="min-height: 100vh; background-color: #020617; padding-top: 96px; padding-bottom: 80px;">
        <div class="container">
          <div style="margin-bottom: 48px;">
            <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 8px;">Visit Our Shop</h1>
            <p style="color: #94a3b8; font-size: 18px;">MobileFix Pro Service Center - Ramapuram, Tamil Nadu</p>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
            <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; overflow: hidden; height: 600px; position: relative; cursor: pointer;" onclick="window.open('https://www.google.com/maps/search/12.467955,79.758007', '_blank')">
              <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1332.6836960168596!2d79.7577830285442!3d12.468113512373563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3a5319fc59689b47%3A0x9c923c48fdc1fb6b!2sMelmaruvathur!3m2!1d12.4268234!2d79.82995919999999!4m5!1s0x3a531020aa862667%3A0xe25d880e8f98bf09!2sVandavasi%20Rd%2C%20Ramapuram%2C%20Tamil%20Nadu%20603201!3m2!1d12.4451387!2d79.81148309999999!5e1!3m2!1sen!2sin!4v1762845054152!5m2!1sen!2sin" width="100%" height="100%" style="border:0; pointer-events: none;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div>
              <div style="background: linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(239, 68, 68, 0.2)); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 12px; padding: 32px; margin-bottom: 24px;">
                <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">Contact Information</h2>
                
                <div style="margin-bottom: 24px;">
                  <div style="color: #fb923c; font-weight: 600; margin-bottom: 8px;">📍 Address</div>
                  <p style="color: #cbd5e1; line-height: 1.6;">Melmaruvathur, Vandavasi Rd, Ramapuram, Tamil Nadu 603201, India</p>
                </div>

                <div style="margin-bottom: 24px;">
                  <div style="color: #fb923c; font-weight: 600; margin-bottom: 8px;">📞 Phone</div>
                  <a href="tel:+919876543210" style="color: #22d3ee; text-decoration: none; font-weight: 500;">+91 98765 43210</a>
                </div>

                <div style="margin-bottom: 24px;">
                  <div style="color: #fb923c; font-weight: 600; margin-bottom: 8px;">✉️ Email</div>
                  <a href="mailto:info@mobilefixpro.com" style="color: #22d3ee; text-decoration: none; font-weight: 500;">info@mobilefixpro.com</a>
                </div>

                <div style="margin-bottom: 24px;">
                  <div style="color: #fb923c; font-weight: 600; margin-bottom: 8px;">🕐 Working Hours</div>
                  <p style="color: #cbd5e1; margin: 4px 0;">Monday - Sunday: 9:00 AM - 10:00 PM</p>
                  <p style="color: #cbd5e1; margin: 4px 0;">Holidays: 10:00 AM - 8:00 PM</p>
                  <p style="color: #4ade80; margin: 8px 0; font-weight: 600;">24/7 Emergency Service Available</p>
                </div>
              </div>

              <div style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 24px;">
                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Why Visit Us?</h3>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22d3ee; font-weight: 700;">✓</span> <span style="font-size: 14px;">Expert technicians</span></li>
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22d3ee; font-weight: 700;">✓</span> <span style="font-size: 14px;">Genuine parts only</span></li>
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22d3ee; font-weight: 700;">✓</span> <span style="font-size: 14px;">Quick repairs</span></li>
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22d3ee; font-weight: 700;">✓</span> <span style="font-size: 14px;">Free diagnostics</span></li>
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22d3ee; font-weight: 700;">✓</span> <span style="font-size: 14px;">Warranty on repairs</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderFooter() {
    return `
            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#" data-page="home">Home</a></li>
                            <li><a href="#" data-page="products">Products</a></li>
                            <li><a href="#" data-page="dashboard">Track Order</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#">Device Repair</a></li>
                            <li><a href="#">Parts & Accessories</a></li>
                            <li><a href="#">Technical Support</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Contact</h4>
                        <ul>
                            <li><a href="mailto:info@mobilefixpro.com">info@mobilefixpro.com</a></li>
                            <li><a href="tel:+919876543210">+91 98765 43210</a></li>
                            <li>Available 24/7</li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Follow Us</h4>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Twitter</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 MobileFix Pro. All rights reserved. | Powered by Advanced Mobile Solutions</p>
                </div>
            </footer>
        `
  }
}

// Initialize app
const app = new MobileFixApp()
