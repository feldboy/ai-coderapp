// UserStory entity implementation based on the SQL schema

const USER_STORY_KEY = "userStories";

export const UserStory = {
    create: async (storyData) => {
        // Get existing user stories from localStorage
        const userStories = JSON.parse(localStorage.getItem(USER_STORY_KEY) || "[]");
        
        // Create new user story with required fields
        const newUserStory = {
            id: Date.now(), // Simple ID for example; use a UUID library in production
            storyTitle: storyData.storyTitle || "",
            userStoryText: storyData.userStoryText, // Required field
            taskDescription: storyData.taskDescription || "",
            assignee: storyData.assignee || "",
            dueDate: storyData.dueDate || null,
            priority: storyData.priority || "Medium", // Default priority
            status: storyData.status || "To Do", // Default status
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        
        // Save to localStorage
        localStorage.setItem(USER_STORY_KEY, JSON.stringify([...userStories, newUserStory]));
        return newUserStory;
    },

    list: async (orderBy = "-createdAt") => {
        // Get user stories from localStorage
        const userStories = JSON.parse(localStorage.getItem(USER_STORY_KEY) || "[]");

        // Basic sorting (add more robust sorting if needed)
        const sortFunction = (a, b) => {
            if (orderBy.startsWith("-")) {
                const field = orderBy.slice(1);
                if (field === "createdAt" || field === "updatedAt" || field === "dueDate") {
                    return new Date(b[field] || 0) - new Date(a[field] || 0); // Descending
                }
                return String(b[field]).localeCompare(String(a[field])); // String comparison
            } else {
                if (orderBy === "createdAt" || orderBy === "updatedAt" || orderBy === "dueDate") {
                    return new Date(a[orderBy] || 0) - new Date(b[orderBy] || 0); // Ascending
                }
                return String(a[orderBy]).localeCompare(String(b[orderBy])); // String comparison
            }
        };
        return userStories.sort(sortFunction);
    },

    getById: async (id) => {
        // Get user stories from localStorage
        const userStories = JSON.parse(localStorage.getItem(USER_STORY_KEY) || "[]");
        return userStories.find(story => story.id === id) || null;
    },

    update: async (id, updatedStoryData) => {
        // Get user stories from localStorage
        let userStories = JSON.parse(localStorage.getItem(USER_STORY_KEY) || "[]");
        
        // Update the matching user story
        userStories = userStories.map((story) => {
            if (story.id === id) {
                return {
                    ...story,
                    ...updatedStoryData,
                    updatedAt: new Date(),
                };
            }
            return story;
        });
        
        // Save to localStorage
        localStorage.setItem(USER_STORY_KEY, JSON.stringify(userStories));
        return userStories.find((story) => story.id === id);
    },

    delete: async (id) => {
        // Get user stories from localStorage
        let userStories = JSON.parse(localStorage.getItem(USER_STORY_KEY) || "[]");
        
        // Filter out the user story to delete
        userStories = userStories.filter((story) => story.id !== id);
        
        // Save to localStorage
        localStorage.setItem(USER_STORY_KEY, JSON.stringify(userStories));
        return true;
    },

    // Additional methods for filtering and querying
    filterByStatus: async (status) => {
        const userStories = await UserStory.list();
        return userStories.filter(story => story.status === status);
    },

    filterByAssignee: async (assignee) => {
        const userStories = await UserStory.list();
        return userStories.filter(story => story.assignee === assignee);
    },

    filterByPriority: async (priority) => {
        const userStories = await UserStory.list();
        return userStories.filter(story => story.priority === priority);
    },

    search: async (query) => {
        const userStories = await UserStory.list();
        const lowerQuery = query.toLowerCase();
        return userStories.filter(story => 
            (story.storyTitle && story.storyTitle.toLowerCase().includes(lowerQuery)) ||
            (story.userStoryText && story.userStoryText.toLowerCase().includes(lowerQuery)) ||
            (story.taskDescription && story.taskDescription.toLowerCase().includes(lowerQuery)) ||
            (story.assignee && story.assignee.toLowerCase().includes(lowerQuery))
        );
    }
};