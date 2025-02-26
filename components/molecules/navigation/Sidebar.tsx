"use client";

import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Settings,
  Users,
  Map,
} from "lucide-react";
import { Nav, NavItem } from "./Nav";
import { LogoutButton } from "@/components/atoms/buttons/LogoutButton";
import { useState, useEffect } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-bg-800 border-b border-bg-700 flex items-center justify-between px-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-bg-700 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-['Audiowide'] text-foreground text-center">
          FITLIT
        </h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform fixed md:sticky md:top-0 inset-y-0 left-0 z-40 md:translate-x-0 w-64 h-screen border-r border-bg-700 flex flex-col bg-bg-800`}
      >
        {/* Logo - only show on desktop */}
        <div className="hidden md:flex p-4 mb-4 items-center justify-center">
          <h1 className="text-xl font-['Audiowide'] text-foreground">FITLIT</h1>
        </div>

        {/* Mobile header spacer */}
        <div className="h-16 md:hidden"></div>

        {/* Main navigation - grows to fill available space */}
        <div className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-bg-700 scrollbar-track-bg-800 hover:scrollbar-thumb-bg-600">
          <Nav>
            {/* Main Section */}
            <NavItem href="/dashboard" onClick={closeSidebar}>
              <span>Panel główny</span> <LayoutDashboard size={20} />
            </NavItem>
            <NavItem href="/dashboard/routes" onClick={closeSidebar}>
              <span>Trasy</span> <Map size={20} />
            </NavItem>
            <NavItem href="/dashboard/addresses" onClick={closeSidebar}>
              <span>Adresy</span> <Map size={20} />
            </NavItem>
            <div className="my-2 border-t border-bg-700" />
            <NavItem href="/dashboard/users" onClick={closeSidebar}>
              <span>Użytkownicy</span> <Users size={20} />
            </NavItem>
          </Nav>
        </div>
        <div className="py-4 ">
          <NavItem href="/dashboard/settings" onClick={closeSidebar}>
            <span>Ustawienia</span> <Settings size={20} />
          </NavItem>
        </div>
        {/* Bottom section with logout button */}
        <div className="p-4 border-t border-bg-700">
          <LogoutButton className="w-full justify-center">
            <div className="flex items-center gap-2">
              <LogOut size={20} />
              Wyloguj się
            </div>
          </LogoutButton>
        </div>
      </aside>
    </>
  );
};
