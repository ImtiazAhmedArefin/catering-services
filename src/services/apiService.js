import axios from 'axios';

const API_URL = 'http://localhost/catering-api/';

// Categories API
export const categoryService = {
  getAll: () => axios.get(`${API_URL}categories.php`),
  getById: (id) => axios.get(`${API_URL}categories.php?id=${id}`),
  create: (data) => axios.post(`${API_URL}categories.php`, data),
  update: (id, data) => axios.put(`${API_URL}categories.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}categories.php?id=${id}`)
};

// Menu Items API
export const menuItemService = {
  getAll: () => axios.get(`${API_URL}menu_items.php`),
  getById: (id) => axios.get(`${API_URL}menu_items.php?id=${id}`),
  getByCategory: (categoryId) => axios.get(`${API_URL}menu_items.php?category_id=${categoryId}`),
  create: (data) => axios.post(`${API_URL}menu_items.php`, data),
  update: (id, data) => axios.put(`${API_URL}menu_items.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}menu_items.php?id=${id}`)
};

// Users API
export const userService = {
  getAll: () => axios.get(`${API_URL}users.php`),
  getById: (id) => axios.get(`${API_URL}users.php?id=${id}`),
  create: (data) => axios.post(`${API_URL}users.php`, data),
  update: (id, data) => axios.put(`${API_URL}users.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}users.php?id=${id}`)
};

// Bookings API
export const bookingService = {
  getAll: () => axios.get(`${API_URL}bookings.php`),
  getById: (id) => axios.get(`${API_URL}bookings.php?id=${id}`),
  getByUser: (userId) => axios.get(`${API_URL}bookings.php?user_id=${userId}`),
  create: (data) => axios.post(`${API_URL}bookings.php`, data),
  update: (id, data) => axios.put(`${API_URL}bookings.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}bookings.php?id=${id}`)
};

// Cart API
export const cartService = {
  getByUser: (userId) => axios.get(`${API_URL}cart.php?user_id=${userId}`),
  addItem: (data) => axios.post(`${API_URL}cart.php`, data),
  updateItem: (id, data) => axios.put(`${API_URL}cart.php?id=${id}`, data),
  removeItem: (id, userId) => axios.delete(`${API_URL}cart.php?id=${id}&user_id=${userId}`),
  clearCart: (userId) => axios.delete(`${API_URL}cart.php?user_id=${userId}`)
};

// Testimonials API
export const testimonialService = {
  getAll: () => axios.get(`${API_URL}testimonials.php`),
  getById: (id) => axios.get(`${API_URL}testimonials.php?id=${id}`),
  create: (data) => axios.post(`${API_URL}testimonials.php`, data),
  update: (id, data) => axios.put(`${API_URL}testimonials.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}testimonials.php?id=${id}`)
};

// Services API
export const cateringService = {
  getAll: () => axios.get(`${API_URL}services.php`),
  getById: (id) => axios.get(`${API_URL}services.php?id=${id}`),
  create: (data) => axios.post(`${API_URL}services.php`, data),
  update: (id, data) => axios.put(`${API_URL}services.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}services.php?id=${id}`)
};

// Events API
export const eventService = {
  getAll: () => axios.get(`${API_URL}events.php`),
  getById: (id) => axios.get(`${API_URL}events.php?id=${id}`),
  create: (data) => axios.post(`${API_URL}events.php`, data),
  update: (id, data) => axios.put(`${API_URL}events.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}events.php?id=${id}`)
};

// Teams API
export const teamService = {
  getAll: () => axios.get(`${API_URL}teams.php`),
  getById: (id) => axios.get(`${API_URL}teams.php?id=${id}`),
  create: (data) => axios.post(`${API_URL}teams.php`, data),
  update: (id, data) => axios.put(`${API_URL}teams.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}teams.php?id=${id}`)
};

// Blog Posts API
export const blogService = {
  getAll: () => axios.get(`${API_URL}blog_posts.php`),
  getById: (id) => axios.get(`${API_URL}blog_posts.php?id=${id}`),
  create: (data) => axios.post(`${API_URL}blog_posts.php`, data),
  update: (id, data) => axios.put(`${API_URL}blog_posts.php?id=${id}`, data),
  delete: (id) => axios.delete(`${API_URL}blog_posts.php?id=${id}`)
};