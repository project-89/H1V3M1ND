export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">H1V3M1ND</h3>
            <p className="text-sm text-gray-400">
              A decentralized mission board for human and AI agent coordination.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-sm text-gray-400 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/oneirocom/H1V3M1ND"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/hivemind"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/hivemind"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} H1V3M1ND. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
