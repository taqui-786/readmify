"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Octokit } from "@octokit/rest";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  description: string | null;
}

function Page() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Get GitHub access token
        const accessTokenResponse = await authClient.getAccessToken({
          providerId: "github",
        });

        if (!accessTokenResponse.data?.accessToken) {
          setError("Failed to get GitHub access token");
          setLoading(false);
          return;
        }

        const accessToken = accessTokenResponse.data.accessToken;

        // Create Octokit instance with authentication
        const octokit = new Octokit({
          auth: accessToken,
        });

        // Fetch all repositories using pagination for optimal performance
        const repos = await octokit.paginate(
          octokit.rest.repos.listForAuthenticatedUser,
          {
            type: "all", // includes both public and private repositories
            sort: "updated", // sort by recently updated
            per_page: 100, // maximum per page for fewer requests
          }
        );

        setRepos(repos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your GitHub Repositories</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, () => crypto.randomUUID()).map((id) => (
            <Skeleton key={id} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your GitHub Repositories</h1>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Your GitHub Repositories ({repos.length})
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <Card key={repo.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {repo.name}
                </a>
                {repo.private && (
                  <span className="ml-2 text-sm text-gray-500">(Private)</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {repo.description || "No description"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
