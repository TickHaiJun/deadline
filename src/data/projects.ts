export type ProjectItem = {
  title: string;
  description: string;
  cover: string;
  href: string;
  tags: string[];
};

export const projects: ProjectItem[] = [
  {
    title: "MCP MySQL Server",
    description:
      "一个基于 @modelcontextprotocol/sdk 的 MySQL 工具服务，支持 SQL 查询、表结构获取、连接检测等功能，适用于 AI 代理、自动化工具等场景。",
    cover:
      "https://img2024.cnblogs.com/blog/1654515/202510/1654515-20251012232409367-1850129723.png",
    href: "https://github.com/TickHaiJun/mysql-mcp-server",
    tags: ["MCP", "MySQL", "AI Agent", "Tooling"],
  },
  {
    title: "Crypto Wallet App",
    description:
      "一款现代化、功能丰富的加密货币钱包应用，提供直观的用户界面和全面的加密货币管理功能页面，基于 React Native / Expo 技术栈开发。",
    cover:
      "https://img2024.cnblogs.com/blog/1654515/202510/1654515-20251012232621077-597624900.png",
    href: "https://github.com/TickHaiJun/Dompet-App-React-Native",
    tags: ["React Native", "Expo", "Mobile", "UI"],
  },
  {
    title: "Movie & Event Management System",
    description:
      "一个基于 NestJS 的电影和活动管理系统，提供完整后端 API，支持电影、戏剧、音乐会等多种活动管理，包含用户认证、活动搜索、爬虫等功能。",
    cover:
      "https://img2024.cnblogs.com/blog/1654515/202510/1654515-20251012232831934-1870394016.png",
    href: "https://github.com/TickHaiJun/movie-nest",
    tags: ["NestJS", "TypeScript", "API", "Backend"],
  },
  {
    title: "Quick Bookmarks Retrieval",
    description:
      "一个简洁高效的 Chrome 扩展程序，帮助用户快速检索和访问书签，通过优雅界面设计和智能搜索功能提升书签管理效率。",
    cover:
      "https://img2024.cnblogs.com/blog/1654515/202510/1654515-20251012233133287-2139800746.png",
    href: "https://github.com/TickHaiJun/quick-bookmarks-retrieval",
    tags: ["Chrome Extension", "Vue", "Tool", "Productivity"],
  },
];
