import React, { useState } from "react";
import "./chats.scss";

const Chats = () => {
    const [contacts, setContacts] = useState([{ name: "John Doe", phone: "+918123456789" }]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Fetch messages every 5 seconds

    // Select a contact & load messages
    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    // Send a message
    const sendMessage = async () => {
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
                    <div key={index} className="contact-item" onClick={() => handleSelectContact(contact)}>
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
                            {messages.map((msg, index) => (
                                <div key={index} className={msg.sender === "agent" ? "agent-msg" : "customer-msg"}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
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
