"use client";
import { useState } from "react";

function TabContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function Tab({
  children,
  index,
  setActiveTab,
  activeTab,
}: {
  children: React.ReactNode;
  index: number;
  setActiveTab: (index: number) => void;
  activeTab: number;
}) {
  return (
    <div
      className={`flex flex-col p-2 rounded-md cursor-pointer ${
        activeTab === index ? "bg-primary-500" : ""
      }`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </div>
  );
}

export default function Tabs({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            index={index}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </div>
  );
}
