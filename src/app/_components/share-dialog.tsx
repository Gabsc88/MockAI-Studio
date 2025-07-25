
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Twitter, Facebook, Linkedin, Copy } from 'lucide-react';
import Link from 'next/link';

type ShareDialogProps = {
  children: React.ReactNode;
  shareUrl: string;
  prompt: string;
};

export function ShareDialog({ children, shareUrl, prompt }: ShareDialogProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    // In a real app, you'd generate a shareable URL.
    // For this demo, we'll just copy the data URI, which won't work in a real browser URL.
    // A full implementation would require uploading the image to a server/storage.
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied',
      description: 'A link to your mockup has been copied to your clipboard.',
    });
  };

  const socialPlatforms = [
    { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my AI-generated mockup: "${prompt}"`)}&url=${encodeURIComponent('https://mockai.studio/view/mockup-id')}` },
    { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://mockai.studio/view/mockup-id')}` },
    { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://mockai.studio/view/mockup-id')}&title=${encodeURIComponent(`AI Mockup: ${prompt}`)}` },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Mockup</DialogTitle>
          <DialogDescription>
            Share your creation with the world. Note: Social links use a placeholder URL.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-3 gap-4">
                {socialPlatforms.map(({name, icon: Icon, url}) => (
                    <Button variant="outline" className="flex flex-col h-20" asChild key={name}>
                        <Link href={url} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-6 w-6 mb-1" />
                            <span>{name}</span>
                        </Link>
                    </Button>
                ))}
            </div>
            <div className="flex items-center space-x-2">
                <Input
                    id="copy-link"
                    value="https://mockai.studio/view/mockup-id"
                    readOnly
                />
                <Button type="button" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy Link</span>
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
