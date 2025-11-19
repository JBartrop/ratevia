import React, { useState } from "react";
import Card from "../../components/ui/card";
import Modal from "../../components/ui/modal";
import { FaBoxOpen } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatTime, localTime } from "../../utils";

interface NotificationProps {
  id:string;
  title:string;
  type:string;
  description:string;
  createdAt:string;
  duration?:string;
  startTime?:string;
  endTime?:string;
  priority :string;
  scheduledTime?:string;
  individual:string[];
};

const notificationsdata: NotificationProps[] = [
  {
    id: "1",
    title: "Team Standup Meeting",
    type: "meeting",
    description: "Daily sync-up with the dev team to review progress and blockers.",
    createdAt: "2025-10-30T08:00:00Z",
    duration: "30m",
    startTime: "2025-10-30T09:00:00Z",
    endTime: "2025-10-30T09:30:00Z",
    scheduledTime: "2025-10-30T09:00:00Z",
    priority: "high",
    individual: ["alice", "bob", "charlie"]
  },
  {
    id: "2",
    title: "Deploy New Release",
    type: "deployment",
    description: "Push v2.3.1 to production after final QA approval.",
    createdAt: "2025-10-29T18:00:00Z",
    duration: "1h",
    startTime: "2025-10-30T11:00:00Z",
    endTime: "2025-10-30T12:00:00Z",
    scheduledTime: "2025-10-30T11:00:00Z",
    priority: "critical",
    individual: ["david", "ella"]
  },
  {
    id: "3",
    title: "Database Backup",
    type: "maintenance",
    description: "Weekly automated backup of all production databases.",
    createdAt: "2025-10-28T22:00:00Z",
    duration: "2h",
    scheduledTime: "2025-11-01T02:00:00Z",
    priority: "medium",
    individual: ["system-admin"]
  },
  {
    id: "4",
    title: "Design Review Session",
    type: "meeting",
    description: "Review new UI concepts with design and product teams.",
    createdAt: "2025-10-30T07:00:00Z",
    duration: "1h",
    startTime: "2025-10-31T14:00:00Z",
    endTime: "2025-10-31T15:00:00Z",
    scheduledTime: "2025-10-31T14:00:00Z",
    priority: "high",
    individual: ["fiona", "george", "harry"]
  },
  {
    id: "5",
    title: "Marketing Campaign Kickoff",
    type: "event",
    description: "Launch strategy meeting for Q4 campaign.",
    createdAt: "2025-10-25T12:00:00Z",
    duration: "90m",
    startTime: "2025-11-02T10:30:00Z",
    endTime: "2025-11-02T12:00:00Z",
    scheduledTime: "2025-11-02T10:30:00Z",
    priority: "medium",
    individual: ["isabella", "jack"]
  },
  {
    id: "6",
    title: "Code Review: API Integration",
    type: "task",
    description: "Review the integration of the new authentication API.",
    createdAt: "2025-10-29T09:00:00Z",
    scheduledTime: "2025-10-30T15:00:00Z",
    priority: "high",
    individual: ["kevin"]
  },
  {
    id: "7",
    title: "Update Project Roadmap",
    type: "reminder",
    description: "Update Q1 roadmap with the latest milestones.",
    createdAt: "2025-10-28T10:00:00Z",
    scheduledTime: "2025-11-01T09:00:00Z",
    priority: "low",
    individual: ["lucas"]
  },
  {
    id: "8",
    title: "Client Feedback Review",
    type: "task",
    description: "Analyze recent client survey responses and summarize key points.",
    createdAt: "2025-10-27T16:00:00Z",
    scheduledTime: "2025-10-31T13:00:00Z",
    priority: "medium",
    individual: ["mia", "noah"]
  },
  {
    id: "9",
    title: "System Performance Audit",
    type: "maintenance",
    description: "Run system diagnostics and performance checks.",
    createdAt: "2025-10-30T06:00:00Z",
    duration: "2h",
    startTime: "2025-11-03T00:00:00Z",
    endTime: "2025-11-03T02:00:00Z",
    scheduledTime: "2025-11-03T00:00:00Z",
    priority: "high",
    individual: ["system-admin", "david"]
  },
  {
    id: "10",
    title: "Prepare Monthly Report",
    type: "task",
    description: "Compile performance metrics for October.",
    createdAt: "2025-10-29T11:00:00Z",
    scheduledTime: "2025-11-01T17:00:00Z",
    priority: "medium",
    individual: ["olivia"]
  },
  {
    id: "11",
    title: "Security Patch Update",
    type: "maintenance",
    description: "Apply latest OS and library security patches.",
    createdAt: "2025-10-30T04:00:00Z",
    duration: "1h",
    scheduledTime: "2025-10-31T03:00:00Z",
    priority: "critical",
    individual: ["patrick"]
  },
  {
    id: "12",
    title: "Product Demo Preparation",
    type: "task",
    description: "Prepare demo for new clients showcasing upcoming features.",
    createdAt: "2025-10-26T14:00:00Z",
    scheduledTime: "2025-11-04T10:00:00Z",
    priority: "high",
    individual: ["quincy", "rachel"]
  },
  {
    id: "13",
    title: "Server Migration Planning",
    type: "planning",
    description: "Draft migration plan for new server infrastructure.",
    createdAt: "2025-10-30T08:30:00Z",
    scheduledTime: "2025-11-05T08:00:00Z",
    priority: "medium",
    individual: ["sam", "tina"]
  },
  {
    id: "14",
    title: "QA Testing Sprint",
    type: "task",
    description: "Complete test cases for new mobile features.",
    createdAt: "2025-10-28T10:30:00Z",
    duration: "3h",
    startTime: "2025-11-01T12:00:00Z",
    endTime: "2025-11-01T15:00:00Z",
    scheduledTime: "2025-11-01T12:00:00Z",
    priority: "high",
    individual: ["uma", "victor"]
  },
  {
    id: "15",
    title: "Data Analytics Training",
    type: "training",
    description: "Internal workshop on advanced analytics tools.",
    createdAt: "2025-10-29T09:30:00Z",
    duration: "2h",
    startTime: "2025-11-03T14:00:00Z",
    endTime: "2025-11-03T16:00:00Z",
    scheduledTime: "2025-11-03T14:00:00Z",
    priority: "low",
    individual: ["wendy", "xavier"]
  },
  {
    id: "16",
    title: "Invoice Approval",
    type: "reminder",
    description: "Approve pending vendor invoices for October.",
    createdAt: "2025-10-28T11:00:00Z",
    scheduledTime: "2025-10-31T17:00:00Z",
    priority: "medium",
    individual: ["yara"]
  },
  {
    id: "17",
    title: "Backend Optimization",
    type: "task",
    description: "Refactor backend logic to reduce response times by 20%.",
    createdAt: "2025-10-30T05:30:00Z",
    scheduledTime: "2025-11-06T09:00:00Z",
    priority: "high",
    individual: ["zane"]
  },
  {
    id: "18",
    title: "Content Strategy Session",
    type: "meeting",
    description: "Plan content roadmap for social media and blogs.",
    createdAt: "2025-10-25T10:00:00Z",
    duration: "1h",
    startTime: "2025-11-02T15:00:00Z",
    endTime: "2025-11-02T16:00:00Z",
    scheduledTime: "2025-11-02T15:00:00Z",
    priority: "low",
    individual: ["abby", "ben"]
  },
  {
    id: "19",
    title: "Audit Preparation",
    type: "task",
    description: "Organize financial and project records for internal audit.",
    createdAt: "2025-10-29T08:00:00Z",
    scheduledTime: "2025-11-05T10:00:00Z",
    priority: "critical",
    individual: ["claire", "dan"]
  },
  {
    id: "20",
    title: "Sprint Retrospective",
    type: "meeting",
    description: "Review the last sprint and identify areas for improvement.",
    createdAt: "2025-10-30T09:00:00Z",
    duration: "45m",
    startTime: "2025-10-31T16:00:00Z",
    endTime: "2025-10-31T16:45:00Z",
    scheduledTime: "2025-10-31T16:00:00Z",
    priority: "medium",
    individual: ["team-alpha"]
  }
];



