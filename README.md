# **MediCamp (Client-Side)**

MediCamp is a comprehensive MERN stack application designed to efficiently manage medical camps. The platform includes features for both organizers and participants, emphasizing seamless interaction, secure payment, and robust analytics.

---

## **Live Demo**

- **Live Site**: [MediCamp Live](https://medicamp-91966.web.app/)
- **Client Repository**: [Client-Side Code](https://github.com/Sushanto171/medicamp)
- **Server Repository**: [Server-Side Code](https://github.com/Sushanto171/medicamp-server)

---

## **Organizer Credentials**

- **Email**: info@medicamp.com
- **Password**: 123Ab@

---

## **Key Features**

### **Organizer Dashboard**

1. **Organizer Profile**: Manage personal information and camp details.
2. **Add a Camp**: Organizers can create new camps with all relevant details.
3. **Manage Camps**:
   - Update or delete camp information.
   - View real-time registrations.
4. **Manage Registered Camps**:
   - Confirm or delete participant registrations.
   - Handle conditional payments for special cases.

---

### **Participant Dashboard**

1. **Participant Profile**:
   - Manage personal details easily.
2. **Registered Camps**:
   - Access a list of registered camps with detailed information.
3. **Payment and Feedback**:
   - **Secure Payments**: Utilize Stripe for safe and seamless payment processing.
   - **Feedback System**: After payment, participants can submit feedback to improve the camp experience.
4. **Payment History**:
   - Track all payment transactions with full details.
5. **Analytics**:
   - Get insights into participation through charts and visual overviews.

---

## **Authentication and Authorization**

- **JWT Authentication**:
  - Implemented using JSON Web Tokens for securing sensitive routes.
  - Tokens are managed using Local Storage.
- **Role-Based Access Control (RBAC)**:
  - Organizers and participants have role-specific features.

---

## **Enhancements**

1. **Pagination**:

   - All tables feature pagination at the footer, displaying 10 rows per page for better usability.

2. **Search Functionality**:

   - Implemented at the top of all tables.
   - Users can search camps using keywords such as:
     - Camp Name
     - Date
     - Healthcare Professional Name

3. **Reusable Components**:
   - Built reusable components for search and pagination to ensure consistency and scalability.

---

## **Tech Stack**

- **Frontend**:

  - React.js
  - TailwindCSS
  - Material Tailwind
  - React Icons

- **State Management**:

  - React Context API
  - TanStack Query

- **Backend**:

  - Node.js
  - Express.js

- **Database**:

  - MongoDB

- **Authentication**:

  - Firebase Authentication

- **Payment Integration**:
  - Stripe

---

## **Dependencies**

```json
"dependencies": {
  "@heroicons/react": "^2.2.0",
  "@hookform/resolvers": "^3.10.0",
  "@material-tailwind/react": "^2.1.10",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "aos": "^3.0.0-beta.6",
  "axios": "^1.7.9",
  "date-fns": "^4.1.0",
  "firebase": "^11.1.0",
  "framer-motion": "^12.0.1",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-awesome-button": "^7.0.5",
  "react-datepicker": "^7.6.0",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.5.1",
  "react-icons": "^5.4.0",
  "react-router-dom": "^7.1.1",
  "react-simple-captcha": "^9.3.1",
  "recharts": "^2.15.0",
  "reconnecting-websocket": "^4.4.0",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1",
  "yup": "^1.6.1"
}
```

---

## **How to Run Locally**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Sushanto171.git
   cd medicamp
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create environment variables**:

   - Add a `.env` file with the following keys:
     - `REACT_APP_FIREBASE_API_KEY`
     - `REACT_APP_STRIPE_KEY`
     - `REACT_APP_BACKEND_URL`

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Access the app**:  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---
