import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Feedback = () => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you!", description: "Your feedback has been submitted." });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center section-container py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <MessageSquare className="h-10 w-10 text-accent mx-auto mb-2" />
            <CardTitle>Share Your Feedback</CardTitle>
            <CardDescription>Help us improve Benefits GPS</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Rating</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)}>
                      <Star className={`h-6 w-6 ${star <= rating ? "text-warning fill-current" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="fb-name">Name</Label>
                <Input id="fb-name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="fb-feedback">Feedback</Label>
                <Textarea id="fb-feedback" placeholder="Tell us what you think..." rows={4} />
              </div>
              <Button type="submit" className="w-full">Submit Feedback</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
