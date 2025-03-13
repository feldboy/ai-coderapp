import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog"; // Corrected relative paths
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import { Label } from "../ui/label";

export default function EditStoryDialog({ story, open, onClose, onSave }) {
    const [editedStory, setEditedStory] = useState({
        title: "",
        storyText: "",
        description: "",
        status: "To Do",
    });

    useEffect(() => {
        if (story) {
            setEditedStory({
                ...story,
            });
        }
    }, [story]);

    const handleChange = (field, value) => {
        setEditedStory((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedStory);
    };

    if (!story) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Story</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={editedStory.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                required
                            />
                        </div>
                       {/*the rest of dialog form inputs*/}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}