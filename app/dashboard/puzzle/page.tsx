"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PuzzlePage() {
  const [puzzle, setPuzzle] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const solvePuzzle = async () => {
    if (!puzzle.trim()) {
      setError("Please enter a puzzle");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      
      // TODO: Implement actual puzzle solving logic
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a simple solution (in a real app, this would be more complex)
      const words = puzzle.split(/\s+/);
      const solution = words.map(word => word[0]).join("");
      
      setSolution(solution);
    } catch (err) {
      setError("Failed to solve puzzle. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Solve a Puzzle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label htmlFor="puzzle" className="block text-sm font-medium mb-2">
                Enter your puzzle:
              </label>
              <Input
                id="puzzle"
                value={puzzle}
                onChange={(e) => setPuzzle(e.target.value)}
                placeholder="Enter your puzzle here..."
                className="w-full"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={solvePuzzle}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Solving..." : "Solve Puzzle"}
            </Button>

            {solution && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Solution:</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  {solution}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
