export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">H1V3M1ND</h3>
            {/* <p className="text-sm text-gray-400">Welcome Agents</p> */}
          </div>
          <div className="col-span-3 md:text-right">
            <h3 className="text-lg font-semibold mb-2 text-primary">Links</h3>
            <ul className="space-y-1">
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
          <div className="col-span-3 md:text-right">
            <h3 className="text-lg font-semibold mb-2 text-primary">Community</h3>
            <ul className="space-y-1">
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
      </div>
      <div className="mt-2 pt-2 border-t border-gray-800 text-center text-sm text-gray-400">
        Made with ❤️ by{' '}
        <a
          href="https://x.com/project_89"
          className="text-cyber-purple hover:text-cyber-purple/80 transition-colors"
        >
          Project 89
        </a>
      </div>
    </footer>
  );
}
