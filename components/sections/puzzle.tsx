'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function PuzzleSection() {
  const [puzzle, setPuzzle] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Puzzle Solver</CardTitle>
              <p className="text-gray-400 text-sm">Enter any text and we'll create a puzzle for you</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label htmlFor="puzzle" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter your text
                  </label>
                  <Input
                    id="puzzle"
                    type="text"
                    value={puzzle}
                    onChange={(e) => setPuzzle(e.target.value)}
                    placeholder="Type something interesting..."
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={solvePuzzle}
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                  >
                    {isLoading ? 'Solving...' : 'Solve Puzzle'}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-900/30 border-red-800">
                    <AlertDescription className="text-red-300">{error}</AlertDescription>
                  </Alert>
                )}

                {solution && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <h3 className="text-lg font-medium text-white mb-2">Solution:</h3>
                    <p className="text-2xl font-bold text-purple-400 break-all">{solution}</p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
