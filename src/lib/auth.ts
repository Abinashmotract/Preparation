"use client";

export interface User {
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEY = "interview_prep_user";
const BOOKMARKS_KEY = "interview_prep_bookmarks";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function login(email: string, password: string): User | null {
  // Simple mock authentication - in production, use a real backend
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    return userWithoutPassword;
  }
  return null;
}

export function signup(email: string, password: string, name: string): User | null {
  // Simple mock signup - in production, use a real backend
  const users = getStoredUsers();
  if (users.find((u) => u.email === email)) {
    return null; // User already exists
  }
  const newUser = { id: Date.now().toString(), email, password, name };
  users.push(newUser);
  localStorage.setItem("interview_prep_users", JSON.stringify(users));
  const { password: _, ...userWithoutPassword } = newUser;
  setCurrentUser(userWithoutPassword);
  return userWithoutPassword;
}

function getStoredUsers(): Array<User & { password: string }> {
  if (typeof window === "undefined") return [];
  const usersStr = localStorage.getItem("interview_prep_users");
  return usersStr ? JSON.parse(usersStr) : [];
}

export function getBookmarks(): number[] {
  if (typeof window === "undefined") return [];
  const bookmarksStr = localStorage.getItem(BOOKMARKS_KEY);
  return bookmarksStr ? JSON.parse(bookmarksStr) : [];
}

export function toggleBookmark(questionId: number): void {
  if (typeof window === "undefined") return;
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(questionId);
  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(questionId);
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(questionId: number): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.includes(questionId);
}

