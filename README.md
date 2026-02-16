# MERN Habit Heatmap Tracker

## Overview

Habitmap is a habit tracker application built using **Express.js**, **MongoDB**, and **React**.  
It helps users track daily habits, monitor consistency, and analyze progress over time.

---

## Tech Stack

### Frontend
- React

### Backend


- Node.js
- Express.js
- 

### Database
- MongoDB
- Mongoose

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/Harshita-Verma09/Full_Stack_MERN_2_Habit_Heatmap_Tracker.git
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## Setup Environment Variables

### Setup
Copy `.env.example` to `.env` inside the backend directory

Add your MongoDB URI and any required secrets

```bash
cp .env.example .env
```

### Security Note
- `.env` files are ignored using `.gitignore`
- Sensitive information is never pushed to GitHub

## Running the Application

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd ../frontend
npm run dev
```

### Open in Browser
```
http://localhost:3000
```

## Usage

### Features
- User authentication
- Create and track habits
- Daily habit logging
- View progress and consistency

## MongoDB Schema Design

### User Schema
- username
- email
- password

### Habit Schema
- name
- createdAt

### HabitLog Schema
- name
- date
- taskCompleted
- totalTask
- status

## Difficulty 1: Why date is Stored as Date Type Instead of String

### Problem
Initially, there was confusion about storing the date field as a string or as a Date type in MongoDB.

### Solution
The date field is stored as a Date type because:

- MongoDB supports powerful date-based queries
- Sorting and filtering by date becomes easier
- Aggregation pipelines work efficiently with Date
- Avoids manual date parsing and formatting issues
- Helps in future analytics (weekly/monthly reports)
- Using Date improves performance, scalability, and data accuracy.

## Controllers Logic

### Habit Status Calculation
```js
let status = "missed";
if (taskCompleted === totalTask) status = "completed";
else if (taskCompleted > 0) status = "partial";
```

## Difficulty 2: Why { upsert: true, new: true } Is Used

### Controller Code
```js
const habit = await HabitLog.findOneAndUpdate(
    { name, date: new Date(date) },
    { taskCompleted, totalTask, status },
    { upsert: true, new: true }
);
```

### Solution
**upsert: true**
- Updates the document if it exists
- Creates a new document if it does not exist
- Ensures only one habit log per day
- Prevents duplicate entries

**new: true**
- Returns the updated document
- Helps frontend get the latest data instantly
- Avoids extra database queries

## UI Creation Guidelines

### Best Practices
- Responsive design using media queries
- State management with Context API or Redux
- Form validation using Formik or Yup
- Data visualization with Chart.js or D3.js
- Secure authentication using JWT

## Best Practices Followed
- `.env` files are excluded from GitHub
- `.env.example` provided for setup reference
- Clean project structure
- Secure API design









