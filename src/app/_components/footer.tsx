import Link from 'next/link';
import { Briefcase, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-5 md:px-6">
        <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-7 w-7 icon-gradient" />
            <span className="text-xl font-bold tracking-tighter text-foreground">Mockup Studio AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">AI-powered mockups for your brand.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Product</h4>
          <ul className="space-y-1">
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Roadmap</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Company</h4>
          <ul className="space-y-1">
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
            <h4 className="font-semibold">Social</h4>
            <div className="flex items-center gap-4">
                <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" /></Link>
                <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" /></Link>
                <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" /></Link>
            </div>
        </div>
      </div>
      <div className="border-t border-border">
          <div className="container mx-auto flex items-center justify-center px-4 py-4 md:px-6">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Mockup Studio AI. All rights reserved.</p>
          </div>
      </div>
    </footer>
  );
}
