'use client'
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { Spinner } from "./ui/spinner";

function LogoutBtn() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await signOut();
      if (res.error) {
        setError(res.error.message || "An error occurred during sign out");
      }
    } finally {
      console.log("Logged out");
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleLogout}>
      {isLoading ? (
        <>
          <Spinner />
          Logging out
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}

export default LogoutBtn;
