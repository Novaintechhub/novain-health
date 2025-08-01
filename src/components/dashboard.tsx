"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Code,
  Figma,
  LinkIcon,
  Loader2,
  Palette,
  Type,
  RectangleHorizontal,
} from "lucide-react";

export default function Dashboard() {
  const [figmaUrl, setFigmaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!figmaUrl) return;

    setIsLoading(true);
    setIsFetched(false);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsFetched(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b md:px-8 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Figma className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            NovainHealth
          </h1>
        </div>
        <Avatar>
          <AvatarImage
            src="https://placehold.co/100x100.png"
            alt="User Avatar"
            data-ai-hint="user avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Figma Design Integration</CardTitle>
              <CardDescription>
                Enter a Figma file URL to fetch its design specifications and
                render components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleFetch}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <div className="relative flex-grow">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://www.figma.com/file/..."
                    className="pl-10"
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    "Fetch Design"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {isFetched && (
            <div className="grid gap-8 animate-in fade-in-50 duration-500">
              <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                  <Palette className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>Color Palette</CardTitle>
                    <CardDescription>
                      The primary colors used in the design.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full shadow-inner bg-primary" />
                    <span className="text-sm font-medium">Primary</span>
                    <span className="text-xs text-muted-foreground">#3F51B5</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full shadow-inner bg-accent" />
                    <span className="text-sm font-medium">Accent</span>
                    <span className="text-xs text-muted-foreground">#BF360C</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full shadow-inner bg-secondary" />
                    <span className="text-sm font-medium">Secondary</span>
                    <span className="text-xs text-muted-foreground">#F5F7FA</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 border rounded-full shadow-inner bg-background" />
                    <span className="text-sm font-medium">Background</span>
                    <span className="text-xs text-muted-foreground">#F0F2F5</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 border rounded-full shadow-inner bg-card" />
                    <span className="text-sm font-medium">Card</span>
                    <span className="text-xs text-muted-foreground">#FFFFFF</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                  <Type className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>Typography</CardTitle>
                    <CardDescription>
                      Font styles for headings and paragraphs.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Headline 1 / Inter Bold
                    </p>
                    <h1 className="text-4xl font-bold font-headline">
                      The quick brown fox
                    </h1>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Headline 2 / Inter SemiBold
                    </p>
                    <h2 className="text-3xl font-semibold font-headline">
                      Jumps over the lazy dog
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Body Text / Inter Regular
                    </p>
                    <p className="max-w-prose">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                  <RectangleHorizontal className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>
                      Interactive button components from the design.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-4">
                  <Button size="lg">Primary Button</Button>
                  <Button variant="secondary" size="lg">Secondary</Button>
                  <Button variant="outline" size="lg">Outline</Button>
                  <Button variant="ghost" size="lg">Ghost</Button>
                  <Button variant="link" size="lg">Link</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                  <Code className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>API Response</CardTitle>
                    <CardDescription>
                      Parsed data from the design specifications.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 text-sm bg-muted rounded-md overflow-x-auto">
                    <code className="font-code">
                      {`{
  "colors": [
    { "name": "Primary", "hex": "#3F51B5" },
    { "name": "Accent", "hex": "#BF360C" }
  ],
  "typography": {
    "h1": { "font": "Inter", "size": "48px", "weight": "bold" },
    "body": { "font": "Inter", "size": "16px", "weight": "regular" }
  },
  "components": ["Button", "Card", "Input"]
}`}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
