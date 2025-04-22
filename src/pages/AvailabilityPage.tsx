
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import Modal from "@/components/ui/Modal";

const slotGroups = [
  {
    name: "Morning Availability",
    slots: [
      { id: "1", time: "9:00 AM - 10:00 AM" },
      { id: "2", time: "10:00 AM - 11:00 AM" },
      { id: "3", time: "11:00 AM - 12:00 PM" },
    ],
  },
  {
    name: "Afternoon Availability",
    slots: [
      { id: "4", time: "1:00 PM - 2:00 PM" },
      { id: "5", time: "2:00 PM - 3:00 PM" },
      { id: "6", time: "3:00 PM - 4:00 PM" },
      { id: "7", time: "4:00 PM - 5:00 PM" },
    ],
  },
  {
    name: "Evening Availability",
    slots: [
      { id: "8", time: "6:00 PM - 7:00 PM" },
      { id: "9", time: "7:00 PM - 8:00 PM" },
    ],
  },
];

const groupColors = ["green", "blue", "purple"];

export interface SlotEditModalProps {
  open: boolean;
  onClose: () => void;
  slotTime: string;
  selected: boolean;
  toggle: () => void;
}

const SlotEditModal: React.FC<SlotEditModalProps> = ({ open, onClose, slotTime, selected, toggle }) => (
  <Modal open={open} onClose={onClose} title="Edit Slot Availability">
    <div className="flex flex-col gap-4 items-center">
      <div className="font-medium text-center">{slotTime}</div>
      <div>
        <Button variant={selected ? "default" : "outline"} className="mr-2" onClick={toggle}>
          {selected ? "Mark Unavailable" : "Mark Available"}
        </Button>
      </div>
    </div>
  </Modal>
);

const AvailabilityPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "mentor";
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([new Date()]);
  // State structure: { [date]: { [slotId]: true } }
  const [slotsState, setSlotsState] = React.useState<{ [date: string]: { [slotId: string]: boolean } }>({});
  const [editModal, setEditModal] = React.useState<{ open: boolean; slotId: string; slotTime: string; groupIndex: number } | null>(null);
  const activeDate = selectedDates[0];

  // Initialize slots availability if new date picked
  React.useEffect(() => {
    selectedDates.forEach(date => {
      const key = date.toDateString();
      if (!slotsState[key]) {
        setSlotsState(s => ({
          ...s,
          [key]: slotGroups.reduce((prev, group) => ({
            ...prev,
            ...Object.fromEntries(group.slots.map(slot => [slot.id, true]))
          }), {}),
        }));
      }
    });
  }, [selectedDates]);

  function handleSlotEdit(slotId: string, slotTime: string, groupIndex: number) {
    setEditModal({ open: true, slotId, slotTime, groupIndex });
  }

  function handleToggleSlot(slotId: string) {
    if (!activeDate) return;
    const dateKey = activeDate.toDateString();
    setSlotsState(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [slotId]: !prev[dateKey][slotId],
      },
    }));
    setEditModal(null);
  }

  function onSave() {
    alert("Availability saved!");
  }

  return (
    <DashboardLayout
      title="Availability"
      subtitle="Set your mentoring schedule and manage your availability"
      userRole={userRole}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar - now allows multiple selection */}
        <Card className="col-span-1 bg-white dark:bg-gray-900 transition-all">
          <CardHeader>
            <CardTitle>Select Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates as any}
              className="rounded-md border bg-white dark:bg-gray-900 pointer-events-auto"
              classNames={{ months: "pointer-events-auto" }}
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mr-2"></div>
                <span className="text-sm">Unavailable</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Slots by group */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {slotGroups.map((group, groupIdx) => (
            <Card key={groupIdx} className="bg-white dark:bg-gray-900 transition-all">
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.slots.map(slot => {
                  const available = slotsState[activeDate?.toDateString() || ""]?.[slot.id] ?? true;
                  return (
                    <div
                      key={slot.id}
                      className={`border rounded-md p-3 transition-colors ${
                        available
                          ? "border-green-500 bg-green-50 dark:bg-green-800/20"
                          : "border-gray-400 bg-gray-100 dark:bg-gray-800/70"
                      }`}
                    >
                      <p className="font-medium">{slot.time}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={available ? "default" : "outline"}>
                          {available ? "Available" : "Unavailable"}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleSlotEdit(slot.id, slot.time, groupIdx)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">Cancel Changes</Button>
            <Button onClick={onSave}>Save Availability</Button>
          </div>
        </div>
      </div>
      {editModal && (
        <SlotEditModal
          open={editModal.open}
          onClose={() => setEditModal(null)}
          slotTime={editModal.slotTime}
          selected={slotsState[activeDate?.toDateString() || ""]?.[editModal.slotId]}
          toggle={() => handleToggleSlot(editModal.slotId)}
        />
      )}
    </DashboardLayout>
  );
};

export default AvailabilityPage;
