// app/admin/manage-contact/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Mail, Trash2, CheckCircle, Circle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ManageContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contacts");
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchContacts();
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchContacts();
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === "all") return true;
    return contact.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Contacts List */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-3">Contact Messages</h2>
          <div className="flex gap-2">
            <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded text-sm ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
              All ({contacts.length})
            </button>
            <button onClick={() => setFilter("unread")} className={`px-3 py-1 rounded text-sm ${filter === "unread" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
              Unread ({contacts.filter((c) => c.status === "unread").length})
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Mail size={48} className="mb-2" />
              <p>No messages</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  if (contact.status === "unread") {
                    updateStatus(contact.id, "read");
                  }
                }}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact?.id === contact.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""} ${contact.status === "unread" ? "bg-yellow-50" : ""}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{contact.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contact.status)}`}>{contact.status}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                {contact.subject && <p className="text-sm font-medium text-gray-800 mb-1">{contact.subject}</p>}
                <p className="text-xs text-gray-500">{new Date(contact.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        {selectedContact ? (
          <>
            <div className="p-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{selectedContact.subject || "No Subject"}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-medium">{selectedContact.name}</span>
                    <span>•</span>
                    <span>{selectedContact.email}</span>
                    <span>•</span>
                    <span>{new Date(selectedContact.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedContact.status)}`}>{selectedContact.status}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {selectedContact.status !== "read" && (
                  <button onClick={() => updateStatus(selectedContact.id, "read")} className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    <CheckCircle size={18} />
                    Mark as Read
                  </button>
                )}
                {selectedContact.status !== "replied" && (
                  <button onClick={() => updateStatus(selectedContact.id, "replied")} className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                    <Mail size={18} />
                    Mark as Replied
                  </button>
                )}
                {selectedContact.status !== "unread" && (
                  <button onClick={() => updateStatus(selectedContact.id, "unread")} className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors">
                    <Circle size={18} />
                    Mark as Unread
                  </button>
                )}
                <button onClick={() => handleDelete(selectedContact.id)} className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors ml-auto">
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-800 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              {/* Reply Section */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Reply</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Use your email client to reply to:{" "}
                  <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                    {selectedContact.email}
                  </a>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <Mail size={64} className="mb-4 opacity-20" />
            <p className="text-lg">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
