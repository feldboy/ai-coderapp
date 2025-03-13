import React, { useState, useEffect } from "react";
import { Story } from "../entities/Story"; // Corrected relative path
import { useToast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../components/ui/select";
import {
    Alert,
    AlertDescription,
} from "../components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
} from "../components/ui/alert-dialog";
import StoryCard from "../components/stories/StoryCard";
import EditStoryDialog from "../components/stories/EditStoryDialog";
import { Loader2, PlusCircle, Search } from "lucide-react";

export default function Stories() {
    const [stories, setStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingStory, setEditingStory] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [storyToDelete, setStoryToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { toast } = useToast();

    useEffect(() => {
        loadStories();
    }, []);

    useEffect(() => {
        filterStories();
    }, [stories, searchQuery, statusFilter]);

    const loadStories = async () => {
        setIsLoading(true);
        try {
            const result = await Story.list("-created_date");
            setStories(result);
        } catch (error) {
            console.error("Error loading stories:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load stories"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const filterStories = () => {
        let filtered = [...stories];

        if (searchQuery) {
            filtered = filtered.filter(
                story =>
                    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    story.storyText.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter(story => story.status === statusFilter);
        }

        setFilteredStories(filtered);
    };

    const handleEdit = (story) => {
        setEditingStory(story);
        setIsDialogOpen(true);
    };

    const handleSave = async (updatedStory) => {
        try {
            await Story.update(updatedStory.id, updatedStory);
            setIsDialogOpen(false);
            loadStories();
            toast({
                title: "Success",
                description: "Story updated successfully"
            });
        } catch (error) {
            console.error("Error updating story:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update story"
            });
        }
    };

    const confirmDelete = (story) => {
        setStoryToDelete(story);
        setDeleteConfirmOpen(true);
    };

    const handleDelete = async () => {
        try {
            await Story.delete(storyToDelete.id);
            setDeleteConfirmOpen(false);
            loadStories();
            toast({
                title: "Success",
                description: "Story deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting story:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete story"
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">My Stories</h1>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder="Search stories..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className="w-full md:w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
            ) : filteredStories.length === 0 ? (
                <Alert>
                    <AlertDescription>
                        No stories found. Create a new story using the chat interface.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStories.map((story) => (
                        <StoryCard
                            key={story.id}
                            story={story}
                            onEdit={handleEdit}
                            onDelete={confirmDelete}
                        />
                    ))}
                </div>
            )}

            <EditStoryDialog
                story={editingStory}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSave}
            />

            <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the story.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}