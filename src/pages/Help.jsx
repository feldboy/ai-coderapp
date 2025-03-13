import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Check, CheckCircle2, Tag, GitPullRequest, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function Help() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Help & Guidelines</h1>

            <Card className="mb-8">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        About StoryCraft
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        StoryCraft is a simple, chat-driven app...
                    </p>
                    {/* ... Rest of the About StoryCraft content ... */}
                </CardContent>
            </Card>

            {/* ... Other sections (Using "Stickers", INVEST, 3 C's, DoD, Example Workflow) ... */}

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <GitPullRequest className="h-5 w-5 text-blue-600" />
                        Example Workflow
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal pl-5 space-y-4 text-gray-600">
                        <li>
                            <span className="font-medium">Start in Chat:</span> Type your task idea (e.g., "filter products by price")
                        </li>
                        {/* ... Rest of the Example Workflow content ... */}
                    </ol>
                </CardContent>
            </Card>
        </div>
    );
}