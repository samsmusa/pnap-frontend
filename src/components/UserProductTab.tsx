import React from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import LentProducts from "./LentProducts";
import BoughtProducts from "./BoughtProducts";
import SoldProducts from "./SoldProducts";
import BorrowProducts from "./BorrowProducts";

function UserProductTab() {
  return (
    <Tabs aria-label="Tabs with icons" variant="underline" className="flex justify-between">
      <Tabs.Item active title="Bought">
        <BoughtProducts/>
      </Tabs.Item>
      <Tabs.Item active title="Sold">
        <SoldProducts/>
      </Tabs.Item>
      <Tabs.Item active title="Borrowed">
        <BorrowProducts/>
      </Tabs.Item>        
      <Tabs.Item active title="Lent">
        <LentProducts/>
      </Tabs.Item>
    </Tabs>
  );
}
export default UserProductTab
