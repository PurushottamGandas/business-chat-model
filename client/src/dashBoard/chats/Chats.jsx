import React, { useState } from "react";
import axios from "axios"; // Ensure you have axios installed for API requests
import "./chats.scss";

const Chats = () => {
    const [contacts, setContacts] = useState([{ name: "John Doe", phone: "+918123456789" }]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Fetch messages when a contact is selected
    const fetchMessages = async (contactPhone) => {
        try {
            // Add headers to avoid caching
            const response = await axios.get(`http://localhost:3000/messages/${contactPhone}`, {
                headers: {
                    "Cache-Control": "no-cache", // Prevent caching
                    "Pragma": "no-cache",         // Prevent caching
                    "Expires": "0"                // Prevent caching
                }
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    // Select a contact & load messages
    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        fetchMessages(contact.phone); // Fetch messages when contact is selected
    };

    // Send a message
    const sendMessage = async () => {
        if (!newMessage.trim()) return; // Don't send empty messages

        try {
            // Send message to the backend
            await axios.post("http://localhost:3000/send-whatsapp", {
                to: selectedContact.phone,
                message: newMessage,
            });

            // Add message to chat (client-side)
            setMessages([...messages, { sender: "customer", text: newMessage }]);
            setNewMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    // Add new contact
    const addContact = () => {
        const name = prompt("Enter Contact Name:");
        const phone = prompt("Enter WhatsApp Number (with country code):");
        if (name && phone) setContacts([...contacts, { name, phone }]);
    };

    return (
        <div className="dashboard">
            {/* Contact List */}
            <div className="contact-list">
                <button onClick={addContact} className="add-contact">+</button>
                {contacts.map((contact, index) => (
                    <div
                        key={index}
                        className="contact-item"
                        onClick={() => handleSelectContact(contact)}
                    >
                        {contact.name}
                    </div>
                ))}
            </div>

            {/* Chat Window */}
            <div className="contact-details">
                {selectedContact ? (
                    <div>
                        <h3>Chat with {selectedContact.name}</h3>
                        <div className="chat-box">
                            {messages?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={msg?.sender === "agent" ? "agent-msg" : "customer-msg"}
                                >
                                    {msg?.text}
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                ) : (
                    <div className="doodle">Select a contact to start chatting</div>
                )}
            </div>
        </div>
    );
};

export default Chats;
