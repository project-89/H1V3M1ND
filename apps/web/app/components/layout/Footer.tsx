export function Footer() {
  return (
    <footer className="border-t border-cyber-purple/30 bg-cyber-darker/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 pb-0 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">H1V3M1ND</h3>
            {/* <p className="text-sm text-gray-400">Welcome Agents</p> */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/docs"
                  className="text-sm text-gray-400 hover:text-cyber-purple transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/oneirocom/H1V3M1ND"
                  className="text-sm text-gray-400 hover:text-cyber-purple transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/teE2HxnV"
                  className="text-sm text-gray-400 hover:text-cyber-purple transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/project_89"
                  className="text-sm text-gray-400 hover:text-cyber-purple transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" py-4 border-t border-cyber-purple/30 text-center text-sm text-gray-400">
          Made with ❤️ by{' '}
          <a
            href="https://x.com/project_89"
            className="text-cyber-purple hover:text-cyber-purple/80 transition-colors"
          >
            Project 89
          </a>
        </div>
      </div>
    </footer>
  );
}
