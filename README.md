# FarmersWorld

FarmersWorld is a user-friendly platform that enables farmers to manage and track applications for government schemes using their Aadhaar numbers and Farmers' Unique IDs. The platform provides a seamless experience for farmers to apply for schemes, track the status of their applications, and manage their profiles. Government officials can efficiently view, process, and manage pending applications.

## Features

- **Application Management:**

  - Farmers can easily apply for government schemes by providing their details once. Subsequent applications can be filled in just two clicks.
  - Farmers can view all their applied applications, including detailed information and current application status.
  - Application status tracking is available, including reasons for rejection provided by government officials.
  - Application status filter allows farmers to find specific applications based on their status (e.g., Pending, Approved, Rejected). The status filter is tracked for easier navigation between the current and previous pages with the applied filters.
  - Prevention of duplicate applications ensures farmers can only submit one application per scheme.

- **Scheme Search:**

  - Farmers can search for available schemes based on filters to quickly find the most relevant options.

- **Profile Management:**

  - Farmers can change their profile photo and view the number of applications they have submitted.
  - The profile page displays the number of applications based on their status (e.g., Pending, Approved, Rejected).
  - Farmers can view and edit their details from their profile page, enabling easy application to schemes.

- **Authentication & Authorization:**

  - **_Passport.js_** is used for authentication, ensuring secure login and user management.
  - Role-based authorization security has been set up to restrict access based on user roles (e.g., Farmer, Admin). Only authorized users can access specific functionalities and data.

- **Cloud Storage:**

  - Integration with Cloudinary for storing profile photos and other images, providing easier access and management.

- **Admin Features:**
  - Government officials can view and process pending applications efficiently, with the ability to provide rejection reasons directly to farmers.

## Technologies Used

- **Frontend:** React.js, TypeScript, Material UI, React-Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary
- **Architecture:** MVC (Model-View-Controller)

## Demo

- **Visit The Live Website At:** https://farmersworld.onrender.com
- **Video Demo:** [Watch Demo](https://youtu.be/ZEScscVvZ4w)

## Installation

1.  ### Clone the repository:

    `git clone https://github.com/Adhish1612Acharya/FarmersWorld.git`

2.  ### Open Two Terminals :

    - **First Terminal :**
      `cd frontend`

      `npm run dev`

    - **Second Terminal :**
      `cd backend`

      `npm start`

3.  ### H5 .env file :
        -Create an cloudinary account and add the required credentials for storing files in the cloudinary.
        -Add the MongoDB database URL
