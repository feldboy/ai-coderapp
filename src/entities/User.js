import { db } from "@/lib/db";

/**
 * User entity class for handling user operations
 */
export class User {
  /**
   * Create a new user
   * @param {Object} userData - The user data
   * @returns {Promise<Object>} The created user with ID
   */
  static async create(userData) {
    try {
      const user = {
        name: userData.name || "",
        email: userData.email || "",
        avatar: userData.avatar || "",
        role: userData.role || "user",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection("users").add(user);
      
      return {
        id: result.id,
        ...user
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  
  /**
   * Get a user by ID
   * @param {string} id - The user ID
   * @returns {Promise<Object>} The user data
   */
  static async getById(id) {
    try {
      const doc = await db.collection("users").doc(id).get();
      
      if (!doc.exists) {
        throw new Error("User not found");
      }
      
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }
  
  /**
   * Get user by email
   * @param {string} email - The user's email
   * @returns {Promise<Object>} The user data
   */
  static async getByEmail(email) {
    try {
      const snapshot = await db.collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        throw new Error("User not found");
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error("Error getting user by email:", error);
      throw error;
    }
  }
  
  /**
   * Update a user
   * @param {string} id - The user ID
   * @param {Object} data - The data to update
   * @returns {Promise<Object>} The updated user
   */
  static async update(id, data) {
    try {
      const updateData = {
        ...data,
        updatedAt: new Date()
      };
      
      await db.collection("users").doc(id).update(updateData);
      
      return await this.getById(id);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  
  /**
   * Delete a user
   * @param {string} id - The user ID
   * @returns {Promise<boolean>} Success indicator
   */
  static async delete(id) {
    try {
      await db.collection("users").doc(id).delete();
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}