const Notifications : React.FC = () => {
    const [modalcalled , setmodalcalled] = useState<boolean>(false);
    const [selectedNotification, setSelectedNotification] = useState<NotificationProps>();
    const [notifications, setNotifications] = useState<NotificationProps[]>(notificationsdata);

    return(
        <section>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {Array.isArray(notifications) && notifications?.length > 0 ? (
            <>
            {notifications.map((notification) => (
              <Card 
                key={notification.id}
                title={notification.title}
                className="my-2"
                actions={
                <button onClick={() => {setmodalcalled(prev => !prev); setSelectedNotification(notification)} } className="px-1 py-1 rounded-md border border-[rgb(var(--muted))]/30 hover:bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                  {(() => {
                    const Icon = BsThreeDotsVertical as React.ComponentType<{ size?: number }>;
                    return <Icon size={15} />;
                })()}
                </button>
                }
              >
                <div className="flex justify-between">
                  <p className="max-[640px]:text-[12px]">{notification.description.length > 70
                      ? notification.description.slice(0, 70) + "..."
                      : notification.description}</p>
                  <p className="ml-1 max-[640px]:text-[10px] text-sm text-[rgb(var(--muted))]">{ formatTime(notification.createdAt)}</p>
                </div>
              </Card>
            ))}
            </>
              
            ) : (
              <div className="p-8 flex justify-center items-center">
                <button className="text-[rgb(var(--secondary))]" >
                {(() => {
                    const Icon = FaBoxOpen  as React.ComponentType<{ size?: number }>;
                    return <Icon size={40} />;
                })()}
                </button>
                <p className="px-1 text-xl text-[rgb(var(--muted))]">No New notifications notifications</p>
              </div>
            )}


            
            {modalcalled && selectedNotification  &&  (
              <Modal isOpen={modalcalled} onClose={() => setmodalcalled(false)} title={selectedNotification.title} description={selectedNotification.description}>
                <div className="p-2 my-1 bg-[rgb(var(--muted))]/10 rounded-md">
                <div className="flex my-1">
                  <p className="font-semibold">Priority:&nbsp;</p> 
                  <span className={`text-[rgb(var(--muted))] px-2 rounded-full 
                    ${selectedNotification.priority === "high" ? "bg-green-50 text-green-500" : 
                    selectedNotification.priority === "medium" ?  "bg-yellow-50 text-yellow-500" :"bg-red-50 text-red-500" }`}>
                      {selectedNotification.priority}
                  </span>
                </div>
                <div className="flex my-1">
                  <p className="font-semibold">Type:&nbsp;</p> 
                  <span className="text-[rgb(var(--muted))]">{selectedNotification.type}</span>
                </div>
                </div>

                <div className="p-2 my-1 bg-[rgb(var(--muted))]/10 rounded-md">
                <div className="flex my-1">
                  <p className="font-semibold">Duration:&nbsp;</p> 
                  <span className="text-[rgb(var(--muted))]">{selectedNotification.duration}</span>
                </div>
                {selectedNotification.scheduledTime && (
                  <div className="flex my-1">
                    <p className="font-semibold">Schedule:&nbsp; </p> 
                    <span className="text-[rgb(var(--muted))]">{localTime(selectedNotification.scheduledTime)}</span>
                  </div>
                )}
                {selectedNotification.startTime && (
                  <div className="flex my-1">
                    <p className="font-semibold">Start:&nbsp; </p> 
                    <span className="text-[rgb(var(--muted))]">{localTime(selectedNotification.startTime)}</span>
                  </div>
                )}
                {selectedNotification.endTime && (
                  <div className="flex my-1">
                    <p className="font-semibold">End: &nbsp; </p> 
                    <span className="text-[rgb(var(--muted))]">{localTime(selectedNotification.endTime)}</span>
                  </div>
                )}
                </div>

                <div className="p-2 my-1 bg-[rgb(var(--muted))]/10 rounded-md">
                {selectedNotification.individual && (
                  <div className="flex my-1">
                    <p className="font-semibold">People: &nbsp; </p> 
                    <span className="text-[rgb(var(--muted))]">{selectedNotification.individual.join(", ")}</span>
                  </div>
                )}
                </div>
                
                
              </Modal>)}
        </section>
    )
}

export default Notifications;