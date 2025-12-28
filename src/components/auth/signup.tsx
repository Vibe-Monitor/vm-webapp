"use client";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import GoogleSignInButton from "@/components/auth/GoogleSignInButton"
import GitHubSignInButton from "@/components/auth/GitHubSignInButton"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-5 rounded-lg bg-card p-8 shadow-xl">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <Image
              src="/images/VibeMonitor1.png"
              alt="Vibe Monitor"
              width={40}
              height={40}
              className="mr-3"
            />
            <h1 className="text-2xl font-semibold text-foreground">
              Vibe Monitor
            </h1>
          </div>
          <p className="text-base mb-6 text-muted-foreground">
            Start free in 30 seconds. No credit card required.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1 block">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-1 block">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-2"
          >
            Create Account
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              or Continue with
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <GoogleSignInButton />
          <GitHubSignInButton />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <a
            href="#"
            className="underline text-primary"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="underline text-primary"
          >
            Privacy Policy
          </a>.
        </p>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-medium underline text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
