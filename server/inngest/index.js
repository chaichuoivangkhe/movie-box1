import { Inngest } from "inngest";
import User from "../models/User.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-box" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("Inngest event received: clerk/user.created", event.data);
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    const created = await User.create(userData);
    console.log("User created in DB:", created);
  }
);
// Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("Inngest event received: clerk/user.deleted", event.data);
    const { id } = event.data;
    const deleted = await User.findByIdAndDelete(id);
    console.log("User deleted from DB:", deleted);
  }
);
// Inngest Function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    console.log("Inngest event received: clerk/user.updated", event.data);
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    const updated = await User.findByIdAndUpdate(id, userData, { new: true });
    console.log("User updated in DB:", updated);
  }
);
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
