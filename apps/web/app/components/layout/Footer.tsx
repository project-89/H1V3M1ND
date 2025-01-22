import { Book, Github, Twitter, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-6 py-2 max-w-[1800px]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-neon-pink hover:text-neon-pink/80 transition-colors duration-200">
                H1V3M1ND
              </h3>
            </div>
          </div>
          <div className="text-center text-sm text-cyber-gray">
            Made with ❤️ by{' '}
            <a
              href="https://x.com/project_89"
              className="text-cyber-purple hover:text-cyber-purple-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Project 89
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/docs"
              className="text-cyber-gray hover:text-cyber-purple transition-colors"
              title="Documentation"
            >
              <Book className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/oneirocom/H1V3M1ND"
              className="text-cyber-gray hover:text-cyber-purple transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://discord.gg/teE2HxnV"
              className="text-cyber-gray hover:text-cyber-purple transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="Discord"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/project_89"
              className="text-cyber-gray hover:text-cyber-purple transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
