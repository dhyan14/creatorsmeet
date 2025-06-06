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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple puzzle solution (first letter of each word)
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
          <CardTitle className="text-2xl font-bold">Puzzle Solver</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="puzzle" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your puzzle
              </label>
              <Input
                id="puzzle"
                value={puzzle}
                onChange={(e) => setPuzzle(e.target.value)}
                placeholder="Type your puzzle here..."
                disabled={isLoading}
              />
            </div>
            
            <Button 
              onClick={solvePuzzle} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Solving...' : 'Solve Puzzle'}
            </Button>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {solution && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Solution:</h3>
                <p className="text-lg font-mono">{solution}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}