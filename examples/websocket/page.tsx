"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SocketDemo() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>WebSocket Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">
              WebSocket Functionality Removed
            </h3>
            <p className="text-gray-500">
              The WebSocket/Socket.IO functionality has been removed from this
              application as requested.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
