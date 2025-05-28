"use client";

import { PlaceholdersAndVanishInput } from "@/app/components/ui/placeholders-and-vanish-input";
import MultiStepLoader from "@/app/components/ui/multi-step-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "Initializing AI analysis...",
  },
  {
    text: "Processing your project description...",
  },
  {
    text: "Identifying core technologies needed...",
  },
  {
    text: "Evaluating technical requirements...",
  },
  {
    text: "Assessing project scope and complexity...",
  },
  {
    text: "Determining skill requirements...",
  },
  {
    text: "Generating development recommendations...",
  },
  {
    text: "Finalizing project analysis...",
  },
];

export default function CreateProject() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectIdea, setProjectIdea] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectIdea(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectIdea) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: projectIdea }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      // Wait for the loading animation to complete
      await new Promise((resolve) => setTimeout(resolve, 16000)); // 8 states * 2000ms
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Share Your Vision
          </h1>
          <p className="text-lg text-center text-gray-400 mb-12">
            Describe your project idea and let AI help you bring it to life
          </p>

          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="w-full">
              <PlaceholdersAndVanishInput
                placeholders={[
                  "Describe your project idea...",
                  "I want to build a social media platform for pet owners",
                  "An AI-powered recipe recommendation app",
                  "A marketplace for handmade crafts",
                  "A fitness tracking app with social features",
                ]}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </form>

            <MultiStepLoader
              loadingStates={loadingStates}
              loading={isSubmitting}
              duration={2000}
              loop={false}
            />

            {isSubmitting && (
              <button
                className="fixed top-4 right-4 text-white z-[120]"
                onClick={() => setIsSubmitting(false)}
              >
                <IconSquareRoundedX className="h-10 w-10" />
              </button>
            )}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-purple-400 text-xl mb-3">1. Share</div>
                <p className="text-gray-400">
                  Describe your project idea in detail. The more information you provide,
                  the better we can help.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-purple-400 text-xl mb-3">2. Analyze</div>
                <p className="text-gray-400">
                  Our AI analyzes your idea to identify required technologies,
                  complexity, and expertise needed.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-purple-400 text-xl mb-3">3. Connect</div>
                <p className="text-gray-400">
                  Get matched with skilled developers who can help bring your
                  vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 