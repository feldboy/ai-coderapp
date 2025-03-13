// Placeholder for your Story entity logic (using local storage, a backend API, etc.)
//  This is HIGHLY dependent on how you are managing data.

const STORY_KEY = "stories";

export const Story = {
    create: async (storyData) => {
        // Example using localStorage (replace with your actual data persistence)
        const stories = JSON.parse(localStorage.getItem(STORY_KEY) || "[]");
        const newStory = {
            id: Date.now(), // Simple ID for example; use a UUID library in production
            ...storyData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        localStorage.setItem(STORY_KEY, JSON.stringify([...stories, newStory]));
        return newStory;
    },

    list: async (orderBy = "-createdAt") => {
         // Example using localStorage
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
        return stories.sort(sortFunction);
    },
    update: async (id, updatedStoryData) => {
        //Example useing localStorage
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
        return stories.find((story) => story.id === id);
    },
    delete: async (id) => {
        // Example using localStorage
        let stories = JSON.parse(localStorage.getItem(STORY_KEY) || "[]");
        stories = stories.filter((story) => story.id !== id);
        localStorage.setItem(STORY_KEY, JSON.stringify(stories));
        return true;
    },
};
