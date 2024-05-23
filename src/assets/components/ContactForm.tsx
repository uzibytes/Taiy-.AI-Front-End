import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
  updateContact,
  setContactsFromLocalStorage // Import the action
} from "../redux/contactsSlice"; // Update the path if needed
import { RootState } from "../redux/store";
import "../../public/ContactForm.css";

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("inactive");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  // Load contacts from local storage on component mount
  useEffect(() => {
    dispatch(setContactsFromLocalStorage()); // Use setContactsFromLocalStorage instead of setContacts
  }, [dispatch]);

  // Save contacts to local storage whenever contacts state changes
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      setError("All fields are required.");
      return;
    }

    if (isEditing && editId) {
      dispatch(updateContact({ id: editId, firstName, lastName, status }));
      setIsEditing(false);
      setEditId(null);
    } else {
      dispatch(addContact(firstName, lastName, status));
    }

    setFirstName("");
    setLastName("");
    setStatus("inactive");
    setShowForm(false);
    setError("");
  };

  const handleEdit = (id: string) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status);
      setIsEditing(true);
      setEditId(contact.id);
      setShowForm(true);
      setError("");
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="contact-page">
      {showForm ? (
        <div>
          <h2 className="text-2xl font-semibold pt-3 pb-5">
            {isEditing ? "Edit Contact Screen" : "Create Contact Screen"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 form-container">
            {error && <div className="error-message">{error}</div>}
            <div className="flex items-center space-x-2">
              <p className="w-32"><b>First Name:</b></p>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Please Enter First Name"
                className="block w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <p className="w-32"><b>Last Name:</b></p>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Please Enter Last Name"
                className="block w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <p className="w-24"><b>Status:</b></p>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="active"
                  checked={status === "active"}
                  onChange={() => setStatus("active")}
                  className="mr-1"
                />
                Active
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="inactive"
                  checked={status === "inactive"}
                  onChange={() => setStatus("inactive")}
                  className="mr-1"
                />
                Inactive
              </label>
            </div>

            <div className="flex justify-around items-center pt-5">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                {isEditing ? "Save Edited Contact" : "Save Contact"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            Create Contact
          </button>
          {contacts.length === 0 ? (
            <div className="no-contacts-box p-4 mb-4 border rounded text-center">
              <div>❌ No Contact Found.</div>
              <div>Please add contact from</div>
              <div>Create Contact Button</div>
            </div>
          ) : (
            <div className="contacts-grid">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="contact-card p-4 border rounded"
                >
                  <p>
                    <strong>First Name:</strong> {contact.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {contact.lastName}
                  </p>
                  <p>
                    <strong>Status:</strong> {contact.status}
                  </p>
                  <div className="pt-5 flex justify-center">
                    <button
                      onClick={() => handleEdit(contact.id)}
                      className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="px-2 py-1 text-white bg-red-500 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
