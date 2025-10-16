'use client'
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { signIn } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

const IconGithub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><title>GitHub</title><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" fill="currentColor"/></svg>
);

/**
 * A client-side authentication form component with Github login.
 */
const AuthForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const logoSrc = "data:image/png;base64,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";
  const logoAlt = "21st Company Logo";
  const title = "AI README Generator";
  const description = "Link GitHub to auto-generate professional READMEs for your repos.";

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn();
      // The signIn function will handle redirect, so we don't need to do anything here
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center")}>
      <Card
        className={cn(
          "w-full max-w-sm",
          // Entrance Animation from tailwindcss-animate
          "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500"
        )}
      >
        <CardHeader className="text-center">
          {/* Logo rendered from src */}
          <div className="mb-4 flex justify-center ">
            <img src={logoSrc} alt={logoAlt} className="h-12 w-12 object-contain rounded-[4px]" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Primary Action Button */}
          <Button onClick={handleSignIn} disabled={isLoading} className="w-full transition-transform hover:scale-[1.03]">
            <IconGithub className="mr-2 h-4 w-4" />
            {isLoading ? <><Spinner/>Connecting</> : "Continue with Github"}
          </Button>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </CardContent>

        {/* Skip Action Button */}
        <CardFooter className="flex flex-col">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground transition-colors">
                Why GitHub authentication?
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>GitHub Authentication Required</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                GitHub authentication is essential for Readmify to securely access your repositories and generate README files. We only request the necessary permissions to read your public and private repositories, ensuring a seamless experience for creating comprehensive documentation with a single click. Your data is handled with the utmost security and privacy - no misuse occurs.
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {/* Footer */}
      <div className="mt-6 w-full max-w-sm px-8 text-center text-sm text-muted-foreground animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500 [animation-delay:200ms]">
        By logging in, you agree to our{" "}
        <u className="cursor-pointer transition-colors hover:text-primary">Terms of Service</u>{" "}
        and{" "}
        <u className="cursor-pointer transition-colors hover:text-primary">Privacy Policy</u>.
      </div>
    </div>
  );
};

AuthForm.displayName = "AuthForm";

export { AuthForm };
