import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserCreate } from './UserCreate'
import { UsersTable } from './UsersTable'
import { Dashboard } from './Dashboard'
import { Navbar } from './Navbar'
import './App.css'

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  interests: string[];
}

// Sample data for initial display
const sampleUsers: User[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Software Developer",
    interests: ["React", "TypeScript"]
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "UX Designer",
    interests: ["UI/UX", "Figma"]
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    role: "Project Manager",
    interests: ["Agile", "Leadership"]
  },
  {
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@example.com",
    role: "Data Scientist",
    interests: ["Python", "Machine Learning"]
  },
  {
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.b@example.com",
    role: "DevOps Engineer",
    interests: ["Docker", "Kubernetes"]
  }
];

function App() {
  const [users, setUsers] = useState<User[]>(sampleUsers);

  const handleUserCreated = (user: User) => {
    setUsers(prevUsers => [...prevUsers, user]);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard users={users} />} />
          <Route path="/create" element={<UserCreate onUserCreated={handleUserCreated} />} />
          <Route path="/users" element={<UsersTable users={users} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
