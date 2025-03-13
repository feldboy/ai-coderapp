import React, { useState, useEffect } from "react";
import { User } from "../entities/User"; //Correct file path
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../components/ui/use-toast";
import { UserIcon, Mail, Save, Loader2 } from "lucide-react";
import { Separator } from "../components/ui/separator";

export default function Profile() {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        setIsLoading(true);
        try {
            const userData = await User.me();
            setUserProfile({
                ...userData,
                preferences: userData.preferences || {
                    defaultDetailLevel: "brief"
                }
            });
        } catch (error) {
            console.error("Error loading user profile:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load user profile"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePreferenceChange = (field, value) => {
        setUserProfile(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [field]: value
            }
        }));
    };

    const savePreferences = async () => {
        setIsSaving(true);
        try {
            await User.updateMyUserData({
                preferences: userProfile.preferences
            });
            toast({
                title: "Success",
                description: "Preferences saved successfully"
            });
        } catch (error) {
            console.error("Error saving preferences:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save preferences"
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>

            {/* ... User Information Card ... */}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5 text-blue-600" />
                        Preferences
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="defaultDetailLevel">Default Detail Level</Label>
                            <Input
                                id="defaultDetailLevel"
                                value={userProfile.preferences.defaultDetailLevel || "brief"}
                                onChange={(e) => handlePreferenceChange("defaultDetailLevel", e.target.value)}
                                placeholder="brief, detailed, or longDescription"
                            />
                            <p className="text-sm text-gray-500">
                                Set your preferred detail level for story generation
                            </p>
                        </div>

                        <Separator />

                        <Button
                            onClick={savePreferences}
                            disabled={isSaving}
                            className="gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save Preferences
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}