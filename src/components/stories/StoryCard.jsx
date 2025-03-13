import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"; // Corrected relative path
import { Badge } from "../ui/badge";   // Corrected relative path
import { Button } from "../ui/button";  // Corrected relative path
import { Edit, Trash2 } from "lucide-react";

const statusColors = {
    "To Do": "bg-gray-100 text-gray-800",
    "In Progress": "bg-blue-100 text-blue-600",
    "Done": "bg-green-100 text-green-600"
};

export default function StoryCard({ story, onDelete, onEdit }) {
    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{story.title}</h3>
                    <Badge className={statusColors[story.status]}>
                        {story.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="text-sm text-gray-600 mb-2">
                    {story.storyText}
                </p>
                {/* ... Rest of the StoryCard content ... */}
            </CardContent>
            <CardFooter className="pt-2 justify-end gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(story)}
                >
                    <Edit size={16} className="mr-1" />
                    Edit
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(story)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}