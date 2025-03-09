import { db } from "@/lib/db";

/**
 * Story entity class for handling user story operations
 */
export class Story {
  /**
   * Create a new user story
   * @param {Object} storyData - The story data
   * @returns {Promise<Object>} The created story with ID
   */
  static async create(storyData) {
    try {
      // Set default values if not provided
      const story = {
        storyTitle: storyData.title || "",
        userStoryText: storyData.storyText || "",
        taskDescription: storyData.description || "",
        assignee: storyData.assignee || "",
        dueDate: storyData.dueDate || null,
        priority: storyData.priority || "Medium",
        status: storyData.status || "To Do",
        createdAt: new Date(),
        updatedAt: new Date(),
        
        // Additional fields from AI response
        acceptanceCriteria: storyData.acceptanceCriteria || [],
        investValidation: storyData.investValidation || {},
        personaContext: storyData.personaContext || "",
        collaborationPoint: storyData.collaborationPoint || "",
        improvementSuggestion: storyData.improvementSuggestion || ""
      };
      
      const result = await db.collection("userStories").add(story);
      
      return {
        id: result.id,
        ...story
      };
    } catch (error) {
      console.error("Error creating story:", error);
      throw error;
    }
  }
  
  /**
   * Get a story by ID
   * @param {string} id - The story ID
   * @returns {Promise<Object>} The story data
   */
  static async getById(id) {
    try {
      const doc = await db.collection("userStories").doc(id).get();
      
      if (!doc.exists) {
        throw new Error("Story not found");
      }
      
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error("Error getting story:", error);
      throw error;
    }
  }
  
  /**
   * Get all stories with optional filtering
   * @param {Object} filters - Optional filters (status, assignee, etc.)
   * @returns {Promise<Array>} Array of stories
   */
  static async getAll(filters = {}) {
    try {
      let query = db.collection("userStories");
      
      // Apply filters if provided
      if (filters.status) {
        query = query.where("status", "==", filters.status);
      }
      
      if (filters.assignee) {
        query = query.where("assignee", "==", filters.assignee);
      }
      
      if (filters.priority) {
        query = query.where("priority", "==", filters.priority);
      }
      
      // Always sort by createdAt descending (newest first)
      query = query.orderBy("createdAt", "desc");
      
      const snapshot = await query.get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting stories:", error);
      throw error;
    }
  }
  
  /**
   * Update a story
   * @param {string} id - The story ID
   * @param {Object} data - The data to update
   * @returns {Promise<Object>} The updated story
   */
  static async update(id, data) {
    try {
      // Always update the updatedAt timestamp
      const updateData = {
        ...data,
        updatedAt: new Date()
      };
      
      await db.collection("userStories").doc(id).update(updateData);
      
      // Return the updated document
      return await this.getById(id);
    } catch (error) {
      console.error("Error updating story:", error);
      throw error;
    }
  }
  
  /**
   * Delete a story
   * @param {string} id - The story ID
   * @returns {Promise<boolean>} Success indicator
   */
  static async delete(id) {
    try {
      await db.collection("userStories").doc(id).delete();
      return true;
    } catch (error) {
      console.error("Error deleting story:", error);
      throw error;
    }
  }
  
  /**
   * Update story status
   * @param {string} id - The story ID
   * @param {string} status - The new status
   * @returns {Promise<Object>} The updated story
   */
  static async updateStatus(id, status) {
    return this.update(id, { status });
  }
  
  /**
   * Assign a story to a user
   * @param {string} id - The story ID
   * @param {string} assignee - The assignee name or ID
   * @returns {Promise<Object>} The updated story
   */
  static async assign(id, assignee) {
    return this.update(id, { assignee });
  }
}