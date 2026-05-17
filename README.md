# 🚗 RentalCar

A modern car rental web application built with Next.js and TypeScript. Users can browse available cars, apply filters, view detailed information, and send booking requests.

---

## 🌐 Live Demo

[View deployed app](https://rental-car-nu-brown.vercel.app/)

---

## ✨ Features

- Responsive modern UI
- Home page with hero section
- Car catalog with filtering
- Filter cars by:
  - brand
  - price per hour
  - mileage range
- Load More pagination
- Detailed car information page
- Booking form with validation
- Success and error modal windows
- Loading states
- Custom 404 page
- API integration
- Fully typed with TypeScript

---

## 🛠 Tech Stack

- Next.js
- TypeScript
- React Query (TanStack Query)
- Axios
- Formik
- React Datepicker
- CSS Modules
- clsx

---

## 📁 Project Structure

```bash
app/
├── @modal/
│   └── default.tsx
│
├── catalog/
│   ├── [carId]/
│   │   ├── page.module.css
│   │   └── page.tsx
│   │
│   ├── CatalogClient.tsx
│   ├── page.module.css
│   └── page.tsx
│
├── error.tsx
├── globals.css
├── layout.tsx
├── loading.module.css
├── loading.tsx
├── not-found.tsx
├── page.module.css
└── page.tsx


components/
├── CarCard/
│   ├── CarCard.module.css
│   └── CarCard.tsx
│
├── CarList/
│   ├── CarList.module.css
│   └── CarList.tsx
│
├── CatalogFilters/
│   ├── CatalogFilters.module.css
│   └── CatalogFilters.tsx
│
├── Header/
│   ├── Header.module.css
│   └── Header.tsx
│
├── Modal/
│   ├── Modal.module.css
│   └── Modal.tsx
│
├── RentalForm/
│   ├── RentalForm.module.css
│   └── RentalForm.tsx
│
└── TanstackProvider/
    └── TanstackProvider.tsx


lib/
└── api/
    ├── api.ts
    └── generatePrices.ts


public/
├── arrow-down.png
├── arrow-up.png
├── error.jpg
├── hero.jpg
├── icons.svg
└── not-found.jpg


types/
└── types.ts


Root files:
├── .gitignore
├── .prettier.json
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── declaration.d.ts
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Epoeitos/rental-car.git
```

Go to the project folder:

```bash
cd rental-car
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔌 API

Base API URL:

```bash
https://car-rental-api.goit.global
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /cars | Get cars list |
| GET | /brands | Get available brands |
| GET | /cars/:id | Get car details |
| POST | /cars/:id/booking-requests | Send booking request |

---

## 👤 Author

**Oleksandr Furman**

GitHub:  
https://github.com/Epoeitos