// Placeholder for your Story entity logic (using local storage, a backend API, etc.)
//  This is HIGHLY dependent on how you are managing data.

const STORY_KEY = "stories";

export const Story = {
    create: async (storyData) => {
        console.log("Story.create: start", storyData);
        try {
            // Example using localStorage (replace with your actual data persistence)
            const stories = JSON.parse(localStorage.getItem(STORY_KEY) || "[]");
            const newStory = {
                id: Date.now(), // Simple ID for example; use a UUID library in production
                ...storyData,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            localStorage.setItem(STORY_KEY, JSON.stringify([...stories, newStory]));
            console.log("Story.create: success", newStory);
            return newStory;
        } catch (error) {
            console.error("Story.create: error", error);
            throw error;
        }
    },

    list: async (orderBy = "-createdAt") => {
        console.log("Story.list: start", orderBy);
        try {
            // Example using localStorage
            return new Promise((resolve) => {
                const stories = JSON.parse(localStorage.getItem(STORY_KEY) || "[]");

                // Basic sorting (add more robust sorting if needed)
                const sortFunction = (a, b) => {
                    if (orderBy.startsWith("-")) {
                        const field = orderBy.slice(1);
                        return new Date(b[field]) - new Date(a[field]); // Descending
                    } else {
                        return new Date(a[orderBy]) - new Date(b[orderBy]); // Ascending
                    }
                };
                const sortedStories = stories.sort(sortFunction);
                console.log("Story.list: success", sortedStories);
                resolve(sortedStories);
            });
        } catch (error) {
            console.error("Story.list: error", error);
            throw error;
        }
    },
    update: async (id, updatedStoryData) => {
        console.log("Story.update: start", id, updatedStoryData);
        try {
            //Example useing localStorage
            return new Promise((resolve) => {
                let stories = JSON.parse(localStorage.getItem(STORY_KEY) || "[]");
                stories = stories.map((story) => {
                    if (story.id === id) {
                        return {
                            ...story,
                            ...updatedStoryData,
                            updatedAt: new Date(),
                        };
                    }
                    return story;
                });
                localStorage.setItem(STORY_KEY, JSON.stringify(stories));
                const updatedStory = stories.find((story) => story.id === id);
                console.log("Story.update: success", updatedStory);
                resolve(updatedStory);
            });
        } catch (error) {
            console.error("Story.update: error", error);
            throw error;
        }
    },
    delete: async (id) => {
        console.log("Story.delete: start", id);
        try {
            // Example using localStorage
            return new Promise((resolve) => {
                let stories = JSON.parse(localStorage.getItem(STORY_KEY) || "[]");
                stories = stories.filter((story) => story.id !== id);
                localStorage.setItem(STORY_KEY, JSON.stringify(stories));
                console.log("Story.delete: success", id);
                resolve(true);
            });
        } catch (error) {
            console.error("Story.delete: error", error);
            throw error;
        }
    },
};
