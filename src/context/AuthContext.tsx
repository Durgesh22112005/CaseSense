"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole =
  | "PGRC Officer"
  | "RB Officer"
  | "Regional Officer"
  | "Coordination Officer"
  | "Admin";

interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  bureau: string;
}

const ROLE_PROFILES: Record<UserRole, UserProfile> = {
  "PGRC Officer": {
    name: "Dr. Sunita Deshmukh",
    email: "sunita.deshmukh@aicte-india.org",
    role: "PGRC Officer",
    designation: "Assistant Director",
    bureau: "Public Grievance Redressal Cell (PGRC)",
  },
  "RB Officer": {
    name: "Shri R. K. Srivastava",
    email: "rk.srivastava@aicte-india.org",
    role: "RB Officer",
    designation: "Senior Hearing Officer",
    bureau: "Regulation Bureau (RB)",
  },
  "Regional Officer": {
    name: "Dr. Alok Verma",
    email: "alok.verma@aicte-india.org",
    role: "Regional Officer",
    designation: "Regional Officer (WRO)",
    bureau: "Western Regional Office, Mumbai",
  },
  "Coordination Officer": {
    name: "Smt. Jayashree Ramanathan",
    email: "j.ramanathan@aicte-india.org",
    role: "Coordination Officer",
    designation: "Deputy Director (Inter-Bureau Coordination)",
    bureau: "Coordination Cell, AICTE HQ",
  },
  Admin: {
    name: "Prof. (Dr.) Rajive Kumar",
    email: "member.secretary@aicte-india.org",
    role: "Admin",
    designation: "Member Secretary & Competent Authority",
    bureau: "Office of the Member Secretary, AICTE",
  },
};

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: ROLE_PROFILES["Coordination Officer"],
  role: "Coordination Officer",
  login: () => {},
  logout: () => {},
  switchRole: () => {},
  isAuthenticated: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("Coordination Officer");
  const [user, setUser] = useState<UserProfile | null>(ROLE_PROFILES["Coordination Officer"]);

  useEffect(() => {
    const savedRole = localStorage.getItem("aicte_active_role") as UserRole;
    if (savedRole && ROLE_PROFILES[savedRole]) {
      setRole(savedRole);
      setUser(ROLE_PROFILES[savedRole]);
    }
  }, []);

  const login = (email: string, selectedRole: UserRole) => {
    const profile = {
      ...ROLE_PROFILES[selectedRole],
      email: email || ROLE_PROFILES[selectedRole].email,
    };
    setRole(selectedRole);
    setUser(profile);
    localStorage.setItem("aicte_active_role", selectedRole);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(ROLE_PROFILES[newRole]);
    localStorage.setItem("aicte_active_role", newRole);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aicte_active_role");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
